'use client'

import { Home, FileText, MapPin, MessageCircle, User } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { id: 'home', label: '홈', icon: Home },
  { id: 'town', label: '동네생활', icon: FileText },
  { id: 'near', label: '내 근처', icon: MapPin },
  { id: 'chat', label: '채팅', icon: MessageCircle },
  { id: 'my', label: '나의 고구마', icon: User },
]

export default function BottomNav() {
  const [active, setActive] = useState('home')

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20">
      <div className="max-w-[480px] mx-auto flex items-center">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex-1 flex flex-col items-center gap-1 py-2.5 transition-colors
              ${active === id ? 'text-goguma-500' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Icon size={22} strokeWidth={active === id ? 2.5 : 1.8} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
