<script setup>
import { useRouter } from 'vue-router'
import { COLLECTIONS, BUNDLES, LIP_PRICE, money } from '../data/products.js'
import BundleCard from '../components/BundleCard.vue'

const router = useRouter()
const go = (p) => router.push(p)
</script>

<template>
  <main>
    <section class="hero">
      <svg class="lips" viewBox="0 0 120 80" aria-label="Sweet2Slay">
        <defs>
          <linearGradient id="lph" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#F4E3A4" />
            <stop offset=".55" stop-color="#D4AF37" />
            <stop offset="1" stop-color="#9C7A14" />
          </linearGradient>
        </defs>
        <path fill="url(#lph)" d="M60 24C50 8 30 4 16 16 4 26 4 30 2 34c14-2 22 2 30 8-10 2-18 8-20 16 10 14 30 22 48 22s38-8 48-22c-2-8-10-14-20-16 8-6 16-10 30-8-2-4-2-8-14-18C104 4 70 8 60 24Z" />
      </svg>
      <h1 class="script gold">Sweet2Slay</h1>
      <div class="sub gold">Lip Oil</div>
      <div class="rule"><span class="gold">Lip Oils Collection</span></div>
      <p class="tagline">Glossy. Hydrating. Smells unreal.</p>
      <div class="cta-row">
        <button class="btn btn-pink" @click="go('/shop')">Shop the collection</button>
        <button class="btn btn-gold" @click="go('/about')">Our story</button>
      </div>
    </section>

    <section class="wrap">
      <div class="sec-title"><span class="eyebrow">Four moods, one glow</span><h2 class="gold">The Collections</h2></div>
      <div class="teasers">
        <div v-for="c in COLLECTIONS" :key="c.name" class="teaser" :class="c.cls">
          <img class="teaser-img" :src="c.img" :alt="c.name" />
          <div class="tname">{{ c.name }}</div>
          <div class="tkind">{{ c.kind }}</div>
          <div class="tcount">{{ c.items.length }} flavours · from {{ money(LIP_PRICE) }}</div>
        </div>
      </div>
      <div style="text-align: center; margin-top: 26px">
        <button class="btn btn-pink" @click="go('/shop')">See every flavour</button>
      </div>
    </section>

    <section class="wrap">
      <div class="sec-title"><span class="eyebrow">Save more, slay more</span><h2 class="gold">Bundles</h2></div>
      <div class="bundles">
        <BundleCard v-for="b in BUNDLES" :key="b.id" :bundle="b" />
      </div>
    </section>
  </main>
</template>

<style scoped>
.hero { text-align: center; padding: 60px 22px 30px; }
.lips { width: 74px; margin: 0 auto 4px; display: block; filter: drop-shadow(0 6px 10px rgba(176, 134, 15, 0.35)); }
h1 { font-size: clamp(3.4rem, 9vw, 5.6rem); display: inline-block; }
.sub { font-size: 0.95rem; letter-spacing: 0.6em; text-transform: uppercase; font-weight: 600; color: var(--gold-deep); padding-left: 0.6em; }
.rule { display: flex; align-items: center; justify-content: center; gap: 14px; margin: 24px auto 4px; max-width: 520px; }
.rule::before, .rule::after { content: ''; height: 1px; flex: 1; background: linear-gradient(90deg, transparent, var(--gold-light), transparent); }
.rule span { font-size: clamp(1.1rem, 3.2vw, 1.6rem); letter-spacing: 0.32em; font-weight: 700; text-transform: uppercase; white-space: nowrap; }
.tagline { font-family: 'Parisienne', cursive; color: var(--rose); font-size: clamp(1.7rem, 5vw, 2.5rem); margin-top: 4px; }
.cta-row { margin-top: 24px; display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

.teasers { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
.teaser { border-radius: 20px; padding: 14px 16px 22px; text-align: center; color: var(--ink); box-shadow: var(--shadow); border: 1px solid rgba(201, 162, 39, 0.25); }
.teaser-img { width: 100%; height: 150px; object-fit: contain; display: block; margin-bottom: 8px; mix-blend-mode: multiply; }
.tname { font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.95rem; }
.tkind { font-family: 'Parisienne', cursive; font-size: 1.4rem; color: var(--rose); }
.tcount { display: inline-block; margin-top: 10px; font-size: 0.74rem; font-weight: 600; letter-spacing: 0.08em; color: var(--ink-soft); }

.bundles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }

@media (max-width: 980px) { .teasers { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 760px) { .bundles { grid-template-columns: 1fr; max-width: 460px; margin: 0 auto; } }
@media (max-width: 520px) { .teasers { grid-template-columns: 1fr; max-width: 360px; margin: 0 auto; } .rule span { letter-spacing: 0.16em; } }
</style>
