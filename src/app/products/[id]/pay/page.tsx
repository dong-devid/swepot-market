import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import PayWidget from './PayWidget'

export default async function PayPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !product) notFound()

  return (
    <div className="min-h-screen bg-[#F8F8F7]">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-[480px] mx-auto flex items-center px-4 h-14 gap-3">
          <Link
            href={`/products/${id}`}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={22} className="text-gray-700" />
          </Link>
          <h1 className="font-bold text-[16px] text-gray-900">결제하기</h1>
        </div>
      </header>

      <PayWidget product={product} />
    </div>
  )
}
