const PROJECT_REF = process.env.SUPABASE_PROJECT_REF;
const TOKEN = process.env.SUPABASE_ACCESS_TOKEN;

async function query(sql) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sql }),
  });
  return res.json();
}

await query(`DELETE FROM products;`);
console.log('기존 데이터 삭제 완료');

await query(`
  INSERT INTO products (title, description, price, image_url, seller_name, status) VALUES
  ('아이폰 14 Pro 256GB', '구매한지 6개월된 아이폰입니다. 케이스 끼고 사용해서 상태 매우 좋아요. 박스 있음.', 850000, 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400', '김민준', '판매중'),
  ('맥북 에어 M2', '2023년 구매. 배터리 사이클 50회 미만. 충전기 포함. 파우치 드려요.', 1200000, 'https://images.unsplash.com/photo-1611186871525-9a15ab7b8ead?w=400', '이서연', '판매중'),
  ('나이키 에어포스1 270mm', '두 번 신었어요. 사이즈가 안맞아서 팝니다. 박스 포함.', 75000, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', '박지훈', '판매중'),
  ('무인양품 오크 책상', '120x60cm 사이즈. 흠집 없이 깨끗해요. 직거래만 가능 (서울 마포구).', 180000, 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400', '최수아', '예약중'),
  ('다이슨 에어랩 컴플리트', '1년 사용. 모든 구성품 있습니다. 정품 영수증 있어요.', 430000, 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400', '정유진', '판매중'),
  ('레고 테크닉 포르쉐 42096', '조립 후 전시만 했어요. 모든 부품 있고 설명서 포함. 박스 상태 좋음.', 95000, 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400', '강도현', '판매완료');
`);
console.log('새 데이터 삽입 완료');

const result = await query(`SELECT title, price, seller_name, status FROM products ORDER BY created_at;`);
console.log('\n=== 저장된 데이터 ===');
result.forEach(r => console.log(`${r.title} | ₩${r.price.toLocaleString()} | ${r.seller_name} | ${r.status}`));
