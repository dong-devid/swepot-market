'use client'

import { ChevronDown, Search, Bell, AlignJustify } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
      <div className="max-w-[480px] mx-auto flex items-center justify-between px-4 h-14">
        <button className="flex items-center gap-0.5 font-bold text-[17px] text-gray-900 hover:text-orange-500 transition-colors">
          서울 마포구
          <ChevronDown size={18} strokeWidth={2.5} />
        </button>
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Search size={22} strokeWidth={2} className="text-gray-800" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <Bell size={22} strokeWidth={2} className="text-gray-800" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <AlignJustify size={22} strokeWidth={2} className="text-gray-800" />
          </button>
        </div>
      </div>
    </header>
  )
}
