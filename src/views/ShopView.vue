<script setup>
import { COLLECTIONS, BUNDLES, ADDONS } from '../data/products.js'
import CollectionBlock from '../components/CollectionBlock.vue'
import BundleCard from '../components/BundleCard.vue'
import AddonCard from '../components/AddonCard.vue'
</script>

<template>
  <main class="wrap">
    <div class="sec-title"><span class="eyebrow">Every flavour, ready to glow</span><h2 class="gold">Shop Lip Oils</h2></div>
    <CollectionBlock v-for="c in COLLECTIONS" :key="c.name" :collection="c" />

    <div class="sec-title"><span class="eyebrow">Better together</span><h2 class="gold">Bundles</h2></div>
    <div class="bundles">
      <BundleCard v-for="b in BUNDLES" :key="b.id" :bundle="b" />
    </div>

    <div class="sec-title"><span class="eyebrow">Add more magic to your routine</span><h2 class="gold">Extras</h2></div>
    <div class="addons">
      <AddonCard v-for="a in ADDONS" :key="a.id" :addon="a" />
    </div>
  </main>
</template>

<style scoped>
.bundles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-bottom: 14px; }
.addons { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
@media (max-width: 980px) { .addons { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 760px) { .bundles { grid-template-columns: 1fr; max-width: 460px; margin: 0 auto 14px; } }
@media (max-width: 520px) { .addons { grid-template-columns: repeat(2, 1fr); } }
</style>
