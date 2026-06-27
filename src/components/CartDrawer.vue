<script setup>
import { ref, watch } from 'vue'
import { money, PAY } from '../data/products.js'
import {
  state,
  cartTotal,
  changeQty,
  removeItem,
  clearCart,
  closeDrawer,
  showToast,
  buildOrder,
  payWithCard,
} from '../store/cart.js'

const view = ref('cart') // 'cart' | 'checkout' | 'done'
const paying = ref(false)
const lastOrder = ref(null)

const form = ref({ name: '', phone: '', email: '', addr: '', notes: '' })

/* whenever the drawer re-opens, start at the cart view */
watch(
  () => state.drawerOpen,
  (open) => {
    if (open) view.value = 'cart'
  }
)

function onOverlayClick() {
  closeDrawer()
}

async function onPayCard() {
  paying.value = true
  const res = await payWithCard(form.value.notes)
  paying.value = false
  if (!res.ok) showToast('Card checkout not connected yet — use WhatsApp / Email below')
}

function onPlaceOrder() {
  if (!form.value.name || !form.value.phone) {
    showToast('Please add your name and phone')
    return
  }
  lastOrder.value = buildOrder(form.value)
  view.value = 'done'
}

function onNewOrder() {
  clearCart()
  view.value = 'cart'
  form.value = { name: '', phone: '', email: '', addr: '', notes: '' }
  closeDrawer()
}
</script>

<template>
  <div class="overlay" :class="{ show: state.drawerOpen }" @click="onOverlayClick"></div>

  <aside class="drawer" :class="{ show: state.drawerOpen }" aria-label="Shopping cart">
    <div class="drawer-head">
      <h3 class="gold">
        {{ view === 'cart' ? 'Your Bag' : view === 'checkout' ? 'Checkout' : 'Order placed' }}
      </h3>
      <button class="close-x" aria-label="Close" @click="closeDrawer">✕</button>
    </div>

    <!-- BODY -->
    <div class="drawer-body">
      <!-- cart -->
      <template v-if="view === 'cart'">
        <div v-if="state.items.length === 0" class="empty">
          <div class="big">🛍</div>
          Your bag is empty.<br />Time to find your glow.
        </div>
        <div v-for="i in state.items" :key="i.key" class="line">
          <div class="l-name">{{ i.name }}<small>{{ i.sub }}</small></div>
          <div class="qty">
            <button aria-label="Decrease" @click="changeQty(i.key, -1)">−</button>
            <span>{{ i.qty }}</span>
            <button aria-label="Increase" @click="changeQty(i.key, 1)">+</button>
          </div>
          <div class="l-price">{{ money(i.price * i.qty) }}</div>
          <button class="l-rm" aria-label="Remove" @click="removeItem(i.key)">🗑</button>
        </div>
      </template>

      <!-- checkout -->
      <template v-else-if="view === 'checkout'">
        <button class="co-back" @click="view = 'cart'">← Back to bag</button>
        <p class="co-hint">
          Paying by card? Just add any flavour notes below, then tap
          <strong>Pay with card</strong> — your address is collected securely at the card step.
          Ordering via WhatsApp or email instead? Fill in your details too.
        </p>
        <div class="field"><label>Full name</label><input v-model="form.name" type="text" placeholder="Your name" /></div>
        <div class="field"><label>Phone</label><input v-model="form.phone" type="tel" placeholder="07…" /></div>
        <div class="field"><label>Email</label><input v-model="form.email" type="email" placeholder="you@email.com" /></div>
        <div class="field"><label>Delivery address</label><textarea v-model="form.addr" placeholder="House, street, city, postcode"></textarea></div>
        <div class="field"><label>Notes (flavour choices for bundles, etc.)</label><textarea v-model="form.notes" placeholder="e.g. Mini Babe = Strawberry Drip + Vanilla Kiss"></textarea></div>
      </template>

      <!-- done -->
      <template v-else>
        <div class="confirm">
          <div class="big">💄✨</div>
          <h3 class="gold">Thank you, {{ (lastOrder.name || 'lovely').split(' ')[0] }}!</h3>
          <div class="ref">Order {{ lastOrder.ref }}</div>
          <p class="muted">
            Tap below to send your order to us. We'll reply to confirm your total of
            <strong>{{ money(lastOrder.total) }}</strong> and how to pay.
          </p>
          <div class="send-opt">
            <a class="send-wa" :href="lastOrder.wa" target="_blank" rel="noopener">💬 Send order on WhatsApp</a>
            <a class="send-mail" :href="lastOrder.mail">📧 Send order by email</a>
          </div>
        </div>
      </template>
    </div>

    <!-- FOOT -->
    <div class="drawer-foot">
      <template v-if="view === 'cart' && state.items.length">
        <div class="tot-row"><span class="lbl">Total</span><span class="amt gold">{{ money(cartTotal) }}</span></div>
        <button class="checkout-btn" @click="view = 'checkout'">Checkout</button>
      </template>

      <template v-else-if="view === 'checkout'">
        <div class="tot-row"><span class="lbl">Order total</span><span class="amt gold">{{ money(cartTotal) }}</span></div>
        <button v-if="PAY.enabled" class="checkout-btn" :disabled="paying" @click="onPayCard">
          {{ paying ? 'Redirecting to secure checkout…' : '🔒 Pay with card' }}
        </button>
        <div v-if="PAY.enabled" class="co-or">— or —</div>
        <button class="checkout-btn alt" @click="onPlaceOrder">Send order via WhatsApp / Email</button>
        <p class="pay-note">
          {{ PAY.enabled
            ? 'Card payments are secured by Stripe. Prefer to message us? Use the option above.'
            : "We'll confirm your order and payment on WhatsApp or email." }}
        </p>
      </template>

      <template v-else-if="view === 'done'">
        <button class="checkout-btn" @click="onNewOrder">Continue shopping</button>
      </template>
    </div>
  </aside>
</template>

<style scoped>
.overlay { position: fixed; inset: 0; background: rgba(94, 74, 32, 0.32); backdrop-filter: blur(2px); z-index: 60; opacity: 0; visibility: hidden; transition: opacity 0.25s; }
.overlay.show { opacity: 1; visibility: visible; }
.drawer { position: fixed; top: 0; right: 0; height: 100%; width: min(420px, 100%); background: var(--cream); z-index: 70; transform: translateX(100%); transition: transform 0.3s ease; display: flex; flex-direction: column; box-shadow: -20px 0 50px -20px rgba(94, 74, 32, 0.5); }
.drawer.show { transform: none; }
.drawer-head { display: flex; align-items: center; justify-content: space-between; padding: 20px 22px; border-bottom: 1px solid rgba(201, 162, 39, 0.25); }
.drawer-head h3 { font-family: 'Parisienne', cursive; font-size: 1.9rem; font-weight: 400; }
.close-x { background: none; border: none; cursor: pointer; font-size: 1.5rem; color: var(--ink-soft); line-height: 1; }
.drawer-body { flex: 1; overflow-y: auto; padding: 16px 22px; }
.empty { text-align: center; color: var(--ink-soft); padding: 50px 10px; font-size: 0.92rem; }
.empty .big { font-size: 2.4rem; margin-bottom: 8px; }
.line { display: flex; gap: 12px; align-items: center; padding: 13px 0; border-bottom: 1px dashed rgba(201, 162, 39, 0.3); }
.l-name { flex: 1; font-size: 0.88rem; font-weight: 600; }
.l-name small { display: block; font-weight: 400; color: var(--ink-soft); font-size: 0.78rem; }
.qty { display: flex; align-items: center; gap: 8px; }
.qty button { width: 26px; height: 26px; border-radius: 50%; border: 1px solid var(--gold); background: var(--cream-soft); cursor: pointer; font-weight: 700; color: var(--gold-deep); }
.qty span { min-width: 18px; text-align: center; font-weight: 600; font-size: 0.9rem; }
.l-price { font-weight: 600; font-size: 0.9rem; min-width: 54px; text-align: right; }
.l-rm { background: none; border: none; color: var(--rose); cursor: pointer; font-size: 1.1rem; }

.drawer-foot { padding: 18px 22px; border-top: 1px solid rgba(201, 162, 39, 0.3); background: var(--cream-soft); }
.tot-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 14px; }
.tot-row .lbl { font-size: 0.76rem; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 600; color: var(--ink-soft); }
.tot-row .amt { font-family: 'Parisienne', cursive; font-size: 2.4rem; }
.checkout-btn { width: 100%; cursor: pointer; border: none; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; font-size: 0.8rem; padding: 15px; border-radius: 999px; color: #fff; background: linear-gradient(120deg, #e58fb3, #e76f9e); box-shadow: 0 12px 24px -12px rgba(231, 111, 158, 0.85); }
.checkout-btn:disabled { opacity: 0.6; cursor: wait; }
.checkout-btn.alt { background: var(--cream-deep); color: var(--gold-deep); border: 1px solid var(--gold); box-shadow: none; }
.co-or { text-align: center; font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-soft); margin: 11px 0; }

.co-back { background: none; border: none; cursor: pointer; color: var(--ink-soft); font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em; margin-bottom: 10px; }
.co-hint { font-size: 0.74rem; color: var(--ink-soft); background: var(--cream-deep); border-radius: 10px; padding: 9px 11px; margin-bottom: 14px; line-height: 1.45; }
.field { margin-bottom: 12px; text-align: left; }
.field label { display: block; font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; color: var(--ink-soft); margin-bottom: 5px; }
.field input, .field textarea { width: 100%; border: 1px solid rgba(201, 162, 39, 0.4); background: #fff; border-radius: 12px; padding: 11px 13px; font-family: inherit; font-size: 0.92rem; color: var(--ink); }
.field textarea { min-height: 90px; resize: vertical; }
.pay-note { font-size: 0.74rem; color: var(--ink-soft); margin-top: 12px; text-align: center; line-height: 1.5; }

.confirm { text-align: center; padding: 30px 6px; }
.confirm .big { font-size: 3rem; }
.confirm h3 { font-family: 'Parisienne', cursive; font-size: 2.2rem; margin: 8px 0; font-weight: 400; }
.confirm .ref { display: inline-block; background: var(--cream-deep); border: 1px dashed var(--gold); border-radius: 10px; padding: 5px 16px; font-weight: 700; letter-spacing: 0.1em; margin: 6px 0 16px; }
.confirm .muted { color: var(--ink-soft); font-size: 0.9rem; }
.send-opt { display: flex; flex-direction: column; gap: 10px; margin-top: 14px; }
.send-opt a { display: flex; align-items: center; justify-content: center; gap: 10px; text-decoration: none; font-weight: 600; letter-spacing: 0.06em; font-size: 0.84rem; padding: 13px; border-radius: 999px; }
.send-wa { background: #25d366; color: #fff; }
.send-mail { background: var(--cream-deep); color: var(--gold-deep); border: 1px solid var(--gold); }
</style>
