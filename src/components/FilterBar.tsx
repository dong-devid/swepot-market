'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Search, X } from 'lucide-react'

const statusOptions = ['전체', '판매중', '예약중', '판매완료']

const sortOptions = [
  { value: 'latest', label: '최신순' },
  { value: 'price_asc', label: '낮은 가격순' },
  { value: 'price_desc', label: '높은 가격순' },
]

export default function FilterBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentSearch = searchParams.get('search') ?? ''
  const currentStatus = searchParams.get('status') ?? '전체'
  const currentSort = searchParams.get('sort') ?? 'latest'

  const [searchInput, setSearchInput] = useState(currentSearch)

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('page')
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === '전체' || value === 'latest') {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })
    router.replace(`${pathname}?${params.toString()}`)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      updateParams({ search: searchInput || null })
    }, 300)
    return () => clearTimeout(timer)
  }, [searchInput])

  return (
    <div className="bg-white border-b border-gray-100">
      {/* 검색 입력 */}
      <div className="max-w-[480px] mx-auto px-4 pt-3 pb-2">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="어떤 상품을 찾고 계세요?"
            className="w-full pl-9 pr-9 py-2.5 bg-gray-100 rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-goguma-300 transition-all"
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2"
            >
              <X size={15} className="text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* 상태 필터 + 정렬 */}
      <div className="max-w-[480px] mx-auto px-4 pb-3 flex items-center gap-2">
        <div className="flex gap-1.5 flex-1 overflow-x-auto no-scrollbar">
          {statusOptions.map((s) => (
            <button
              key={s}
              onClick={() => updateParams({ status: s })}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all
                ${currentStatus === s
                  ? 'bg-goguma-500 text-white shadow-sm shadow-goguma-200'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
            >
              {s}
            </button>
          ))}
        </div>
        <select
          value={currentSort}
          onChange={(e) => updateParams({ sort: e.target.value })}
          className="flex-shrink-0 text-xs text-gray-600 border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-goguma-400 bg-white"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
