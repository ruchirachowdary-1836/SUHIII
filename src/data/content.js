// Everything personal lives here, so it's easy to edit later. 🎀

// Photos live in public/photos as suhi-<n>.jpg (+ suhi-<n>-thumb.jpg).
// To swap pictures: drop originals in a folder and run `npm run photos -- <folder>`.
export const PHOTO_COUNT = 30

const base = import.meta.env.BASE_URL

export const photo = (n) => ({
  n,
  src: `${base}photos/suhi-${n}.jpg`,
  thumb: `${base}photos/suhi-${n}-thumb.jpg`,
})

// Optional extras. Set to null to hide them.
export const VIDEO_SRC = `${base}suhi.mp4`
export const MUSIC_SRC = null // e.g. `${base}music.mp3` — the play/pause button only shows when this is set

const captions = [
  'kitty cuddles with my girl 🐾',
  'white dress, main character',
  'main character, take two ✨',
  'chandelier queen ✨',
  'flowers for the prettiest',
  'that soft smile ♡',
  'roses & shopping dates',
  'glowing, as always',
  'on top of the world 🌄',
  'sunset by the lake',
  'garden fairy 🌸',
  'bouquet season',
  'my favourite face 🥹',
  'golden hour girl',
  'pink bouquet, pinker heart',
  'sunlit & stunning',
  'night-out giggles',
  'pure chaos, pure joy 😜',
  'smile like that forever',
  'pretty in pink',
  'lost in the flowers',
  'meadow princess 🌼',
  'pink dress, pink dreams',
  'kitty & her favourite human',
  'us, as cartoons 🎀',
  'us, always',
  'my sister, my safe place',
  'best day ever',
  'laughing till it hurts',
  'forever us 💗'
]

export const photos = Array.from({ length: PHOTO_COUNT }, (_, i) => ({
  ...photo(i + 1),
  caption: captions[i % captions.length],
}))

export const timeline = [
  {
    year: 'Chapter one',
    title: 'Where it all began',
    text: 'Two girls, one hello — and somehow the universe already knew this was going to be forever.',
    photos: [25, 26],
  },
  {
    year: 'Chapter two',
    title: 'The little moments',
    text: 'Shared snacks, silly selfies and tiny plans that turned into memories I replay all the time.',
    photos: [1, 24],
  },
  {
    year: 'Chapter three',
    title: 'Laughter, endlessly',
    text: 'The kind of laughing where we can’t breathe, can’t stop, and can’t even remember what was funny.',
    photos: [18, 17],
  },
  {
    year: 'Chapter four',
    title: 'Random conversations',
    text: 'Deep talks, dumb talks, 2 a.m. talks — you were always the person I wanted to tell everything to.',
    photos: [14, 16],
  },
  {
    year: 'Chapter five',
    title: 'Endless love',
    text: 'Through busy days and quiet ones, the love never changed. It only grew softer and stronger.',
    photos: [5, 23],
  },
  {
    year: 'Almost five years',
    title: 'From friends to sisters',
    text: 'Somewhere along the way you stopped being just my friend. You became my sister, in every way that matters.',
    photos: [27, 29],
  },
]

export const reasons = [
  { title: 'Your understanding heart', note: 'You get me even when I can’t find the words.', icon: '💗' },
  { title: 'Your sweetest soul', note: 'Pure, kind and gentle — the rarest kind of person.', icon: '🎀' },
  { title: 'The way you make people feel loved', note: 'Everyone feels a little more special around you.', icon: '💌' },
  { title: 'Your beautiful smile', note: 'It could honestly light up an entire city.', icon: '🌸' },
  { title: 'The comfort of having you around', note: 'You feel like home on my hardest days.', icon: '🫂' },
  { title: 'Being my sister in every way that matters', note: 'Not by blood, but by heart — forever.', icon: '👭' },
]

export const letter = {
  greeting: 'Happiesttt Birthday to my Suhiiiiii, my girl, my sweetest soul, my forever sister! 🎀❤️🥹',
  paragraphs: [
    'I honestly feel so lucky to have you in my life. Almost five years of friendship, and you’ve become so much more than just a friend to me. You’re a sister, a safe place, a person who understands me in ways I can’t explain, and someone I’ll always hold close to my heart. You have one of the purest hearts, and I hope life gives you all the happiness, love and beautiful things you genuinely deserve.',
    'I know we haven’t been meeting much lately, and I’m sorry that I’ve been caught up with exams, studies and trainings. I know you might be hurt, and I completely understand. But please never think that being busy means I’ve forgotten about you or that you’ve become any less important to me. I miss you more than I probably express. I miss our talks, our random nonsense, our laughs and all those little moments that make our friendship special. I really hope we get to meet soon and make up for all the time we’ve missed.',
    'On your special day, I just want to remind you how loved and appreciated you are. Never change that beautiful heart of yours. Keep smiling, keep shining, keep achieving everything you’ve ever dreamed of, and never settle for anything less than the happiness you deserve. I wish you endless blessings, good health, success, peace and a lifetime of reasons to smile.',
    'Thank you for being YOU, Suhi. Thank you for understanding me, being patient with me and being the sweetest sister I could ask for. No matter how busy life gets or how many years pass, you’ll always have your own special place in my heart.',
    'I really, really love you, my girllll! Here’s to more birthdays, more memories, more crazy conversations and a friendship that lasts forever.',
  ],
  closing: 'Happiest Birthday once again, my Suhiiii! I love you to the moon and back. Forever my girl, forever my sister!',
  closingEmoji: '🫂💗🎂',
}
