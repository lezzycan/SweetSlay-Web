/* =====================================================================
   Contact Details & Product Data
   ===================================================================== */

/* --- your shop details --- */
export const STORE = {
  whatsapp: '+447835411110',         
  email: 'sweet2slay@gmail.com',     
  currency: '£',
}

/* --- card payments (Stripe) --- */
export const PAY = {
  enabled: true,                              // set false to hide "Pay with card"
  endpoint: '/.netlify/functions/create-checkout',
}

/* --- price of a single lip oil --- */
export const LIP_PRICE = 5.0

/* --- collections of lip oils ---
   img matches a file in /public/images/ */
export const COLLECTIONS = [
  {
    name: 'Nude & Sweet',
    kind: 'Collection',
    cls: 'c-nude',
    img: '/images/nude.png',
    items: [
      { n: 'Vanilla Kiss', ic: '🤍' },
      { n: 'Caramel Drip', ic: '🍯' },
      { n: 'Honey Glaze', ic: '🐝' },
      { n: 'Sugar Cookie', ic: '🍪' },
      { n: 'Creamy Coconut', ic: '🥥' },
    ],
  },
  {
    name: 'Fruity Princess',
    kind: 'Collection',
    cls: 'c-fruity',
    img: '/images/fruity.png',
    items: [
      { n: 'Strawberry Drip', ic: '🍓' },
      { n: 'Cherry Babe', ic: '🍒' },
      { n: 'Watermelon Sugar', ic: '🍉' },
      { n: 'Pink Raspberry', ic: '🌸' },
      { n: 'Peach Please', ic: '🍑' },
      { n: 'Berry Bliss', ic: '🫐' },
      { n: 'Mango Magic', ic: '🥭' },
    ],
  },
  {
    name: 'Sweet Girl',
    kind: 'Collection',
    cls: 'c-sweet',
    img: '/images/sweet.png',
    items: [
      { n: 'Candy Floss Cutie', ic: '🍬' },
      { n: 'Bubblegum Babe', ic: '🩷' },
      { n: 'Pink Lemonade', ic: '🍋' },
      { n: 'Cotton Candy Dreams', ic: '☁️' },
      { n: 'Sweet Sherbet', ic: '🍦' },
    ],
  },
  {
    name: 'Luxury / Baddie',
    kind: 'Vibes',
    cls: 'c-lux',
    img: '/images/lux.png',
    items: [
      { n: 'Golden Glow', ic: '✨' },
      { n: 'Princess Gloss', ic: '👑' },
      { n: 'Rich Girl Drip', ic: '💎' },
      { n: 'Boss Babe', ic: '💄' },
      { n: 'Slay All Day', ic: '💖' },
      { n: 'Gloss Goals', ic: '💫' },
    ],
  },
]

/* --- bundles --- */
export const BUNDLES = [
  {
    id: 'b-mini',
    name: 'Mini Babe',
    label: 'Bundle',
    img: '/images/bundle-mini.png',
    desc: '2 Lip Oils. The perfect taster duo to find your signature shine.',
    price: 8,
  },
  {
    id: 'b-princess',
    name: 'Princess',
    label: 'Bundle',
    img: '/images/bundle-princess.png',
    desc: '4 Lip Oils + a Lip Scrub. Prep, polish and glow — the full ritual.',
    price: 15,
    featured: true,
  },
  {
    id: 'b-ultimate',
    name: 'Ultimate Slay',
    label: 'Bundle',
    img: '/images/bundle-ultimate.png',
    desc: 'Lip Oils + Mirror + Beauty Bag. Everything you need, packed and ready.',
    price: 25,
  },
]

/* --- extras / add-ons --- */
export const ADDONS = [
  { id: 'a-scrub', name: 'Lip Scrubs', ic: '🧴', price: 6 },
  { id: 'a-mask', name: 'Lip Masks', ic: '💋', price: 5 },
  { id: 'a-liner', name: 'Lip Liners', ic: '✏️', price: 4 },
  { id: 'a-key', name: 'Keychains', ic: '🔑', price: 3 },
  { id: 'a-mirror', name: 'Mirrors', ic: '🪞', price: 4 },
  { id: 'a-bag', name: 'Beauty Bags', ic: '👜', price: 7 },
  { id: 'a-gift', name: 'Gift Bundles', ic: '🎁', price: 12 },
  { id: 'a-charm', name: 'Gloss Charms', ic: '💝', price: 3 },
  { id: 'a-body', name: 'Body Oils', ic: '🧖', price: 8 },
  { id: 'a-cuticle', name: 'Cuticle Oil Pens', ic: '🖊️', price: 5 },
]

export const money = (n) => STORE.currency + Number(n).toFixed(2)
