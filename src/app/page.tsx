import { supabase, Product } from '@/lib/supabase'
import Header from '@/components/Header'
import CategoryBar from '@/components/CategoryBar'
import FilterBar from '@/components/FilterBar'
import ProductCard from '@/components/ProductCard'
import BottomNav from '@/components/BottomNav'
import GogumaCharacter from '@/components/GogumaCharacter'
import Pagination from '@/components/Pagination'
import Link from 'next/link'
import { Plus } from 'lucide-react'

const PAGE_SIZE = 5

type SearchParams = {
  page?: string
  search?: string
  status?: string
  sort?: string
  category?: string
}

async function getProducts(params: SearchParams): Promise<{ products: Product[]; total: number }> {
  const page = Math.max(1, Number(params.page) || 1)
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabase
    .from('products')
    .select('*', { count: 'exact' })

  if (params.search) {
    query = query.ilike('title', `%${params.search}%`)
  }
  if (params.status && params.status !== '전체') {
    query = query.eq('status', params.status)
  }
  if (params.category && params.category !== 'all') {
    query = query.eq('category', params.category)
  }

  if (params.sort === 'price_asc') {
    query = query.order('price', { ascending: true })
  } else if (params.sort === 'price_desc') {
    query = query.order('price', { ascending: false })
  } else {
    query = query.order('created_at', { ascending: false }).order('id', { ascending: true })
  }

  const { data, error, count } = await query.range(from, to)

  if (error) {
    console.error(error)
    return { products: [], total: 0 }
  }
  return { products: data, total: count ?? 0 }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const currentPage = Math.max(1, Number(params.page) || 1)
  const { products, total } = await getProducts(params)
  const totalPages = Math.ceil(total / PAGE_SIZE)

  const isFiltered = params.search || (params.status && params.status !== '전체') || (params.category && params.category !== 'all')

  return (
    <div className="min-h-screen bg-[#F8F8F7]">
      <Header />
      <CategoryBar />
      <FilterBar />

      {/* 고구마 히어로 배너 */}
      {!isFiltered && (
        <div className="max-w-[480px] mx-auto px-4 pt-4">
          <div className="relative bg-gradient-to-r from-goguma-500 to-goguma-400 rounded-2xl px-5 py-4 overflow-hidden flex items-center justify-between">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white opacity-5 rounded-full" />
            <div className="absolute -right-2 -bottom-8 w-24 h-24 bg-gold-300 opacity-10 rounded-full" />
            <div>
              <p className="text-gold-200 text-xs font-semibold mb-1">🔥 오늘의 군고구마 추천</p>
              <h2 className="text-white font-extrabold text-[17px] leading-snug">
                따뜻한 우리 동네<br />중고거래 시작해요!
              </h2>
              <p className="text-goguma-200 text-xs mt-1.5">총 {total}개 상품이 기다려요</p>
            </div>
            <div className="flex-shrink-0 -mb-4">
              <GogumaCharacter size={88} />
            </div>
          </div>
        </div>
      )}

      <main className="max-w-[480px] mx-auto px-4 pt-3 pb-28">
        {/* 결과 정보 */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-500">
            {params.search
              ? <><span className="font-semibold text-goguma-600">"{params.search}"</span> 검색결과 <span className="font-semibold text-gray-800">{total}</span>개</>
              : <>전체 <span className="font-semibold text-gray-800">{total}</span>개</>
            }
          </p>
          {totalPages > 1 && (
            <p className="text-sm text-gray-400">{currentPage} / {totalPages} 페이지</p>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-5xl mb-4">🥔</p>
            <p className="font-medium">
              {params.search ? `"${params.search}" 검색 결과가 없어요` : '상품이 없어요'}
            </p>
            <p className="text-sm mt-1">다른 검색어나 필터를 사용해보세요!</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </>
        )}
      </main>

      {/* 상품 등록 FAB */}
      <Link href="/products/new" className="fixed bottom-20 right-4 w-14 h-14 bg-goguma-500 text-white rounded-full shadow-lg shadow-goguma-300 flex items-center justify-center hover:bg-goguma-600 active:scale-95 transition-all z-10">
        <Plus size={26} strokeWidth={2.5} />
      </Link>

      <BottomNav />
    </div>
  )
}
