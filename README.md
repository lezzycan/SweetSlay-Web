# Sweet2Slay — Vue store

A small, well-structured Vue 3 (Vite) shop for Sweet2Slay lip oils, with a
cart, checkout, and Stripe card payments.

## Project layout

```
public/images/          your product photos
src/
  data/products.js      ← EDIT prices, flavours, email, WhatsApp here
  store/cart.js         cart logic + checkout/payment helpers
  router/index.js       the 4 pages
  assets/styles.css     colours, fonts, shared styles
  components/           NavBar, ProductCard, BundleCard, AddonCard,
                        CollectionBlock, CartDrawer, SiteFooter
  views/                HomeView, ShopView, AboutView, ContactView
  App.vue / main.js     app shell + startup
netlify/functions/create-checkout.js   secure Stripe step (server side)
netlify.toml            hosting + routing config
```

## Run it on your computer

You need Node.js 18+ installed. Then, in this folder:

```bash
npm install      # one time, downloads the libraries
npm run dev      # starts a local preview, opens a localhost link
```

Edit any file and the preview updates instantly.

## Change prices / flavours / contact details

Everything is in **`src/data/products.js`**:

- `STORE.whatsapp` — your WhatsApp number (digits only, no `+`)
- `STORE.email` — already `sweet2slay@gmail.com`
- `LIP_PRICE` — price of one lip oil
- `BUNDLES` and `ADDONS` — bundle and extras prices

To swap a product photo, drop a new image into `public/images/` and update
the `img` path in that file.

## Put it online + turn on card payments

1. Push this folder to a GitHub repo.
2. On https://netlify.com → **Add new site → Import from Git**, choose the repo.
   The included `netlify.toml` sets the build automatically.
3. Make a free Stripe account, copy your **Secret key** (`sk_test_…`).
4. In Netlify → **Site configuration → Environment variables**, add
   `STRIPE_SECRET_KEY` with that value, then redeploy.
5. Test checkout with card `4242 4242 4242 4242` (any future expiry / CVC).
6. When ready for real money: activate Stripe, swap in your `sk_live_…` key,
   redeploy.

Orders appear in your Stripe Dashboard with the customer's name, email,
phone, delivery address and any flavour notes.

Without Stripe set up, the **WhatsApp / Email** checkout option still works
and sends orders straight to you.

## Build for production manually (optional)

```bash
npm run build    # outputs to /dist
npm run preview  # preview the production build
```
