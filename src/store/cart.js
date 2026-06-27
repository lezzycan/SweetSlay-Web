import { reactive, computed } from 'vue'
import { STORE, PAY, money } from '../data/products.js'

/* A small shared cart store (no extra libraries needed).
   Any component can import { cart, addToCart, ... } and stay in sync. */

const state = reactive({
  items: [],          // { key, name, sub, price, qty }
  drawerOpen: false,
  toast: '',
})

let toastTimer
function showToast(msg) {
  state.toast = msg
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (state.toast = ''), 1800)
}

function addToCart(name, sub, price) {
  const key = name + '|' + sub
  const found = state.items.find((i) => i.key === key)
  if (found) found.qty++
  else state.items.push({ key, name, sub, price: Number(price), qty: 1 })
  showToast(name + ' added to your bag')
}

function changeQty(key, delta) {
  const i = state.items.find((x) => x.key === key)
  if (!i) return
  i.qty += delta
  if (i.qty <= 0) state.items = state.items.filter((x) => x.key !== key)
}

function removeItem(key) {
  state.items = state.items.filter((x) => x.key !== key)
}

function clearCart() {
  state.items = []
}

const cartCount = computed(() => state.items.reduce((s, i) => s + i.qty, 0))
const cartTotal = computed(() => state.items.reduce((s, i) => s + i.price * i.qty, 0))

function openDrawer() {
  state.drawerOpen = true
}
function closeDrawer() {
  state.drawerOpen = false
}

/* Build the order text used by the WhatsApp / email fallback. */
function buildOrder({ name, phone, email, addr, notes }) {
  const ref = 'S2S-' + Date.now().toString().slice(-6)
  const total = cartTotal.value
  const lines = state.items
    .map((i) => `• ${i.qty} x ${i.name} (${i.sub}) — ${money(i.price * i.qty)}`)
    .join('\n')
  const msg =
    `New Sweet2Slay order ${ref}\n` +
    `------------------------------\n${lines}\n` +
    `------------------------------\nTOTAL: ${money(total)}\n\n` +
    `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n` +
    `Address: ${addr}\nNotes: ${notes || '—'}`
  return {
    ref,
    total,
    name,
    wa: `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`,
    mail: `mailto:${STORE.email}?subject=${encodeURIComponent(
      'Sweet2Slay order ' + ref
    )}&body=${encodeURIComponent(msg)}`,
  }
}

/* Card payment: ask the serverless function for a Stripe Checkout URL. */
async function payWithCard(notes = '') {
  if (!state.items.length) return { ok: false }
  const res = await fetch(PAY.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: state.items.map((i) => ({
        name: i.name,
        sub: i.sub,
        price: i.price,
        qty: i.qty,
      })),
      notes,
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (res.ok && data.url) {
    window.location.href = data.url
    return { ok: true }
  }
  return { ok: false, error: data.error || 'Checkout unavailable' }
}

export {
  state,
  cartCount,
  cartTotal,
  addToCart,
  changeQty,
  removeItem,
  clearCart,
  openDrawer,
  closeDrawer,
  showToast,
  buildOrder,
  payWithCard,
}
