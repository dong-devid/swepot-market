'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Trash2 } from 'lucide-react'

export default function DeleteButton({ productId }: { productId: string }) {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    const { error } = await supabase.from('products').delete().eq('id', productId)
    setLoading(false)
    if (error) {
      alert('삭제에 실패했습니다. 다시 시도해주세요.')
      return
    }
    router.push('/')
    router.refresh()
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors"
      >
        <Trash2 size={18} className="text-gray-400 hover:text-red-400" />
      </button>

      {/* 확인 모달 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          {/* 배경 딤 */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowModal(false)}
          />
          {/* 모달 박스 */}
          <div className="relative w-full max-w-[320px] bg-white rounded-3xl px-6 py-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🗑️</div>
              <h2 className="font-bold text-[18px] text-gray-900 mb-1">상품을 삭제할까요?</h2>
              <p className="text-sm text-gray-400">삭제한 상품은 되돌릴 수 없어요</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 font-semibold text-[15px] hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-semibold text-[15px] hover:bg-red-600 active:scale-[0.98] transition-all disabled:bg-gray-200 disabled:text-gray-400"
              >
                {loading ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
