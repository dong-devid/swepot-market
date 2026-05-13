'use client'

import Link from 'next/link'
import { ChevronDown, Search, Bell, PenSquare } from 'lucide-react'
import { GogumaIcon } from './GogumaCharacter'

export default function Header() {
  return (
    <header className="bg-white border-b border-goguma-100 sticky top-0 z-20">
      <div className="max-w-[480px] mx-auto flex items-center justify-between px-4 h-14">
        {/* 로고 - 홈 링크 */}
        <a href="/" className="flex items-center gap-1.5 group">
          <GogumaIcon size={30} />
          <span className="font-extrabold text-[17px] text-goguma-500 group-hover:text-goguma-600 transition-colors">
            고구마마켓
          </span>
        </a>

        {/* 우측 아이콘 */}
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-goguma-50 rounded-full transition-colors">
            <Search size={22} strokeWidth={2} className="text-gray-700" />
          </button>
          <button className="p-2 hover:bg-goguma-50 rounded-full transition-colors relative">
            <Bell size={22} strokeWidth={2} className="text-gray-700" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold-300 rounded-full border border-white" />
          </button>
          <Link href="/products/new" className="p-2 hover:bg-goguma-50 rounded-full transition-colors">
            <PenSquare size={22} strokeWidth={2} className="text-gray-700" />
          </Link>
        </div>
      </div>

      {/* 동네 선택 바 */}
      <div className="max-w-[480px] mx-auto px-4 pb-2">
        <button className="flex items-center gap-0.5 text-[13px] font-semibold text-gray-600 hover:text-goguma-500 transition-colors">
          <span>📍</span>
          서울 마포구
          <ChevronDown size={14} strokeWidth={2.5} />
        </button>
      </div>
    </header>
  )
}
