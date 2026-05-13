import { supabase, Product } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Heart, MessageCircle, Share2, Pencil } from 'lucide-react'
import DeleteButton from '@/components/DeleteButton'
import StatusChanger from '@/components/StatusChanger'

async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const min = Math.floor(diff / 60000)
  if (min < 1) return '방금 전'
  if (min < 60) return `${min}분 전`
  const hour = Math.floor(min / 60)
  if (hour < 24) return `${hour}시간 전`
  return `${Math.floor(hour / 24)}일 전`
}

const statusConfig = {
  '판매중': { label: '판매중', className: 'bg-goguma-100 text-goguma-600' },
  '예약중': { label: '예약중', className: 'bg-goguma-500 text-white' },
  '판매완료': { label: '판매완료', className: 'bg-gray-200 text-gray-500' },
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) notFound()

  const status = statusConfig[product.status]
  const isSoldOut = product.status === '판매완료'

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 헤더 */}
      <div className="fixed top-0 left-0 right-0 z-20 max-w-[480px] mx-auto">
        <div className="flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur-sm border-b border-gray-100">
          <Link
            href="/"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={22} className="text-gray-700" />
          </Link>
          <div className="flex items-center gap-1">
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <Share2 size={18} className="text-gray-700" />
            </button>
            <Link
              href={`/products/${product.id}/edit`}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <Pencil size={18} className="text-gray-700" />
            </Link>
            <DeleteButton productId={product.id} />
          </div>
        </div>
      </div>

      {/* 상품 이미지 */}
      <div className="pt-[57px]">
        <div className="relative w-full aspect-square bg-gray-100 max-w-[480px] mx-auto">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title}
              className={`w-full h-full object-cover ${isSoldOut ? 'opacity-60' : ''}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">🥔</div>
          )}
          {product.status !== '판매중' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${status.className}`}>
                {status.label}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 판매자 정보 */}
      <div className="max-w-[480px] mx-auto px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-goguma-400 to-goguma-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {product.seller_name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-[15px]">{product.seller_name}</p>
            <p className="text-xs text-gray-400 mt-0.5">서울 마포구</p>
          </div>
          <StatusChanger productId={product.id} initialStatus={product.status} />
        </div>
      </div>

      {/* 상품 정보 */}
      <div className="max-w-[480px] mx-auto px-4 py-5">
        {/* 상태 뱃지 + 제목 */}
        <div className="flex items-start gap-2 mb-2">
          {product.status !== '판매중' && (
            <span className={`flex-shrink-0 mt-0.5 px-2 py-0.5 rounded text-xs font-semibold ${status.className}`}>
              {status.label}
            </span>
          )}
          <h1 className="text-xl font-bold text-gray-900 leading-snug">{product.title}</h1>
        </div>

        {/* 카테고리 · 시간 */}
        <p className="text-sm text-gray-400 mb-4">
          서울 마포구 · {timeAgo(product.created_at)}
        </p>

        {/* 설명 */}
        <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-wrap">
          {product.description}
        </p>

        {/* 관심·채팅 수 */}
        <div className="flex items-center gap-3 mt-6 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Heart size={14} />
            관심 3
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <MessageCircle size={14} />
            채팅 1
          </span>
        </div>
      </div>

      {/* 하단 액션 바 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto">
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-t border-gray-100">
          <button className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-goguma-500 transition-colors w-12">
            <Heart size={22} />
            <span className="text-[10px]">관심</span>
          </button>
          <div className="w-px h-8 bg-gray-200" />
          <div className="flex-1 flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              ₩{product.price.toLocaleString()}
            </span>
            {isSoldOut ? (
              <button
                disabled
                className="px-6 py-2.5 rounded-xl bg-gray-200 text-gray-400 font-semibold text-[15px] cursor-not-allowed"
              >
                판매완료
              </button>
            ) : (
              <div className="flex gap-2">
                <button className="px-4 py-2.5 rounded-xl border border-goguma-300 text-goguma-600 font-semibold text-[15px] hover:bg-goguma-50 transition-colors">
                  채팅
                </button>
                <Link
                  href={`/products/${product.id}/pay`}
                  className="px-5 py-2.5 rounded-xl bg-goguma-500 text-white font-semibold text-[15px] hover:bg-goguma-600 active:scale-95 transition-all shadow-sm shadow-goguma-200"
                >
                  구매하기
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 하단 여백 */}
      <div className="h-24" />
    </div>
  )
}
