# Deploying ThisHome4Sale.com to Cloudflare Pages

## Recommended Git-based deployment

Put this project in a GitHub repository, then create a new Pages project in Cloudflare and connect that repository. Cloudflare will rebuild the website automatically whenever the repository changes.

Use these build settings:

| Setting | Value |
| --- | --- |
| Framework preset | None, or Vite if Cloudflare offers it |
| Production branch | `main` |
| Build command | `pnpm build` |
| Build output directory | `dist/public` |
| Root directory | Leave blank |
| Node.js version | 22 |

No runtime environment variables, database, API keys, or server functions are required. The `_redirects` and `_headers` files are already included for Cloudflare Pages routing and browser-security defaults.

## Connect thishome4sale.com

After the first successful Pages deployment, open the project in Cloudflare and select **Custom domains**. Add `thishome4sale.com`, then add `www.thishome4sale.com` if you want both forms to work. Because the domain already uses Cloudflare, the required DNS records can normally be created from this screen.

Choose one canonical address and redirect the other to it. The current website metadata uses `https://thishome4sale.com` as the canonical URL.

## Updating the featured house

All normal listing edits are made in:

`client/src/content/listing.ts`

Follow `UPDATING_LISTING.md` when changing a house. To show the active listing, use:

```ts
status: "for-sale"
```

When the property sells and the next renovation is not ready, use:

```ts
status: "coming-soon"
```

Commit and push the change. Cloudflare Pages will rebuild the site and publish the new state automatically.

## Replacing photographs

The current property photographs use stable hosted asset URLs. For a future house, upload the new photographs to permanent web storage, replace the `images` array in `client/src/content/listing.ts`, and update the first image to the strongest hero photograph. Do not place a large photo set directly inside the project repository.

## Pre-launch check

Before pointing the domain at the new Pages deployment, verify the price, address, open-house date, square footage, Zillow URL, school references, and offer language. The project has already passed TypeScript and production-build validation with `dist/public` confirmed as the deployable output.

