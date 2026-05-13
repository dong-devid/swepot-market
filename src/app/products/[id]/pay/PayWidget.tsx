'use client'

import { useRef, useState } from 'react'
import { loadTossPayments } from '@tosspayments/payment-sdk'
import { Product } from '@/lib/supabase'

const CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!

export default function PayWidget({ product }: { product: Product }) {
  const orderIdRef = useRef(`order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`)
  const [loading, setLoading] = useState(false)

  async function handlePay() {
    setLoading(true)
    try {
      const tossPayments = await loadTossPayments(CLIENT_KEY)
      await tossPayments.requestPayment('카드', {
        amount: product.price,
        orderId: orderIdRef.current,
        orderName: product.title,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
        customerName: '고구마 구매자',
      })
    } catch (e: any) {
      if (e?.code !== 'USER_CANCEL') {
        alert('결제 중 오류가 발생했습니다.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-[480px] mx-auto px-4 py-6 flex flex-col gap-4">
      {/* 주문 상품 요약 */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h2 className="text-xs font-semibold text-gray-400 mb-3">주문 상품</h2>
        <div className="flex gap-3 items-center">
          {product.image_url && (
            <img src={product.image_url} alt={product.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
          )}
          <div>
            <p className="font-semibold text-gray-900 text-[15px] line-clamp-2">{product.title}</p>
            <p className="text-goguma-600 font-bold mt-1 text-lg">₩{product.price.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* 결제 수단 안내 */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h2 className="text-xs font-semibold text-gray-400 mb-2">결제 수단</h2>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="text-xl">💳</span>
          카드 결제
        </div>
      </div>

      {/* 결제 금액 */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">최종 결제 금액</span>
          <span className="text-xl font-bold text-gray-900">₩{product.price.toLocaleString()}</span>
        </div>
      </div>

      {/* 결제 버튼 */}
      <button
        onClick={handlePay}
        disabled={loading}
        className="w-full py-4 rounded-2xl bg-goguma-500 text-white font-bold text-[16px] hover:bg-goguma-600 active:scale-[0.98] transition-all shadow-sm shadow-goguma-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
      >
        {loading ? '결제 창 여는 중...' : `₩${product.price.toLocaleString()} 결제하기`}
      </button>

      <p className="text-center text-xs text-gray-400">토스페이먼츠 보안 결제</p>
    </div>
  )
}
