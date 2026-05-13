export default function GogumaCharacter({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      {/* 김 (steam) */}
      <path d="M34 14 Q32 9 34 4 Q36 9 34 14" stroke="#F5C418" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M50 10 Q48 5 50 0 Q52 5 50 10" stroke="#F5C418" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M66 14 Q64 9 66 4 Q68 9 66 14" stroke="#F5C418" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.7"/>

      {/* 새싹 */}
      <line x1="50" y1="18" x2="50" y2="10" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M50 12 Q44 5 38 9 Q43 16 50 12" fill="#5DBB4A"/>
      <path d="M50 12 Q56 5 62 9 Q57 16 50 12" fill="#6FCE5A"/>

      {/* 고구마 몸통 - 보라색 껍질 */}
      <ellipse cx="50" cy="72" rx="40" ry="48" fill="#7B2D8E"/>

      {/* 껍질 질감 라인 */}
      <path d="M18 58 Q22 50 20 42" stroke="#6A2080" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M82 58 Q78 50 80 42" stroke="#6A2080" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M14 70 Q16 62 14 55" stroke="#6A2080" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4"/>

      {/* 속살 - 노란색 */}
      <ellipse cx="50" cy="76" rx="26" ry="34" fill="#F5C418"/>

      {/* 속살 하이라이트 */}
      <ellipse cx="50" cy="72" rx="18" ry="24" fill="#FFE566" opacity="0.5"/>

      {/* 눈 */}
      <circle cx="38" cy="65" r="5.5" fill="#2D1040"/>
      <circle cx="62" cy="65" r="5.5" fill="#2D1040"/>
      {/* 눈 하이라이트 */}
      <circle cx="40" cy="63" r="2" fill="white"/>
      <circle cx="64" cy="63" r="2" fill="white"/>
      <circle cx="37" cy="67" r="1" fill="white" opacity="0.5"/>
      <circle cx="61" cy="67" r="1" fill="white" opacity="0.5"/>

      {/* 볼터치 */}
      <ellipse cx="26" cy="73" rx="8" ry="6" fill="#FF9EC4" opacity="0.45"/>
      <ellipse cx="74" cy="73" rx="8" ry="6" fill="#FF9EC4" opacity="0.45"/>

      {/* 입 */}
      <path d="M38 78 Q50 88 62 78" stroke="#2D1040" strokeWidth="2.8" fill="none" strokeLinecap="round"/>

      {/* 팔/손 */}
      <ellipse cx="14" cy="75" rx="7" ry="5" fill="#7B2D8E" transform="rotate(-20 14 75)"/>
      <ellipse cx="86" cy="75" rx="7" ry="5" fill="#7B2D8E" transform="rotate(20 86 75)"/>
    </svg>
  )
}

export function GogumaIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* 새싹 */}
      <line x1="50" y1="15" x2="50" y2="8" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round"/>
      <path d="M50 11 Q45 5 40 8 Q44 14 50 11" fill="#5DBB4A"/>
      <path d="M50 11 Q55 5 60 8 Q56 14 50 11" fill="#6FCE5A"/>
      {/* 몸통 */}
      <ellipse cx="50" cy="60" rx="36" ry="40" fill="#7B2D8E"/>
      {/* 속살 */}
      <ellipse cx="50" cy="65" rx="22" ry="28" fill="#F5C418"/>
      {/* 눈 */}
      <circle cx="40" cy="55" r="5" fill="#2D1040"/>
      <circle cx="60" cy="55" r="5" fill="#2D1040"/>
      <circle cx="41.5" cy="53.5" r="1.8" fill="white"/>
      <circle cx="61.5" cy="53.5" r="1.8" fill="white"/>
      {/* 볼 */}
      <ellipse cx="28" cy="62" rx="7" ry="5" fill="#FF9EC4" opacity="0.45"/>
      <ellipse cx="72" cy="62" rx="7" ry="5" fill="#FF9EC4" opacity="0.45"/>
      {/* 입 */}
      <path d="M40 68 Q50 76 60 68" stroke="#2D1040" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  )
}
