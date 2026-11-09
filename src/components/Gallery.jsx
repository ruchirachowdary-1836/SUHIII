import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { photos } from '../data/content'
import { Bow, DiaryHeading, Photo } from './Decor'

const aspects = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[2/3]', 'aspect-[5/6]']
const tilts = [-3, 2, -1.5, 3, -2.5, 1.5]
const tones = ['pink', 'cherry', 'blush']

export function Polaroid({ p, i, onClick, className = '' }) {
  const tilt = tilts[i % tilts.length]
  const decor = i % 3 // 0: bow, 1: washi tape, 2: pin heart
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 40, rotate: tilt * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (i % 4) * 0.08 }}
      whileHover={{ rotate: 0, scale: 1.04, zIndex: 5 }}
      className={`group relative mb-6 block w-full break-inside-avoid bg-white p-2.5 pb-12 text-left shadow-polaroid sm:p-3 sm:pb-14 ${className}`}
      aria-label={`Open photo: ${p.caption}`}
    >
      {decor === 0 && <Bow tone={tones[i % 3]} className="absolute -top-5 left-1/2 z-10 h-10 w-12 -translate-x-1/2 drop-shadow" />}
      {decor === 1 && <span className="washi -top-3 left-1/2 z-10 -translate-x-1/2 rotate-[-4deg]" />}
      {decor === 2 && (
        <span className="absolute -top-2 right-4 z-10 h-5 w-5 rounded-full bg-gradient-to-br from-cherry-500 to-cherry-700 shadow" />
      )}
      <Photo
        src={p.thumb}
        alt={p.caption}
        className={`${aspects[i % aspects.length]} w-full`}
        imgClassName="transition-transform duration-700 group-hover:scale-110"
      />
      <span className="absolute bottom-0 left-0 right-0 flex h-12 items-center justify-center px-2 text-center font-hand text-[15px] leading-tight text-cocoa sm:h-14 sm:text-lg">
        {p.caption}
      </span>
    </motion.button>
  )
}

export function Lightbox({ items, index, onClose, onIndex }) {
  const open = index !== null
  const go = useCallback((d) => onIndex((index + d + items.length) % items.length), [index, items.length, onIndex])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, go, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#3a1424]/85 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) go(1)
                else if (info.offset.x > 70) go(-1)
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[82svh] max-w-[92vw] cursor-grab bg-white p-3 pb-14 shadow-2xl active:cursor-grabbing sm:p-4 sm:pb-16"
            >
              <Bow tone="pink" className="absolute -top-7 left-1/2 z-10 h-14 w-16 -translate-x-1/2 drop-shadow-lg" />
              <img
                src={items[index].src}
                alt={items[index].caption}
                className="max-h-[calc(82svh-5rem)] max-w-[calc(92vw-2rem)] select-none object-contain"
                draggable={false}
              />
              <figcaption className="absolute bottom-3 left-0 right-0 text-center font-hand text-2xl text-cocoa sm:bottom-4">
                {items[index].caption}
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <p className="mt-4 font-serif text-sm tracking-widest text-blush-200">
            {index + 1} / {items.length}
          </p>

          <button
            onClick={(e) => (e.stopPropagation(), go(-1))}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-3 text-2xl text-cherry-600 shadow-lg transition hover:scale-110 sm:left-6"
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            onClick={(e) => (e.stopPropagation(), go(1))}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-3 text-2xl text-cherry-600 shadow-lg transition hover:scale-110 sm:right-6"
            aria-label="Next photo"
          >
            ›
          </button>
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full bg-white/85 px-4 py-2 font-hand text-lg text-cherry-600 shadow-lg transition hover:scale-105 sm:right-6 sm:top-6"
            aria-label="Close gallery"
          >
            close ♡
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default function Gallery() {
  const [index, setIndex] = useState(null)
  return (
    <section id="gallery" className="relative z-10 px-3 py-16 sm:px-6">
      <div className="diary-page">
        <div className="lace-top" />
        <DiaryHeading kicker="page one" title="Our Scrapbook ♡" subtitle="Every picture of you is my favourite picture. Tap any polaroid to see it big." />
        <div className="columns-2 gap-4 sm:columns-3 sm:gap-6 lg:columns-4">
          {photos.map((p, i) => (
            <Polaroid key={p.n} p={p} i={i} onClick={() => setIndex(i)} />
          ))}
        </div>
        <div className="lace-bottom" />
      </div>
      <Lightbox items={photos} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </section>
  )
}
