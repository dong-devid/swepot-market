'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  currentPage: number
  totalPages: number
}

export default function Pagination({ currentPage, totalPages }: Props) {
  const searchParams = useSearchParams()

  function pageHref(page: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(page))
    return `?${params.toString()}`
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const visiblePages = pages.filter(p =>
    p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2
  )

  return (
    <div className="flex items-center justify-center gap-1.5 py-6">
      {currentPage > 1 ? (
        <Link href={pageHref(currentPage - 1)} className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:border-goguma-400 hover:text-goguma-500 transition-colors">
          <ChevronLeft size={16} />
        </Link>
      ) : (
        <span className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-100 text-gray-300 cursor-not-allowed">
          <ChevronLeft size={16} />
        </span>
      )}

      {visiblePages.map((page, idx) => {
        const prev = visiblePages[idx - 1]
        const showEllipsis = prev && page - prev > 1
        return (
          <div key={page} className="flex items-center gap-1.5">
            {showEllipsis && (
              <span className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">···</span>
            )}
            <Link
              href={pageHref(page)}
              className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all
                ${page === currentPage
                  ? 'bg-goguma-500 text-white shadow-sm shadow-goguma-200'
                  : 'border border-gray-200 bg-white text-gray-600 hover:border-goguma-400 hover:text-goguma-500'
                }`}
            >
              {page}
            </Link>
          </div>
        )
      })}

      {currentPage < totalPages ? (
        <Link href={pageHref(currentPage + 1)} className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:border-goguma-400 hover:text-goguma-500 transition-colors">
          <ChevronRight size={16} />
        </Link>
      ) : (
        <span className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-100 text-gray-300 cursor-not-allowed">
          <ChevronRight size={16} />
        </span>
      )}
    </div>
  )
}
