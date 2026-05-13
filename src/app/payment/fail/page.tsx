'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

function FailContent() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message') ?? '결제가 취소되었습니다.'
  const code = searchParams.get('code') ?? ''

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F8F7] px-6">
      <div className="w-full max-w-[360px] bg-white rounded-3xl px-6 py-10 shadow-sm text-center">
        <p className="text-5xl mb-4">😢</p>
        <h1 className="font-bold text-2xl text-gray-900 mb-2">결제 실패</h1>
        <p className="text-sm text-gray-500 mb-2">{message}</p>
        {code && <p className="text-xs text-gray-300 mb-8">오류 코드: {code}</p>}
        <div className="flex flex-col gap-2 mt-8">
          <button
            onClick={() => window.history.back()}
            className="w-full py-3.5 rounded-2xl bg-goguma-500 text-white font-bold text-[16px] hover:bg-goguma-600 transition-colors"
          >
            다시 시도하기
          </button>
          <Link href="/" className="block w-full py-3.5 rounded-2xl border border-gray-200 text-gray-600 font-semibold text-[15px] hover:bg-gray-50 transition-colors">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function PaymentFailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F8F8F7]">
        <Loader2 size={40} className="animate-spin text-goguma-500" />
      </div>
    }>
      <FailContent />
    </Suspense>
  )
}
