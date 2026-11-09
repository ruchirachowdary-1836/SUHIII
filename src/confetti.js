import confetti from 'canvas-confetti'

const colors = ['#ffc2d4', '#f57aa0', '#d6214f', '#ffffff', '#ffdbe6', '#e0557f']
let shapes
const getShapes = () => {
  if (!shapes) {
    try {
      shapes = [confetti.shapeFromText({ text: '🎀', scalar: 2 }), confetti.shapeFromText({ text: '💗', scalar: 2 })]
    } catch {
      shapes = []
    }
  }
  return shapes
}

const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export function burst(origin = { x: 0.5, y: 0.6 }) {
  if (reduced()) return
  confetti({ particleCount: 120, spread: 90, startVelocity: 45, origin, colors, scalar: 1.1 })
  const s = getShapes()
  if (s.length) confetti({ particleCount: 24, spread: 110, origin, shapes: s, scalar: 2, startVelocity: 35 })
}

export function shower(duration = 2500) {
  if (reduced()) return
  const end = Date.now() + duration
  const s = getShapes()
  ;(function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors })
    confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors })
    if (s.length && Math.random() < 0.3)
      confetti({ particleCount: 1, spread: 120, origin: { x: Math.random(), y: 0 }, shapes: s, scalar: 2.2, gravity: 0.6 })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
}
