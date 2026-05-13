import { supabase, Product } from '@/lib/supabase'
import Header from '@/components/Header'
import CategoryBar from '@/components/CategoryBar'
import ProductCard from '@/components/ProductCard'
import BottomNav from '@/components/BottomNav'
import { Plus } from 'lucide-react'

async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return []
  }
  return data
}

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-[#F8F8F7]">
      <Header />
      <CategoryBar />

      <main className="max-w-[480px] mx-auto px-4 pt-4 pb-28">
        {products.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-5xl mb-4">🥔</p>
            <p className="font-medium">아직 등록된 상품이 없어요</p>
            <p className="text-sm mt-1">첫 번째 상품을 등록해보세요!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* 상품 등록 FAB */}
      <button className="fixed bottom-20 right-4 w-14 h-14 bg-orange-500 text-white rounded-full shadow-lg shadow-orange-200 flex items-center justify-center hover:bg-orange-600 active:scale-95 transition-all z-10">
        <Plus size={26} strokeWidth={2.5} />
      </button>

      <BottomNav />
    </div>
  )
}
