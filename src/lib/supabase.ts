import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Product = {
  id: string
  title: string
  description: string
  price: number
  image_url: string
  seller_name: string
  status: '판매중' | '예약중' | '판매완료'
  category: string | null
  created_at: string
}
