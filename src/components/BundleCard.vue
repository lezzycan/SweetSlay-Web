<script setup>
import { money } from '../data/products.js'
import { addToCart } from '../store/cart.js'

defineProps({
  bundle: { type: Object, required: true },
})
</script>

<template>
  <article class="bundle" :class="{ featured: bundle.featured }">
    <span v-if="bundle.featured" class="tag">Most Loved</span>
    <div class="bphoto"><img :src="bundle.img" :alt="bundle.name + ' ' + bundle.label" /></div>
    <div class="bname gold">{{ bundle.name }}</div>
    <div class="blabel">{{ bundle.label }}</div>
    <p class="desc">{{ bundle.desc }}</p>
    <div class="price">{{ money(bundle.price) }}</div>
    <button class="add" @click="addToCart(bundle.name + ' ' + bundle.label, bundle.desc, bundle.price)">
      Add to bag
    </button>
  </article>
</template>

<style scoped>
.bundle { position: relative; border-radius: 24px; padding: 22px 26px 26px; text-align: center; overflow: hidden; background: linear-gradient(180deg, var(--cream-soft), #fffdf8); border: 1px solid rgba(201, 162, 39, 0.3); box-shadow: var(--shadow); }
.bundle.featured { border-color: var(--pink-accent); background: linear-gradient(180deg, #fff3f8, #fffcf6); }
.tag { position: absolute; top: 16px; right: -34px; transform: rotate(38deg); background: var(--pink-accent); color: #fff; font-size: 0.6rem; letter-spacing: 0.2em; font-weight: 700; padding: 5px 42px; text-transform: uppercase; z-index: 2; }
.bphoto { height: 150px; display: grid; place-items: center; margin-bottom: 6px; }
.bphoto img { max-width: 100%; max-height: 150px; object-fit: contain; mix-blend-mode: multiply; }
.bname { font-family: 'Parisienne', cursive; font-size: 2.4rem; line-height: 0.95; }
.blabel { font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; font-size: 0.82rem; margin-top: 2px; }
.desc { font-size: 0.9rem; color: var(--ink-soft); margin: 11px 0 16px; min-height: 42px; }
.price { display: inline-block; color: var(--gold-deep); font-family: 'Parisienne', cursive; font-size: 3rem; line-height: 1; padding: 2px 28px; border-radius: 999px; background: var(--cream-deep); border: 1.5px dashed var(--gold); }
.add { margin-top: 16px; cursor: pointer; width: 100%; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; font-size: 0.68rem; padding: 13px; border-radius: 999px; background: linear-gradient(120deg, #e58fb3, #e76f9e); color: #fff; border: none; transition: transform 0.15s; }
.add:hover { transform: translateY(-2px); }
</style>
