<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <main class="wrap">
    <div class="sec-title"><span class="eyebrow">Hi, we're so glad you're here</span><h2 class="gold">Our Story</h2></div>

    <div class="prose">
      <p>Sweet2Slay started with one simple craving: a lip oil that feels as good as it looks. Glossy without the stick, nourishing without the grease, and a scent that makes you do a double take.</p>
      <p>Every shade is hand poured in small batches and blended to hydrate, soften and shine, so your lips feel cared for long after the gloss fades. From the softest nude to the boldest baddie, there's a flavour for every mood you're in.</p>
      <p>We're a small, women run brand built on good vibes and great glow. When you shop with us, you're supporting a tiny team that pours real love into every single order.</p>
    </div>

    <div class="values">
      <div class="value"><div class="v-ic">🌿</div><h3>Kind formulas</h3><p>Hydrating, non sticky blends made to nourish your lips, not just coat them.</p></div>
      <div class="value"><div class="v-ic">🤍</div><h3>Hand poured</h3><p>Small batch and made with care, so every bottle gets our full attention.</p></div>
      <div class="value"><div class="v-ic">💌</div><h3>Real people</h3><p>Message us any time. There's a real person on the other end who loves a chat.</p></div>
    </div>

    <div style="text-align: center; margin-top: 34px">
      <button class="btn btn-pink" @click="router.push('/shop')">Find your flavour</button>
    </div>
  </main>
</template>

<style scoped>
.prose { max-width: 680px; margin: 0 auto; text-align: center; }
.prose p { margin: 16px 0; color: var(--ink-soft); }
.values { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 34px; }
.value { background: var(--cream-soft); border: 1px solid rgba(201, 162, 39, 0.26); border-radius: 18px; padding: 26px 20px; text-align: center; box-shadow: var(--shadow); }
.v-ic { font-size: 1.8rem; }
.value h3 { font-family: 'Parisienne', cursive; font-size: 1.7rem; color: var(--rose); margin: 6px 0; font-weight: 400; }
.value p { font-size: 0.86rem; color: var(--ink-soft); }
@media (max-width: 760px) { .values { grid-template-columns: 1fr; } }
</style>
