'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase, Product } from '@/lib/supabase'
import { ChevronLeft, ImageIcon } from 'lucide-react'

export default function EditForm({ product }: { product: Product }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [form, setForm] = useState({
    title: product.title,
    price: String(product.price),
    description: product.description ?? '',
    image_url: product.image_url ?? '',
    seller_name: product.seller_name,
    status: product.status,
    category: product.category ?? 'digital',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  function validate() {
    const newErrors: Record<string, string> = {}
    if (!form.title.trim()) newErrors.title = '상품명을 입력해주세요'
    if (!form.price.trim()) newErrors.price = '가격을 입력해주세요'
    else if (isNaN(Number(form.price)) || Number(form.price) < 0) newErrors.price = '올바른 가격을 입력해주세요'
    if (!form.seller_name.trim()) newErrors.seller_name = '판매자 이름을 입력해주세요'
    return newErrors
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    const { error } = await supabase
      .from('products')
      .update({
        title: form.title.trim(),
        price: Number(form.price),
        description: form.description.trim(),
        image_url: form.image_url.trim() || null,
        seller_name: form.seller_name.trim(),
        status: form.status,
        category: form.category,
      })
      .eq('id', product.id)

    setLoading(false)
    if (error) {
      setErrors({ submit: '수정에 실패했습니다. 다시 시도해주세요.' })
      return
    }
    router.push(`/products/${product.id}`)
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#F8F8F7]">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-[480px] mx-auto flex items-center justify-between px-4 h-14">
          <Link
            href={`/products/${product.id}`}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={22} className="text-gray-700" />
          </Link>
          <h1 className="font-bold text-[16px] text-gray-900">게시글 수정</h1>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="text-sm font-semibold text-goguma-500 hover:text-goguma-600 disabled:text-gray-300 transition-colors"
          >
            {loading ? '저장 중...' : '완료'}
          </button>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="max-w-[480px] mx-auto">
        {/* 이미지 URL */}
        <div className="bg-white px-4 py-5 border-b border-gray-100">
          <label className="block text-xs font-semibold text-gray-500 mb-2">이미지 URL (선택)</label>
          <div className="flex gap-3 items-start">
            <div className="w-20 h-20 rounded-xl bg-gray-100 border-2 border-dashed border-gray-200 flex-shrink-0 overflow-hidden flex items-center justify-center">
              {form.image_url ? (
                <img src={form.image_url} alt="미리보기" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon size={24} className="text-gray-300" />
              )}
            </div>
            <div className="flex-1">
              <input
                type="text"
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-goguma-400 transition-colors"
              />
              <p className="text-xs text-gray-400 mt-1.5">이미지 주소를 붙여넣으면 미리보기가 나타납니다</p>
            </div>
          </div>
        </div>

        <div className="bg-white mt-2 divide-y divide-gray-100">
          {/* 상품명 */}
          <div className="px-4 py-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              상품명 <span className="text-goguma-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="상품명을 입력해주세요"
              maxLength={100}
              className={`w-full text-[15px] text-gray-900 placeholder-gray-300 focus:outline-none ${errors.title ? 'border-b border-red-400' : ''}`}
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          {/* 가격 */}
          <div className="px-4 py-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              가격 <span className="text-goguma-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-bold text-gray-400">₩</span>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className={`flex-1 text-[15px] text-gray-900 placeholder-gray-300 focus:outline-none ${errors.price ? 'border-b border-red-400' : ''}`}
              />
            </div>
            {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
          </div>

          {/* 카테고리 */}
          <div className="px-4 py-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">카테고리</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full text-[15px] text-gray-900 focus:outline-none bg-transparent"
            >
              <option value="digital">📱 디지털/가전</option>
              <option value="fashion">👕 의류</option>
              <option value="furniture">🪑 가구/인테리어</option>
              <option value="book">📚 도서</option>
              <option value="sports">⚽ 스포츠/레저</option>
              <option value="kids">🧸 유아동</option>
              <option value="beauty">💄 뷰티/미용</option>
            </select>
          </div>

          {/* 판매 상태 */}
          <div className="px-4 py-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">판매 상태</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full text-[15px] text-gray-900 focus:outline-none bg-transparent"
            >
              <option value="판매중">판매중</option>
              <option value="예약중">예약중</option>
              <option value="판매완료">판매완료</option>
            </select>
          </div>

          {/* 상품 설명 */}
          <div className="px-4 py-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">상품 설명</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="상품에 대해 자세히 설명해주세요"
              rows={5}
              className="w-full text-[15px] text-gray-900 placeholder-gray-300 focus:outline-none resize-none"
            />
          </div>

          {/* 판매자 이름 */}
          <div className="px-4 py-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              판매자 이름 <span className="text-goguma-500">*</span>
            </label>
            <input
              type="text"
              name="seller_name"
              value={form.seller_name}
              onChange={handleChange}
              placeholder="닉네임을 입력해주세요"
              maxLength={20}
              className={`w-full text-[15px] text-gray-900 placeholder-gray-300 focus:outline-none ${errors.seller_name ? 'border-b border-red-400' : ''}`}
            />
            {errors.seller_name && <p className="text-xs text-red-500 mt-1">{errors.seller_name}</p>}
          </div>
        </div>

        {errors.submit && (
          <div className="mx-4 mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}

        <div className="px-4 pt-4 pb-10 mt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-goguma-500 text-white font-bold text-[16px] hover:bg-goguma-600 active:scale-[0.98] transition-all shadow-sm shadow-goguma-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
          >
            {loading ? '저장 중...' : '수정 완료'}
          </button>
          <Link
            href={`/products/${product.id}`}
            className="block text-center mt-3 py-3 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
          >
            취소
          </Link>
        </div>
      </form>
    </div>
  )
}
