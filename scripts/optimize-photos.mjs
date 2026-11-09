// Usage: npm run photos -- <folder-with-original-photos>
// Writes web-sized JPEGs (full + thumb) into public/photos as suhi-<n>.jpg / suhi-<n>-thumb.jpg
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const src = process.argv[2] || 'raw-photos'
const out = 'public/photos'
fs.mkdirSync(out, { recursive: true })
const files = fs.readdirSync(src)
  .filter((f) => /\.(jpe?g|png|webp|heic)$/i.test(f))
  .sort((a, b) => (parseInt(a.match(/\d+/)?.[0] ?? 0) - parseInt(b.match(/\d+/)?.[0] ?? 0)))

let i = 0
for (const f of files) {
  i++
  const input = path.join(src, f)
  await sharp(input).rotate().resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 72, mozjpeg: true }).toFile(path.join(out, `suhi-${i}.jpg`))
  await sharp(input).rotate().resize({ width: 560, height: 560, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 68, mozjpeg: true }).toFile(path.join(out, `suhi-${i}-thumb.jpg`))
  console.log(`${f} -> suhi-${i}.jpg`)
}
console.log(`Optimised ${i} photos. Update PHOTO_COUNT in src/data/content.js if it changed.`)
