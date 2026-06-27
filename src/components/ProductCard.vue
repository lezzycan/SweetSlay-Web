<script setup>
import { LIP_PRICE, money } from '../data/products.js'
import { addToCart } from '../store/cart.js'

const props = defineProps({
  item: { type: Object, required: true },     // { n, ic }
  collection: { type: String, required: true },
})
</script>

<template>
  <div class="card">
    <div class="femoji">{{ item.ic }}</div>
    <div class="pname">{{ item.n }}</div>
    <div class="price gold">{{ money(LIP_PRICE) }}</div>
    <button class="add" @click="addToCart(item.n, collection, LIP_PRICE)">Add to bag</button>
  </div>
</template>

<style scoped>
.card { background: var(--cream-soft); border: 1px solid rgba(201, 162, 39, 0.26); border-radius: 18px; padding: 18px 14px 16px; text-align: center; display: flex; flex-direction: column; align-items: center; box-shadow: var(--shadow); transition: transform 0.18s; }
.card:hover { transform: translateY(-4px); }
.femoji { font-size: 2rem; height: 54px; display: grid; place-items: center; }
.pname { font-weight: 600; font-size: 0.86rem; min-height: 2.4em; display: flex; align-items: center; }
.price { font-family: 'Parisienne', cursive; font-size: 1.8rem; margin: 2px 0 10px; }
.add { cursor: pointer; border: 1px solid var(--gold); width: 100%; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; font-size: 0.68rem; padding: 10px; border-radius: 999px; background: var(--cream-deep); color: var(--gold-deep); transition: background 0.15s, color 0.15s, border-color 0.15s; }
.add:hover { background: linear-gradient(120deg, #e58fb3, #e76f9e); color: #fff; border-color: transparent; }
</style>
