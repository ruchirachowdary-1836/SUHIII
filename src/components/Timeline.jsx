import { motion } from 'framer-motion'
import { photo, timeline } from '../data/content'
import { Bow, DiaryHeading, Heart, Photo } from './Decor'

export default function Timeline() {
  return (
    <section id="journey" className="relative z-10 px-3 py-16 sm:px-6">
      <div className="diary-page overflow-hidden" style={{ background: 'linear-gradient(#fff6f0, #fff0f3)' }}>
        <div className="lace-top" />
        {/* vintage paper speckle */}
        <div className="pointer-events-none absolute inset-0 opacity-40 lace-holes [mask-image:linear-gradient(90deg,black_0,transparent_40px,transparent_calc(100%-40px),black_100%)]" />
        <DiaryHeading kicker="page two" title="Almost 5 Years of Us ♡" subtitle="All the beautiful memories, the little moments that became unforgettable — and the day friends became sisters." />

        <div className="relative mx-auto max-w-4xl">
          {/* ribbon spine */}
          <div className="absolute bottom-0 left-5 top-0 w-2 rounded-full bg-gradient-to-b from-blush-300 via-blush-500 to-cherry-500 shadow-inner sm:left-1/2 sm:-translate-x-1/2" />

          {timeline.map((t, i) => {
            const left = i % 2 === 0
            return (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, x: left ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8 }}
                className={`relative mb-14 pl-14 sm:mb-20 sm:flex sm:pl-0 ${left ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
              >
                {/* bow knot on spine */}
                <div className="absolute left-0 top-2 z-10 sm:left-1/2 sm:-translate-x-1/2">
                  <Bow tone={i === timeline.length - 1 ? 'cherry' : 'pink'} className="h-10 w-12 drop-shadow-md" />
                </div>

                <div className={`sm:w-1/2 ${left ? 'sm:pr-14 sm:text-right' : 'sm:pl-14'}`}>
                  <div className="relative rounded-2xl bg-white/90 p-5 shadow-soft ring-1 ring-blush-200 sm:p-6">
                    <span className="washi -top-3 rotate-[3deg]" style={{ [left ? 'right' : 'left']: '1.5rem' }} />
                    <p className="font-serif text-xs uppercase tracking-[0.3em] text-blush-600">{t.year}</p>
                    <h3 className="mt-1 font-script text-4xl text-cherry-600">{t.title}</h3>
                    <p className="mt-2 font-serif text-lg leading-relaxed text-cocoa/85">{t.text}</p>
                    <Heart className={`mt-3 inline-block h-4 w-4 ${left ? 'sm:ml-auto' : ''}`} fill="#f57aa0" />
                  </div>
                </div>

                <div className={`mt-6 flex gap-3 sm:mt-0 sm:w-1/2 ${left ? 'sm:pl-14' : 'sm:flex-row-reverse sm:pr-14'}`}>
                  {t.photos.map((n, k) => {
                    const p = photo(n)
                    return (
                      <motion.div
                        key={n}
                        whileHover={{ rotate: 0, scale: 1.06 }}
                        className="relative w-1/2 bg-white p-2 pb-6 shadow-polaroid"
                        style={{ rotate: `${k ? 4 : -4}deg`, marginTop: k ? 24 : 0 }}
                      >
                        <span className="washi -top-3 left-1/2 w-16 -translate-x-1/2 rotate-[-6deg]" />
                        <Photo src={p.thumb} alt={t.title} className="aspect-[4/5] w-full sepia-[.15]" />
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}

          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative pl-14 font-script text-4xl text-cherry-600 sm:pl-0 sm:text-center sm:text-5xl"
          >
            …and forever to go 🎀
          </motion.p>
        </div>
        <div className="lace-bottom" />
      </div>
    </section>
  )
}
