import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Landing from './components/Landing'
import Gallery from './components/Gallery'
import Timeline from './components/Timeline'
import Letter from './components/Letter'
import Reasons from './components/Reasons'
import Cake from './components/Cake'
import Finale from './components/Finale'
import { Ambient, Bow, Heart, Pearls } from './components/Decor'
import { burst, shower } from './confetti'
import { MUSIC_SRC } from './data/content'

const NAV = [
  { id: 'gallery', label: 'Photos', icon: '📸' },
  { id: 'journey', label: 'Us', icon: '🎞️' },
  { id: 'letter', label: 'Letter', icon: '💌' },
  { id: 'reasons', label: 'Reasons', icon: '💗' },
  { id: 'wish', label: 'Wish', icon: '🎂' },
  { id: 'forever', label: 'Forever', icon: '🎀' },
]

function Nav() {
  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="fixed inset-x-0 bottom-3 z-40 mx-auto flex w-max max-w-[calc(100vw-1.5rem)] items-center gap-0.5 rounded-full bg-white/85 px-2 py-1.5 shadow-soft ring-1 ring-blush-200 backdrop-blur-md sm:bottom-auto sm:top-4 sm:gap-1 sm:px-3"
      aria-label="Diary pages"
    >
      {NAV.map((n) => (
        <a
          key={n.id}
          href={`#${n.id}`}
          className="flex min-w-0 flex-col items-center rounded-full px-1.5 py-1 text-cocoa transition hover:bg-blush-100 sm:flex-row sm:gap-1.5 sm:px-3"
        >
          <span className="text-lg sm:text-base">{n.icon}</span>
          <span className="font-sans text-[9.5px] font-medium sm:text-sm">{n.label}</span>
        </a>
      ))}
    </motion.nav>
  )
}

function MusicToggle() {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)
  if (!MUSIC_SRC) return null
  const toggle = () => {
    const a = ref.current
    if (!a) return
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {})
    else {
      a.pause()
      setPlaying(false)
    }
  }
  return (
    <>
      <audio ref={ref} src={MUSIC_SRC} loop preload="none" />
      <button
        onClick={toggle}
        className="fixed right-3 top-3 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-xl shadow-soft ring-1 ring-blush-200 sm:right-5 sm:top-5"
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        {playing ? '⏸' : '🎵'}
      </button>
    </>
  )
}

function Cover() {
  return (
    <section className="relative z-10 flex min-h-[80svh] flex-col items-center justify-center px-6 pb-10 pt-24 text-center">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1 }}>
        <Bow tone="cherry" className="mx-auto h-20 w-24 drop-shadow-lg" />
        <p className="mt-6 font-serif text-xs uppercase tracking-[0.45em] text-blush-600 sm:text-sm">the birthday diary of</p>
        <h1 className="font-script text-7xl text-cherry-600 sm:text-9xl">Suhi</h1>
        <Pearls className="mt-2" count={13} size={9} />
        <p className="mx-auto mt-6 max-w-lg font-serif text-xl italic text-cocoa/85">
          Every page in here was made with love, just for you. Scroll slowly, my girl ♡
        </p>
        <motion.a
          href="#gallery"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="mt-10 inline-flex flex-col items-center font-hand text-xl text-blush-600"
        >
          turn the page
          <Heart className="mt-1 h-5 w-5" fill="#f57aa0" />
        </motion.a>
      </motion.div>
    </section>
  )
}

export default function App() {
  const [opened, setOpened] = useState(false)
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [opened])

  const open = () => {
    burst({ x: 0.5, y: 0.65 })
    setFlash(true)
    setTimeout(() => {
      setOpened(true)
      shower(2200)
    }, 700)
    setTimeout(() => setFlash(false), 1600)
  }

  return (
    <div className="relative min-h-screen">
      <Ambient density={opened ? 0.8 : 1.2} />

      <AnimatePresence mode="wait">
        {!opened ? (
          <Landing key="landing" onOpen={open} />
        ) : (
          <motion.main key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="pb-24 sm:pb-0">
            <Nav />
            <Cover />
            <Gallery />
            <Timeline />
            <Letter />
            <Reasons />
            <Cake />
            <div className="h-10" />
            <Finale />
          </motion.main>
        )}
      </AnimatePresence>

      {/* magical pink flash between landing & diary */}
      <AnimatePresence>
        {flash && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[60] bg-gradient-radial"
            style={{ background: 'radial-gradient(circle at 50% 60%, #ffffff 0%, #ffdbe6 40%, #ff9fbc 100%)' }}
            initial={{ opacity: 0, scale: 0.2, borderRadius: '50%' }}
            animate={{ opacity: 1, scale: 2.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      <MusicToggle />
    </div>
  )
}
