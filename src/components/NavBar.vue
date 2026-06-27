<script setup>
import { ref } from 'vue'
import { cartCount, openDrawer } from '../store/cart.js'

const menuOpen = ref(false)
const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]
</script>

<template>
  <nav>
    <div class="nav-in">
      <router-link to="/" class="logo" aria-label="Sweet2Slay home" @click="menuOpen = false">
        <svg viewBox="0 0 120 80" aria-hidden="true">
          <defs>
            <linearGradient id="lp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#F4E3A4" />
              <stop offset=".55" stop-color="#D4AF37" />
              <stop offset="1" stop-color="#9C7A14" />
            </linearGradient>
          </defs>
          <path fill="url(#lp)" d="M60 24C50 8 30 4 16 16 4 26 4 30 2 34c14-2 22 2 30 8-10 2-18 8-20 16 10 14 30 22 48 22s38-8 48-22c-2-8-10-14-20-16 8-6 16-10 30-8-2-4-2-8-14-18C104 4 70 8 60 24Z" />
        </svg>
        <span class="lg-name gold">Sweet2Slay</span>
      </router-link>

      <button class="menu-toggle" aria-label="Menu" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">☰</button>

      <div class="nav-links" :class="{ open: menuOpen }">
        <router-link
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          class="link"
          active-class="active"
          @click="menuOpen = false"
        >{{ l.label }}</router-link>
        <button class="cart-btn" aria-label="Open cart" @click="openDrawer">
          🛍 Cart <span class="count">{{ cartCount }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(10px);
  background: rgba(252, 246, 232, 0.82);
  border-bottom: 1px solid rgba(201, 162, 39, 0.25);
}
.nav-in { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 12px 22px; max-width: 1180px; margin: 0 auto; }
.logo { display: flex; align-items: center; gap: 9px; text-decoration: none; }
.logo svg { width: 30px; height: auto; }
.logo .lg-name { font-family: 'Parisienne', cursive; font-size: 1.7rem; }
.nav-links { display: flex; gap: 6px; align-items: center; }
.link { background: none; border: none; cursor: pointer; font-weight: 600; font-size: 0.82rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-soft); padding: 9px 14px; border-radius: 999px; text-decoration: none; transition: color 0.15s, background 0.15s; }
.link:hover { color: var(--ink); }
.link.active { color: var(--pink-accent); background: var(--pink-blush); }
.cart-btn { position: relative; display: flex; align-items: center; gap: 8px; cursor: pointer; border: none; background: linear-gradient(120deg, #e58fb3, #e76f9e); color: #fff; font-weight: 600; font-size: 0.76rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 11px 18px; border-radius: 999px; box-shadow: 0 10px 20px -10px rgba(231, 111, 158, 0.8); }
.cart-btn .count { background: #fff; color: var(--pink-accent); font-weight: 700; border-radius: 999px; min-width: 20px; height: 20px; display: inline-grid; place-items: center; font-size: 0.7rem; padding: 0 5px; }
.menu-toggle { display: none; background: none; border: none; cursor: pointer; font-size: 1.5rem; color: var(--gold-deep); }

@media (max-width: 760px) {
  .menu-toggle { display: block; }
  .nav-links { position: absolute; top: 100%; right: 14px; flex-direction: column; align-items: stretch; background: var(--cream); border: 1px solid rgba(201, 162, 39, 0.3); border-radius: 16px; padding: 10px; gap: 4px; box-shadow: var(--shadow); display: none; min-width: 170px; }
  .nav-links.open { display: flex; }
}
</style>
