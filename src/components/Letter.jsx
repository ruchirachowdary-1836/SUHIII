import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { letter } from '../data/content'
import { Bow, DiaryHeading, Heart, Pearls } from './Decor'
import { burst } from '../confetti'

function Envelope({ opened, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative mx-auto mt-24 block w-[300px] max-w-full focus:outline-none sm:mt-32 sm:w-[420px]"
      style={{ perspective: 1200 }}
      aria-label="Open the letter"
    >
      <div className="relative aspect-[3/2] w-full">
        {/* back */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blush-300 to-blush-400 shadow-soft" />

        {/* letter peeking out */}
        <motion.div
          className="letter-paper absolute inset-x-5 top-3 bottom-3 rounded-md shadow-md"
          animate={{ y: opened ? '-48%' : '0%' }}
          transition={{ duration: 0.8, delay: opened ? 0.45 : 0, ease: 'easeOut' }}
        >
          <p className="px-6 pt-4 text-left font-hand text-lg text-cherry-600">My Suhiiiiii…</p>
          <Heart className="absolute bottom-3 right-4 h-4 w-4" fill="#f57aa0" />
        </motion.div>

        {/* front pocket */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'linear-gradient(160deg, #ffd1df, #ff9fbc)',
            clipPath: 'polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)',
          }}
        />
        <div
          className="absolute inset-0 rounded-xl opacity-60"
          style={{
            background: 'linear-gradient(20deg, rgba(255,255,255,0.0) 45%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 55%)',
            clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)',
          }}
        />

        {/* flap */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[58%] origin-top"
          style={{ transformStyle: 'preserve-3d', zIndex: opened ? 0 : 3 }}
          animate={{ rotateX: opened ? 180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, #ffc2d4, #f57aa0)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              backfaceVisibility: 'hidden',
              borderRadius: '0.75rem 0.75rem 0 0',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: '#ffdbe6',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              transform: 'rotateX(180deg)',
              backfaceVisibility: 'hidden',
            }}
          />
        </motion.div>

        {/* bow seal */}
        <AnimatePresence>
          {!opened && (
            <motion.div
              className="absolute left-1/2 top-[50%] z-10 -translate-x-1/2 -translate-y-1/2"
              exit={{ scale: 0, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>
                <Bow tone="cherry" className="h-16 w-20 drop-shadow-lg sm:h-20 sm:w-24" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="mt-6 text-center font-hand text-2xl text-cherry-600 transition group-hover:scale-105 sm:text-3xl">
        A little letter for my favourite person 💌
      </p>
      <p className="mt-1 text-center font-serif text-sm italic text-cocoa/60">{opened ? 'tap to read again' : 'tap the bow to open'}</p>
    </button>
  )
}

function LetterModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  const line = {
    hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
    show: (i) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { delay: 0.5 + i * 0.35, duration: 0.8 } }),
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto bg-[#3a1424]/70 px-3 py-10 backdrop-blur-sm sm:py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Birthday letter"
        >
          <motion.article
            initial={{ y: 120, opacity: 0, rotate: -2 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 16 }}
            onClick={(e) => e.stopPropagation()}
            className="letter-paper relative mx-auto max-w-2xl rounded-lg px-6 pb-14 pt-16 shadow-2xl sm:px-16 sm:pt-20"
          >
            <Bow tone="pink" className="absolute -top-8 left-1/2 h-16 w-20 -translate-x-1/2 drop-shadow-lg" />
            <Bow tone="blush" className="absolute -left-4 -top-4 h-10 w-12 -rotate-[25deg]" />
            <Bow tone="blush" className="absolute -right-4 -top-4 h-10 w-12 rotate-[25deg]" />
            <button
              onClick={onClose}
              className="absolute right-3 top-3 rounded-full bg-blush-100 px-3 py-1 font-hand text-base text-cherry-600 transition hover:bg-blush-200"
              aria-label="Close letter"
            >
              close ♡
            </button>

            <motion.p custom={0} variants={line} initial="hidden" animate="show" className="font-script text-4xl leading-tight text-cherry-600 sm:text-5xl">
              {letter.greeting}
            </motion.p>

            {letter.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                custom={i + 1}
                variants={line}
                initial="hidden"
                animate="show"
                className="mt-5 font-hand text-[1.35rem] leading-[40px] text-[#6b2140] sm:text-[1.6rem] sm:leading-[44px]"
              >
                {p}
              </motion.p>
            ))}

            <motion.p
              custom={letter.paragraphs.length + 1}
              variants={line}
              initial="hidden"
              animate="show"
              className="mt-6 font-hand text-[1.45rem] font-bold leading-[40px] text-cherry-600 sm:text-[1.75rem] sm:leading-[44px]"
            >
              {letter.closing} {letter.closingEmoji}
            </motion.p>

            <motion.div custom={letter.paragraphs.length + 2} variants={line} initial="hidden" animate="show" className="mt-10 text-right">
              <p className="font-letter text-3xl text-cocoa/80 sm:text-4xl">with all my love,</p>
              <p className="font-script text-5xl text-cherry-600">yours forever ♡</p>
              <Pearls className="mt-4 justify-end" count={9} size={8} />
            </motion.div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default function Letter() {
  const [opened, setOpened] = useState(false)
  const [reading, setReading] = useState(false)

  const open = () => {
    if (!opened) {
      setOpened(true)
      burst({ x: 0.5, y: 0.5 })
      setTimeout(() => setReading(true), 1300)
    } else setReading(true)
  }

  return (
    <section id="letter" className="relative z-10 px-3 py-16 sm:px-6">
      <div className="diary-page">
        <div className="lace-top" />
        <DiaryHeading kicker="page three" title="A Letter From My Heart" />
        <Envelope opened={opened} onClick={open} />
        <div className="lace-bottom" />
      </div>
      <LetterModal open={reading} onClose={() => setReading(false)} />
    </section>
  )
}
