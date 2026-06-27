<script setup>
import { onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
import CartDrawer from './components/CartDrawer.vue'
import { state, clearCart, showToast } from './store/cart.js'

/* Handle the return trip from Stripe Checkout. */
onMounted(() => {
  const p = new URLSearchParams(location.search)
  if (p.get('paid') === '1') {
    clearCart()
    setTimeout(() => showToast('Payment received — thank you! 💄✨'), 350)
    history.replaceState({}, '', location.pathname)
  } else if (p.get('canceled') === '1') {
    setTimeout(() => showToast('Payment canceled — your bag is still here'), 350)
    history.replaceState({}, '', location.pathname)
  }
})
</script>

<template>
  <NavBar />

  <router-view v-slot="{ Component }">
    <transition name="page-fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <SiteFooter />
  <CartDrawer />

  <!-- toast -->
  <div class="toast" :class="{ show: state.toast }">{{ state.toast }}</div>
</template>

<style scoped>
.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  z-index: 90;
  background: var(--ink);
  color: #fff;
  padding: 13px 22px;
  border-radius: 999px;
  font-size: 0.84rem;
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.25s, transform 0.25s;
  pointer-events: none;
}
.toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
