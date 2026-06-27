<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer>
    <p class="closer script">Which flavour are <b>YOU</b> grabbing first?</p>
    <div class="socials">
      <a class="social" href="https://instagram.com/sweet2slay_" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 4.54a5.3 5.3 0 1 0 0 10.6 5.3 5.3 0 0 0 0-10.6Zm0 1.62a3.68 3.68 0 1 1 0 7.36 3.68 3.68 0 0 1 0-7.36Zm5.5-2.98a1.24 1.24 0 1 0 0 2.48 1.24 1.24 0 0 0 0-2.48Z" /></svg>
        @SWEET2SLAY_
      </a>
      <a class="social" href="https://tiktok.com/@sweet2slay_" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.5 2h-2.9v12.2a2.4 2.4 0 1 1-2.4-2.4c.2 0 .4 0 .6.06V8.9a5.4 5.4 0 0 0-.6-.04 5.34 5.34 0 1 0 5.34 5.34V8.3a6.6 6.6 0 0 0 3.86 1.24V6.62a3.77 3.77 0 0 1-3.86-3.78V2Z" /></svg>
        @SWEET2SLAY_
      </a>
    </div>
    <p class="copyright">© {{ year }} Sweet2Slay · Hand poured with love in the UK</p>
  </footer>
</template>

<style scoped>
footer { margin-top: 40px; text-align: center; padding: 46px 22px 56px; border-top: 1px dashed var(--gold-light); }
.closer { font-family: 'Parisienne', cursive; font-size: clamp(2rem, 6vw, 3rem); line-height: 1.1; }
.closer b { font-family: 'Montserrat'; font-weight: 800; color: var(--pink-accent); font-size: 0.6em; }
.socials { display: flex; gap: 32px; justify-content: center; margin-top: 22px; flex-wrap: wrap; }
.social { display: flex; align-items: center; gap: 9px; text-decoration: none; font-weight: 600; letter-spacing: 0.08em; font-size: 0.9rem; }
.social svg { width: 21px; height: 21px; fill: var(--gold-deep); }
.social:hover { color: var(--pink-accent); }
.social:hover svg { fill: var(--pink-accent); }
.copyright { margin-top: 26px; font-size: 0.72rem; color: var(--ink-soft); letter-spacing: 0.04em; }
</style>
