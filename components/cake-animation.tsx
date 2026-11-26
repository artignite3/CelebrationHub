// A small cake with one lit candle, drawn in code so it matches the page palette
export default function CakeAnimation() {
  return (
    <svg viewBox="0 0 120 120" className="h-auto w-full" role="img" aria-label="Birthday cake with a lit candle">
      <defs>
        <radialGradient id="cake-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f0a848" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f0a848" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cake-side" x1="0" x2="1">
          <stop offset="0%" stopColor="#e9dcc4" />
          <stop offset="100%" stopColor="#d6c5a8" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="22" r="18" fill="url(#cake-glow)" />
      {/* flame */}
      <path className="cake-flame" d="M60 12c3 5 5 8 5 11a5 5 0 0 1-10 0c0-3 2-6 5-11z" fill="#f0a848" />
      <path d="M60 18c1.4 2.4 2.2 3.8 2.2 5.2a2.2 2.2 0 0 1-4.4 0c0-1.4.8-2.8 2.2-5.2z" fill="#fbe3b8" />
      {/* candle */}
      <rect x="57" y="30" width="6" height="22" rx="1.5" fill="#f4ecdc" />
      <path d="M57 36l6-3M57 43l6-3M57 50l6-3" stroke="#c9826a" strokeWidth="1.5" />
      {/* plate */}
      <ellipse cx="60" cy="104" rx="50" ry="7" fill="#262421" />
      {/* cake body */}
      <path d="M20 62h80v38c0 3-18 6-40 6s-40-3-40-6z" fill="url(#cake-side)" />
      <path d="M20 80c0 3 18 6 40 6s40-3 40-6" fill="none" stroke="#c9826a" strokeWidth="3" />
      {/* icing */}
      <ellipse cx="60" cy="62" rx="40" ry="8" fill="#f4ecdc" />
      <path d={`M20 62v4${" q5 7 10 0".repeat(8)}v-4z`} fill="#f4ecdc" />
    </svg>
  )
}
