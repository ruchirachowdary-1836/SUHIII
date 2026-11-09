import { motion } from 'framer-motion'
import { Bow, Heart, Pearls, Sparkle } from './Decor'

export default function Landing({ onOpen }) {
  return (
    <motion.section
      key="landing"
      className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center"
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(8px)' }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
    >
      {/* corner bows */}
      <Bow tone="blush" className="absolute left-3 top-4 h-14 w-16 -rotate-12 sm:left-8 sm:top-8 sm:h-20 sm:w-24" />
      <Bow tone="blush" className="absolute right-3 top-4 h-14 w-16 rotate-12 sm:right-8 sm:top-8 sm:h-20 sm:w-24" />
      <Bow tone="pink" className="absolute bottom-6 left-4 h-10 w-12 rotate-[200deg] opacity-70 sm:h-14 sm:w-16" />
      <Bow tone="pink" className="absolute bottom-6 right-4 h-10 w-12 rotate-[160deg] opacity-70 sm:h-14 sm:w-16" />

      {/* soft halo */}
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush-300/40 blur-3xl" />

      <motion.div
        initial={{ scale: 0, rotate: -30, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 10, delay: 0.2 }}
        className="relative"
      >
        <motion.div animate={{ rotate: [-4, 4, -4], y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
          <Bow tone="pink" className="h-40 w-48 drop-shadow-[0_15px_25px_rgba(224,85,127,0.45)] sm:h-56 sm:w-64" />
        </motion.div>
        <Sparkle className="absolute -left-4 top-2 h-6 w-6 twinkle" fill="#fff" />
        <Sparkle className="absolute -right-2 top-12 h-4 w-4 twinkle" fill="#fff" style={{ '--delay': '-1.3s' }} />
        <Heart className="absolute -bottom-1 right-6 h-5 w-5 twinkle" fill="#d6214f" style={{ '--delay': '-0.6s' }} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="relative mt-4 font-serif text-xs uppercase tracking-[0.45em] text-blush-600 sm:text-sm"
      >
        a little pink diary · made with love
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.9 }}
        className="relative mt-3 font-script text-6xl leading-[1.05] text-shimmer drop-shadow-sm sm:text-8xl md:text-9xl"
      >
        Happy Birthday,
        <br />
        My Suhiiii! <span className="not-italic">🎀</span>
      </motion.h1>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="relative">
        <Pearls className="mt-5" count={17} size={9} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 1 }}
        className="relative mt-6 max-w-md font-serif text-xl italic text-cocoa/85 sm:text-2xl"
      >
        To my favourite girl, my sweetest soul and my forever sister.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpen}
        className="group relative mt-10 rounded-full bg-gradient-to-r from-blush-500 via-cherry-500 to-blush-500 bg-[length:200%_auto] px-9 py-4 font-hand text-2xl text-white shadow-soft transition-[background-position] duration-700 hover:bg-right focus:outline-none focus-visible:ring-4 focus-visible:ring-blush-300"
      >
        <Bow tone="white" className="absolute -left-6 -top-5 h-9 w-11 -rotate-12" />
        <span className="relative">Open Your Little Surprise ♡</span>
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-blush-400/40" />
      </motion.button>
    </motion.section>
  )
}
