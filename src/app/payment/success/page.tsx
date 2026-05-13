'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, Loader2 } from 'lucide-react'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [errorMsg, setErrorMsg] = useState('')

  const paymentKey = searchParams.get('paymentKey') ?? ''
  const orderId = searchParams.get('orderId') ?? ''
  const amount = Number(searchParams.get('amount') ?? 0)

  useEffect(() => {
    async function confirm() {
      const res = await fetch('/api/payment/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentKey, orderId, amount }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json()
        setErrorMsg(data.error ?? '결제 확인 중 오류가 발생했습니다.')
        setStatus('error')
      }
    }
    if (paymentKey && orderId && amount) confirm()
  }, [paymentKey, orderId, amount])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F8F7]">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-goguma-500 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">결제 확인 중...</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F8F7] px-6">
        <div className="text-center">
          <p className="text-5xl mb-4">😢</p>
          <h1 className="font-bold text-xl text-gray-900 mb-2">결제 확인 실패</h1>
          <p className="text-sm text-gray-500 mb-6">{errorMsg}</p>
          <Link href="/" className="px-6 py-3 rounded-2xl bg-goguma-500 text-white font-semibold">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F8F7] px-6">
      <div className="w-full max-w-[360px] bg-white rounded-3xl px-6 py-10 shadow-sm text-center">
        <CheckCircle2 size={56} className="text-goguma-500 mx-auto mb-4" />
        <h1 className="font-bold text-2xl text-gray-900 mb-2">결제 완료!</h1>
        <p className="text-sm text-gray-400 mb-8">고구마마켓 구매가 완료되었어요 🥔</p>

        <div className="bg-gray-50 rounded-2xl px-4 py-4 text-left space-y-3 mb-8">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">결제 금액</span>
            <span className="font-bold text-gray-900">₩{amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">주문 번호</span>
            <span className="font-medium text-gray-700 text-xs break-all">{orderId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">결제 키</span>
            <span className="font-medium text-gray-700 text-xs break-all truncate max-w-[160px]">{paymentKey}</span>
          </div>
        </div>

        <Link
          href="/"
          className="block w-full py-3.5 rounded-2xl bg-goguma-500 text-white font-bold text-[16px] hover:bg-goguma-600 transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
