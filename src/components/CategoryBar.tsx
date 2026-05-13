'use client'

import { useState } from 'react'

const categories = [
  { id: 'all', label: '전체', emoji: '🏠' },
  { id: 'digital', label: '디지털/가전', emoji: '📱' },
  { id: 'fashion', label: '의류', emoji: '👕' },
  { id: 'furniture', label: '가구/인테리어', emoji: '🪑' },
  { id: 'book', label: '도서', emoji: '📚' },
  { id: 'sports', label: '스포츠/레저', emoji: '⚽' },
  { id: 'kids', label: '유아동', emoji: '🧸' },
  { id: 'beauty', label: '뷰티/미용', emoji: '💄' },
]

export default function CategoryBar() {
  const [active, setActive] = useState('all')

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-[480px] mx-auto flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all
              ${active === cat.id
                ? 'bg-orange-500 text-white shadow-sm shadow-orange-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
