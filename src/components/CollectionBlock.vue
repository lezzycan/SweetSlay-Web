<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  collection: { type: Object, required: true },
})
</script>

<template>
  <div class="col-block">
    <div class="ch">
      <div class="name">{{ collection.name }}</div>
      <div class="kind">{{ collection.kind }}</div>
    </div>
    <img class="col-photo" :src="collection.img" :alt="collection.name + ' lip oil'" />
    <div class="grid">
      <ProductCard
        v-for="it in collection.items"
        :key="it.n"
        :item="it"
        :collection="collection.name"
      />
    </div>
  </div>
</template>

<style scoped>
.col-block { margin-bottom: 46px; }
.ch { text-align: center; margin-bottom: 14px; }
.ch .name { font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; font-size: 1.05rem; }
.ch .kind { font-family: 'Parisienne', cursive; font-size: 1.6rem; color: var(--rose); }
.col-photo { display: block; margin: 0 auto 22px; max-width: 340px; width: 100%; border-radius: 18px; background: var(--cream-soft); border: 1px solid rgba(201, 162, 39, 0.22); box-shadow: var(--shadow); mix-blend-mode: multiply; }
.grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
@media (max-width: 980px) { .grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 520px) { .grid { grid-template-columns: repeat(2, 1fr); } }
</style>
