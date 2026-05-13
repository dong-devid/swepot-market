import Link from 'next/link'
import { Heart, MessageCircle } from 'lucide-react'
import { Product } from '@/lib/supabase'

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const min = Math.floor(diff / 60000)
  if (min < 1) return '방금 전'
  if (min < 60) return `${min}분 전`
  const hour = Math.floor(min / 60)
  if (hour < 24) return `${hour}시간 전`
  return `${Math.floor(hour / 24)}일 전`
}

const statusBadge = {
  '예약중': 'bg-goguma-500 text-white',
  '판매완료': 'bg-gray-400 text-white',
  '판매중': '',
}

export default function ProductCard({ product }: { product: Product }) {
  const isSoldOut = product.status === '판매완료'

  return (
    <Link href={`/products/${product.id}`} className="group bg-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden flex gap-3 p-4">
      {/* 썸네일 */}
      <div className="relative flex-shrink-0 w-[110px] h-[110px] rounded-xl overflow-hidden bg-gray-100">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            className={`w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 ${isSoldOut ? 'opacity-50' : ''}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl">🥔</div>
        )}
        {product.status !== '판매중' && (
          <div className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${statusBadge[product.status]}`}>
            {product.status}
          </div>
        )}
      </div>

      {/* 내용 */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <h3 className={`font-medium text-[15px] leading-snug line-clamp-2 ${isSoldOut ? 'text-gray-400' : 'text-gray-900'}`}>
            {product.title}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            서울 마포구 · {timeAgo(product.created_at)}
          </p>
        </div>
        <div className="flex items-end justify-between mt-2">
          <span className={`font-bold text-[15px] ${isSoldOut ? 'text-gray-400' : 'text-gray-900'}`}>
            ₩{product.price.toLocaleString()}
          </span>
          <div className="flex items-center gap-2.5 text-gray-400">
            <span className="flex items-center gap-0.5 text-xs">
              <MessageCircle size={13} />
              <span>1</span>
            </span>
            <span className="flex items-center gap-0.5 text-xs">
              <Heart size={13} />
              <span>3</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
