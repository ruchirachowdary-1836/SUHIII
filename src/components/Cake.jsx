import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bow, DiaryHeading, Heart } from './Decor'
import { shower } from '../confetti'

const CANDLES = [110, 135, 160, 185, 210]

function CakeArt({ lit }) {
  return (
    <svg viewBox="0 0 320 300" className="mx-auto w-full max-w-[380px] drop-shadow-[0_20px_30px_rgba(194,58,99,0.3)]" aria-label="Birthday cake">
      <defs>
        <linearGradient id="tier" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd1df" />
          <stop offset="1" stopColor="#f59ab6" />
        </linearGradient>
        <linearGradient id="tier2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff0f5" />
          <stop offset="1" stopColor="#ffc2d4" />
        </linearGradient>
        <radialGradient id="glow">
          <stop offset="0" stopColor="#fff3b0" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffb3c8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="flame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ff7a59" />
          <stop offset="0.5" stopColor="#ffc93c" />
          <stop offset="1" stopColor="#fff6c8" />
        </linearGradient>
      </defs>

      {/* plate */}
      <ellipse cx="160" cy="276" rx="150" ry="16" fill="#fff" stroke="#ffc2d4" strokeWidth="3" />

      {/* bottom tier */}
      <rect x="40" y="180" width="240" height="92" rx="16" fill="url(#tier)" />
      <path d="M40 196 Q40 180 56 180 H264 Q280 180 280 196 V204 Q268 220 258 204 Q246 228 232 204 Q220 218 206 204 Q192 226 178 204 Q166 216 152 204 Q138 228 124 204 Q112 216 98 204 Q84 226 70 204 Q58 218 40 206 Z" fill="#fff" />
      {Array.from({ length: 17 }).map((_, i) => (
        <circle key={i} cx={52 + i * 13.5} cy="266" r="4.5" fill="#fff" stroke="#f5b8cb" strokeWidth="1" />
      ))}

      {/* top tier */}
      <rect x="80" y="110" width="160" height="74" rx="14" fill="url(#tier2)" />
      <path d="M80 124 Q80 110 94 110 H226 Q240 110 240 124 V130 Q230 146 220 130 Q208 150 196 130 Q184 144 172 130 Q160 152 148 130 Q136 144 124 130 Q112 150 100 130 Q90 142 80 132 Z" fill="#f57aa0" />
      {Array.from({ length: 12 }).map((_, i) => (
        <circle key={i} cx={90 + i * 12.7} cy="178" r="3.6" fill="#fff" stroke="#f5b8cb" strokeWidth="1" />
      ))}

      {/* hearts on cake */}
      <path transform="translate(70 228) scale(0.7)" fill="#d6214f" d="M16 28.5C16 28.5 1 19.5 1 9.2C1 4.4 4.7 1 9 1C12 1 14.6 2.8 16 5.2C17.4 2.8 20 1 23 1C27.3 1 31 4.4 31 9.2C31 19.5 16 28.5 16 28.5Z" />
      <path transform="translate(228 228) scale(0.7)" fill="#d6214f" d="M16 28.5C16 28.5 1 19.5 1 9.2C1 4.4 4.7 1 9 1C12 1 14.6 2.8 16 5.2C17.4 2.8 20 1 23 1C27.3 1 31 4.4 31 9.2C31 19.5 16 28.5 16 28.5Z" />
      <text x="160" y="248" textAnchor="middle" fontFamily="Great Vibes, cursive" fontSize="34" fill="#c23a63">Suhi</text>

      {/* candles */}
      {CANDLES.map((x, i) => (
        <g key={x}>
          <rect x={x - 5} y="62" width="10" height="50" rx="3" fill="#fff" />
          {[0, 1, 2, 3].map((k) => (
            <rect key={k} x={x - 5} y={66 + k * 12} width="10" height="5" fill={i % 2 ? '#f57aa0' : '#d6214f'} opacity="0.85" />
          ))}
          <line x1={x} y1="62" x2={x} y2="55" stroke="#5a2a3a" strokeWidth="1.5" />
          <AnimatePresence>
            {lit && (
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0, y: -6 }}
                transition={{ duration: 0.35, delay: lit ? i * 0.08 : 0 }}
                style={{ transformOrigin: `${x}px 56px` }}
              >
                <circle cx={x} cy="44" r="16" fill="url(#glow)" />
                <path className="flame" style={{ transformBox: 'fill-box' }} d={`M${x} 26 C ${x + 7} 36, ${x + 7} 48, ${x} 56 C ${x - 7} 48, ${x - 7} 36, ${x} 26 Z`} fill="url(#flame)" />
              </motion.g>
            )}
          </AnimatePresence>
          {!lit && (
            <motion.path
              d={`M${x} 52 C ${x - 6} 42, ${x + 6} 34, ${x} 24 C ${x - 6} 14, ${x + 4} 6, ${x} 0`}
              stroke="#c9a9b4"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.8 }}
              animate={{ pathLength: 1, opacity: 0, y: -20 }}
              transition={{ duration: 1.8, delay: i * 0.1 }}
            />
          )}
        </g>
      ))}
    </svg>
  )
}

export default function Cake() {
  const [lit, setLit] = useState(true)
  const blow = () => {
    if (lit) {
      setLit(false)
      setTimeout(() => shower(2800), 350)
    } else setLit(true)
  }

  return (
    <section id="wish" className="relative z-10 px-3 py-16 sm:px-6">
      <div className="diary-page text-center">
        <div className="lace-top" />
        <DiaryHeading kicker="page five" title="Make a wish, birthday girl!" subtitle="Close your eyes, think of something wonderful… then blow!" />

        <div className="relative">
          <Bow tone="pink" className="absolute left-0 top-10 hidden h-14 w-16 -rotate-12 sm:block" />
          <Bow tone="pink" className="absolute right-0 top-10 hidden h-14 w-16 rotate-12 sm:block" />
          <CakeArt lit={lit} />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={blow}
          className="mt-8 rounded-full bg-gradient-to-r from-blush-500 to-cherry-500 px-8 py-3.5 font-hand text-2xl text-white shadow-soft focus:outline-none focus-visible:ring-4 focus-visible:ring-blush-300"
        >
          {lit ? 'Blow out the candles 🌬️' : 'Light them again 🕯️'}
        </motion.button>

        <AnimatePresence>
          {!lit && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
              className="relative mx-auto mt-10 max-w-xl rounded-3xl bg-white/90 px-6 py-8 shadow-soft ring-1 ring-blush-200"
            >
              <Bow tone="cherry" className="absolute -top-6 left-1/2 h-12 w-14 -translate-x-1/2" />
              <p className="font-script text-4xl leading-snug text-cherry-600 sm:text-5xl">
                May all your dreams come true, my Suhiiii!
              </p>
              <p className="mt-3 font-serif text-xl italic text-cocoa/85">You deserve the entire universe. 💗</p>
              <div className="mt-4 flex justify-center gap-2">
                {[0, 1, 2].map((k) => (
                  <Heart key={k} className="h-4 w-4 twinkle" fill="#f57aa0" style={{ '--delay': `${-k * 0.5}s` }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="lace-bottom" />
      </div>
    </section>
  )
}
