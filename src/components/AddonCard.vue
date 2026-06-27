<script setup>
import { money } from '../data/products.js'
import { addToCart } from '../store/cart.js'

defineProps({
  addon: { type: Object, required: true },
})
</script>

<template>
  <div class="addon">
    <div class="a-ic">{{ addon.ic }}</div>
    <div class="a-name">{{ addon.name }}</div>
    <div class="a-price">{{ money(addon.price) }}</div>
    <button class="add" @click="addToCart(addon.name, 'Extra', addon.price)">Add</button>
  </div>
</template>

<style scoped>
.addon { background: var(--cream-soft); border: 1px solid rgba(201, 162, 39, 0.26); border-radius: 16px; padding: 16px 12px; text-align: center; box-shadow: var(--shadow); }
.a-ic { font-size: 1.7rem; }
.a-name { font-weight: 600; font-size: 0.8rem; margin: 6px 0 2px; }
.a-price { font-family: 'Parisienne', cursive; font-size: 1.4rem; color: var(--gold-deep); margin-bottom: 8px; }
.add { cursor: pointer; border: 1px solid var(--gold); width: 100%; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; font-size: 0.68rem; padding: 9px; border-radius: 999px; background: var(--cream-deep); color: var(--gold-deep); transition: background 0.15s, color 0.15s, border-color 0.15s; }
.add:hover { background: linear-gradient(120deg, #e58fb3, #e76f9e); color: #fff; border-color: transparent; }
</style>
