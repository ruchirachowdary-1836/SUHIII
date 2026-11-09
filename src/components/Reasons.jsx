import { useState } from 'react'
import { motion } from 'framer-motion'
import { reasons } from '../data/content'
import { Bow, DiaryHeading, Heart } from './Decor'

function ReasonCard({ r, i }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: i % 2 ? 3 : -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1.5 : -1.5 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (i % 3) * 0.12 }}
      className="relative h-56 sm:h-64"
      style={{ perspective: 1000 }}
    >
      <motion.button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.6 }}
        className="relative h-full w-full text-center"
        style={{ transformStyle: 'preserve-3d' }}
        aria-label={`${r.title} — tap to flip`}
      >
        {/* front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-white to-blush-100 p-6 shadow-soft ring-1 ring-blush-200"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Bow tone={['pink', 'cherry', 'blush'][i % 3]} className="absolute -top-6 left-1/2 h-12 w-14 -translate-x-1/2 drop-shadow" />
          <span className="font-script text-6xl text-blush-400">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="mt-2 font-serif text-2xl font-semibold leading-snug text-cherry-600">{r.title}</h3>
          <span className="mt-4 font-hand text-base text-blush-600">tap me ♡</span>
          <div className="absolute inset-x-6 bottom-3 h-2 rounded-full lace-holes opacity-70" />
        </div>
        {/* back */}
        <div
          className="gingham absolute inset-0 flex items-center justify-center rounded-3xl p-3 shadow-soft"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-white/90 p-5">
            <span className="text-4xl">{r.icon}</span>
            <p className="mt-3 font-hand text-2xl leading-snug text-cherry-600">{r.note}</p>
            <Heart className="mt-3 h-5 w-5" fill="#d6214f" />
          </div>
        </div>
      </motion.button>
    </motion.div>
  )
}

export default function Reasons() {
  return (
    <section id="reasons" className="relative z-10 px-3 py-16 sm:px-6">
      <div className="diary-page">
        <div className="lace-top" />
        <DiaryHeading kicker="page four" title="Reasons You're So Special" subtitle="Just a few. The full list would need a thousand diaries." />
        <div className="grid grid-cols-1 gap-10 pt-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <ReasonCard key={r.title} r={r} i={i} />
          ))}
        </div>
        <div className="lace-bottom" />
      </div>
    </section>
  )
}
