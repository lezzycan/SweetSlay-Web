<script setup>
import { ref, computed } from 'vue'
import { STORE } from '../data/products.js'
import { showToast } from '../store/cart.js'

const c = ref({ name: '', email: '', msg: '' })
const sent = ref(false)
const waHref = computed(() => `https://wa.me/${STORE.whatsapp}`)
const mailHref = computed(() => `mailto:${STORE.email}`)

function send() {
  if (!c.value.name || !c.value.email || !c.value.msg) {
    showToast('Please fill in all fields')
    return
  }
  const body = `From: ${c.value.name} (${c.value.email})\n\n${c.value.msg}`
  window.location.href = `mailto:${STORE.email}?subject=${encodeURIComponent(
    'Message from ' + c.value.name
  )}&body=${encodeURIComponent(body)}`
  sent.value = true
}
</script>

<template>
  <main class="wrap">
    <div class="sec-title"><span class="eyebrow">Questions, orders, or just to say hi</span><h2 class="gold">Contact Us</h2></div>

    <div class="contact-grid">
      <div class="panel">
        <h3>Send a message</h3>
        <div class="field"><label>Your name</label><input v-model="c.name" type="text" placeholder="First name" /></div>
        <div class="field"><label>Email</label><input v-model="c.email" type="email" placeholder="you@email.com" /></div>
        <div class="field"><label>Message</label><textarea v-model="c.msg" placeholder="How can we help?"></textarea></div>
        <button class="btn btn-pink" style="width: 100%" @click="send">Send message</button>
        <p v-if="sent" class="ok-msg">Thanks lovely — your message is ready to send from your email app. 💌</p>
      </div>

      <div class="panel">
        <h3>Reach us</h3>
        <div class="contact-line"><span class="ci">📧</span><div><strong>Email</strong><br /><a :href="mailHref">{{ STORE.email }}</a></div></div>
        <div class="contact-line"><span class="ci">💬</span><div><strong>WhatsApp</strong><br /><a :href="waHref" target="_blank" rel="noopener">Message us to order</a></div></div>
        <div class="contact-line"><span class="ci">📸</span><div><strong>Instagram</strong><br /><a href="https://instagram.com/sweet2slay_" target="_blank" rel="noopener">@SWEET2SLAY_</a></div></div>
        <div class="contact-line"><span class="ci">🎵</span><div><strong>TikTok</strong><br /><a href="https://tiktok.com/@sweet2slay_" target="_blank" rel="noopener">@SWEET2SLAY_</a></div></div>
        <p class="note">Orders are placed in seconds through the cart, then sent straight to us on WhatsApp or email. We'll confirm your total and how to pay.</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; max-width: 920px; margin: 0 auto; }
.panel { background: var(--cream-soft); border: 1px solid rgba(201, 162, 39, 0.26); border-radius: 22px; padding: 30px; box-shadow: var(--shadow); }
.panel h3 { font-family: 'Parisienne', cursive; font-size: 2rem; color: var(--rose); font-weight: 400; margin-bottom: 14px; }
.field { margin-bottom: 14px; text-align: left; }
.field label { display: block; font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; color: var(--ink-soft); margin-bottom: 5px; }
.field input, .field textarea { width: 100%; border: 1px solid rgba(201, 162, 39, 0.4); background: #fff; border-radius: 12px; padding: 11px 13px; font-family: inherit; font-size: 0.92rem; color: var(--ink); }
.field textarea { min-height: 110px; resize: vertical; }
.contact-line { display: flex; align-items: center; gap: 12px; margin: 14px 0; font-size: 0.92rem; }
.ci { width: 40px; height: 40px; border-radius: 50%; background: var(--cream-deep); display: grid; place-items: center; font-size: 1.1rem; flex: 0 0 auto; }
.note { font-size: 0.74rem; color: var(--ink-soft); margin-top: 18px; line-height: 1.5; text-align: left; }
.ok-msg { color: #3f8a4f; font-weight: 600; font-size: 0.86rem; margin-top: 10px; }
@media (max-width: 760px) { .contact-grid { grid-template-columns: 1fr; } }
</style>
