import { useState } from 'react'
import { motion } from 'framer-motion'
import { photo, VIDEO_SRC } from '../data/content'
import { Bow, Heart, Pearls, Photo, Sparkle } from './Decor'
import { burst, shower } from '../confetti'
import { Lightbox } from './Gallery'

// Best pictures for the finale collage
const BEST = [13, 26, 9, 30, 11, 25, 10, 28, 5, 21].map((n) => ({ ...photo(n), caption: 'forever my Suhi 🎀' }))
const spots = [
  'left-[2%] top-[6%] w-28 sm:w-40 -rotate-6',
  'right-[3%] top-[4%] w-24 sm:w-36 rotate-6',
  'left-[6%] bottom-[8%] w-24 sm:w-36 rotate-3',
  'right-[5%] bottom-[10%] w-28 sm:w-40 -rotate-3',
  'left-[30%] top-[2%] hidden md:block w-32 rotate-2',
  'right-[28%] bottom-[3%] hidden md:block w-32 -rotate-2',
  'left-[1%] top-[42%] hidden lg:block w-32 rotate-6',
  'right-[1%] top-[40%] hidden lg:block w-32 -rotate-6',
]

export default function Finale() {
  const [index, setIndex] = useState(null)
  return (
    <section
      id="forever"
      className="relative z-10 flex min-h-[100svh] items-center justify-center overflow-hidden bg-gradient-to-br from-blush-300 via-blush-400 to-cherry-500 px-4 py-24"
    >
      <motion.div
        className="absolute inset-0"
        onViewportEnter={() => shower(3200)}
        viewport={{ once: true, amount: 0.5 }}
      />

      {/* floating collage */}
      {spots.map((cls, i) => (
        <motion.button
          key={i}
          type="button"
          onClick={() => setIndex(i)}
          className={`absolute z-10 bg-white p-1.5 pb-5 shadow-polaroid ${cls}`}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          animate={{ y: [0, i % 2 ? -12 : 12, 0] }}
          transition={{ y: { duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }, opacity: { delay: i * 0.12 }, scale: { delay: i * 0.12 } }}
          whileHover={{ scale: 1.08, rotate: 0 }}
          aria-label="Open photo"
        >
          <Bow tone={i % 2 ? 'white' : 'cherry'} className="absolute -top-4 left-1/2 z-10 h-8 w-10 -translate-x-1/2" />
          <Photo src={BEST[i].thumb} alt="Suhi" className="aspect-[4/5] w-full" />
        </motion.button>
      ))}

      {/* sparkles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <Sparkle
          key={i}
          className="twinkle absolute"
          fill="#fff"
          style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, width: 10 + (i % 4) * 4, '--delay': `${-i * 0.4}s` }}
        />
      ))}

      <div className="relative z-20 max-w-3xl text-center">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 110, damping: 9 }}
        >
          <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity }}>
            <Bow tone="white" className="mx-auto h-28 w-32 drop-shadow-xl sm:h-36 sm:w-44" />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-4 font-serif text-5xl font-semibold uppercase leading-[1.05] tracking-wide text-white drop-shadow-[0_4px_20px_rgba(143,15,49,0.5)] sm:text-7xl md:text-8xl"
        >
          Love you forever,
          <span className="mt-2 block font-script text-7xl normal-case tracking-normal sm:text-9xl">Suhiiii! 🎀</span>
        </motion.h2>

        <Pearls className="mt-6" count={19} size={10} />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mx-auto mt-6 max-w-md font-hand text-2xl text-white/95"
        >
          Almost five years down, forever to go. Forever my girl, forever my sister.
        </motion.p>

        {VIDEO_SRC && (
          <div className="relative mx-auto mt-10 max-w-sm rounded-2xl bg-white p-2 shadow-2xl">
            <Bow tone="pink" className="absolute -top-6 left-1/2 z-10 h-12 w-14 -translate-x-1/2" />
            <video src={VIDEO_SRC} controls playsInline preload="metadata" className="w-full rounded-xl" />
            <p className="py-2 font-hand text-xl text-cherry-600">a little video, just for you ♡</p>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => {
            burst({ x: 0.5, y: 0.55 })
            shower(1800)
          }}
          className="mt-10 rounded-full bg-white px-8 py-3.5 font-hand text-2xl text-cherry-600 shadow-xl"
        >
          one more celebration! <Heart className="ml-1 inline h-5 w-5 align-[-3px]" fill="#d6214f" />
        </motion.button>

        <p className="mt-10 font-serif text-sm uppercase tracking-[0.4em] text-white/80">the end · or just the beginning</p>
      </div>

      <Lightbox items={BEST} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </section>
  )
}
