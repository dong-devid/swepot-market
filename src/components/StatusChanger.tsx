'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

type Status = '판매중' | '예약중' | '판매완료'

const statusStyle: Record<Status, string> = {
  '판매중': 'text-goguma-600 bg-goguma-50 border-goguma-200',
  '예약중': 'text-amber-600 bg-amber-50 border-amber-200',
  '판매완료': 'text-gray-500 bg-gray-100 border-gray-200',
}

export default function StatusChanger({ productId, initialStatus }: { productId: string; initialStatus: Status }) {
  const router = useRouter()
  const [status, setStatus] = useState<Status>(initialStatus)
  const [saving, setSaving] = useState(false)

  async function handleChange(newStatus: Status) {
    if (newStatus === status) return
    setSaving(true)
    const { error } = await supabase
      .from('products')
      .update({ status: newStatus })
      .eq('id', productId)
    setSaving(false)
    if (!error) {
      setStatus(newStatus)
      router.refresh()
    }
  }

  return (
    <div className="relative inline-flex items-center">
      <select
        value={status}
        onChange={(e) => handleChange(e.target.value as Status)}
        disabled={saving}
        className={`appearance-none pl-3 pr-7 py-1 rounded-lg border text-xs font-semibold focus:outline-none cursor-pointer transition-colors disabled:opacity-60 ${statusStyle[status]}`}
      >
        <option value="판매중">판매중</option>
        <option value="예약중">예약중</option>
        <option value="판매완료">판매완료</option>
      </select>
      <ChevronDown size={12} className="absolute right-1.5 pointer-events-none text-current opacity-60" />
    </div>
  )
}
