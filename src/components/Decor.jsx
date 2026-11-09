import { useId, useMemo } from 'react'
import { motion } from 'framer-motion'

/** A satin coquette bow. `tone` picks the palette. */
export function Bow({ className = '', tone = 'pink', style }) {
  const id = useId().replace(/:/g, '')
  const tones = {
    pink: ['#ffd1df', '#f57aa0', '#e0557f'],
    cherry: ['#ff6b8d', '#d6214f', '#8f0f31'],
    blush: ['#fff0f5', '#ffc2d4', '#f59ab6'],
    white: ['#ffffff', '#ffe8ef', '#f5b8cb'],
  }
  const [light, mid, dark] = tones[tone] || tones.pink
  return (
    <svg viewBox="0 0 120 100" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="55%" stopColor={mid} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
        <linearGradient id={`t${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={mid} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
      </defs>
      {/* tails */}
      <path d="M55 48 C 50 62, 40 78, 32 96 L 44 90 L 50 99 C 54 80, 58 64, 60 50 Z" fill={`url(#t${id})`} />
      <path d="M65 48 C 70 62, 80 78, 88 96 L 76 90 L 70 99 C 66 80, 62 64, 60 50 Z" fill={`url(#t${id})`} />
      {/* loops */}
      <path d="M58 42 C 40 14, 8 8, 6 32 C 4 56, 34 60, 58 48 Z" fill={`url(#g${id})`} />
      <path d="M62 42 C 80 14, 112 8, 114 32 C 116 56, 86 60, 62 48 Z" fill={`url(#g${id})`} />
      {/* folds */}
      <path d="M54 43 C 40 30, 22 26, 16 34" stroke={light} strokeWidth="2.2" fill="none" opacity="0.8" strokeLinecap="round" />
      <path d="M66 43 C 80 30, 98 26, 104 34" stroke={light} strokeWidth="2.2" fill="none" opacity="0.8" strokeLinecap="round" />
      <path d="M52 47 C 38 50, 24 50, 16 44" stroke={dark} strokeWidth="1.4" fill="none" opacity="0.35" strokeLinecap="round" />
      <path d="M68 47 C 82 50, 96 50, 104 44" stroke={dark} strokeWidth="1.4" fill="none" opacity="0.35" strokeLinecap="round" />
      {/* knot */}
      <rect x="51" y="36" width="18" height="18" rx="7" fill={`url(#t${id})`} />
      <path d="M55 40 C 58 38, 62 38, 65 40" stroke={light} strokeWidth="1.6" fill="none" opacity="0.9" strokeLinecap="round" />
    </svg>
  )
}

/** Bow that gently sways. */
export function SwayBow({ className = '', tone, delay = 0 }) {
  return (
    <motion.div
      className={className}
      animate={{ rotate: [-6, 6, -6] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <Bow tone={tone} className="h-full w-full drop-shadow-md" />
    </motion.div>
  )
}

export function Heart({ className = '', fill = '#f57aa0', style }) {
  return (
    <svg viewBox="0 0 32 29" className={className} style={style} aria-hidden="true">
      <path
        fill={fill}
        d="M16 28.5 C 16 28.5 1 19.5 1 9.2 C 1 4.4 4.7 1 9 1 C 12 1 14.6 2.8 16 5.2 C 17.4 2.8 20 1 23 1 C 27.3 1 31 4.4 31 9.2 C 31 19.5 16 28.5 16 28.5 Z"
      />
    </svg>
  )
}

export function Sparkle({ className = '', fill = '#fff', style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path fill={fill} d="M12 0 C 13 7 17 11 24 12 C 17 13 13 17 12 24 C 11 17 7 13 0 12 C 7 11 11 7 12 0 Z" />
    </svg>
  )
}

/** A strand of pearls, drawn as a gentle curve. */
export function Pearls({ count = 13, className = '', size = 10 }) {
  return (
    <div className={`flex items-end justify-center gap-1 ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const mid = (count - 1) / 2
        const dy = Math.round(((i - mid) ** 2 / mid ** 2) * -10)
        const s = i % 2 ? size * 0.75 : size
        return <span key={i} className="pearl inline-block" style={{ width: s, height: s, transform: `translateY(${dy}px)` }} />
      })}
    </div>
  )
}

/** Section heading styled like a diary page title. */
export function DiaryHeading({ kicker, title, subtitle }) {
  return (
    <div className="relative mb-10 text-center sm:mb-14">
      {kicker && (
        <p className="mb-2 font-serif text-sm uppercase tracking-[0.35em] text-blush-600">{kicker}</p>
      )}
      <div className="flex items-center justify-center gap-3">
        <Bow className="hidden h-9 w-11 -rotate-12 sm:block" tone="blush" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="font-script text-5xl leading-tight text-cherry-600 sm:text-7xl"
        >
          {title}
        </motion.h2>
        <Bow className="hidden h-9 w-11 rotate-12 sm:block" tone="blush" />
      </div>
      <Pearls className="mt-3" count={15} size={8} />
      {subtitle && <p className="mx-auto mt-5 max-w-xl font-serif text-lg italic text-cocoa/80">{subtitle}</p>}
    </div>
  )
}

/** Corner bows for a card or page. */
export function CornerBows({ tone = 'pink', size = 'h-12 w-14 sm:h-16 sm:w-20' }) {
  return (
    <>
      <Bow tone={tone} className={`pointer-events-none absolute -left-3 -top-5 -rotate-[20deg] drop-shadow ${size}`} />
      <Bow tone={tone} className={`pointer-events-none absolute -right-3 -top-5 rotate-[20deg] drop-shadow ${size}`} />
    </>
  )
}

/** Fixed background layer: falling petals, rising hearts, twinkling sparkles. */
export function Ambient({ density = 1 }) {
  const items = useMemo(() => {
    const rnd = (a, b) => a + Math.random() * (b - a)
    const petals = Array.from({ length: Math.round(14 * density) }, (_, i) => ({
      key: `p${i}`,
      kind: 'petal',
      left: rnd(0, 100),
      size: rnd(10, 20),
      dur: rnd(12, 22),
      delay: rnd(-22, 0),
      drift: rnd(-80, 80),
      spin: rnd(180, 720),
    }))
    const hearts = Array.from({ length: Math.round(10 * density) }, (_, i) => ({
      key: `h${i}`,
      kind: 'heart',
      left: rnd(0, 100),
      size: rnd(10, 22),
      dur: rnd(14, 26),
      delay: rnd(-26, 0),
      drift: rnd(-60, 60),
      color: ['#f57aa0', '#ffc2d4', '#d6214f', '#ff9fbc'][i % 4],
    }))
    const sparkles = Array.from({ length: Math.round(16 * density) }, (_, i) => ({
      key: `s${i}`,
      kind: 'sparkle',
      left: rnd(0, 100),
      top: rnd(0, 100),
      size: rnd(6, 14),
      dur: rnd(2, 5),
      delay: rnd(-5, 0),
    }))
    return [...petals, ...hearts, ...sparkles]
  }, [density])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {items.map((it) => {
        if (it.kind === 'petal')
          return (
            <span
              key={it.key}
              className="floater-fall absolute top-0"
              style={{ left: `${it.left}%`, '--dur': `${it.dur}s`, '--delay': `${it.delay}s`, '--drift': `${it.drift}px`, '--spin': `${it.spin}deg` }}
            >
              <span
                className="block"
                style={{
                  width: it.size,
                  height: it.size * 0.8,
                  borderRadius: '80% 0 80% 0',
                  background: 'linear-gradient(135deg, #ffe0ea, #ff9fbc)',
                  opacity: 0.75,
                }}
              />
            </span>
          )
        if (it.kind === 'heart')
          return (
            <span
              key={it.key}
              className="floater-rise absolute bottom-0"
              style={{ left: `${it.left}%`, '--dur': `${it.dur}s`, '--delay': `${it.delay}s`, '--drift': `${it.drift}px` }}
            >
              <Heart fill={it.color} style={{ width: it.size, height: it.size, opacity: 0.6 }} />
            </span>
          )
        return (
          <span
            key={it.key}
            className="twinkle absolute"
            style={{ left: `${it.left}%`, top: `${it.top}%`, '--dur': `${it.dur}s`, '--delay': `${it.delay}s` }}
          >
            <Sparkle fill="#ffffff" style={{ width: it.size, height: it.size, filter: 'drop-shadow(0 0 4px #ffc2d4)' }} />
          </span>
        )
      })}
    </div>
  )
}

/** A photo that falls back to a cute placeholder when the file is missing. */
export function Photo({ src, alt, className = '', imgClassName = '', loading = 'lazy' }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-blush-100 to-blush-300 ${className}`}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-blush-600">
        <Heart className="h-6 w-6" fill="#f57aa0" />
        <span className="font-hand text-sm">photo coming soon ♡</span>
      </div>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        className={`relative h-full w-full object-cover ${imgClassName}`}
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    </div>
  )
}
