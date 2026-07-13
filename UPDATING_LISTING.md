# Updating ThisHome4Sale.com

The website is intentionally built around one editable file: `client/src/content/listing.ts`. That file contains the current publication mode, address, price, event details, property facts, marketing copy, contact-form configuration, map link, and the ordered photo list. The layout and interactions should not need to change when the next home is ready.

## Publication modes

| Desired website state | Setting in `listing.ts` | Result |
| --- | --- | --- |
| A property is actively marketed | `status: "for-sale"` | The full property page, photography, price, open house, location, and contact actions are displayed. |
| The current property has sold and the next one is not ready | `status: "coming-soon"` | The property details and old photos are removed from view. A branded anticipation page with sharing controls is displayed instead. |

To switch modes, edit the `status` value near the top of the file, save the change, and redeploy the same project. The page title, description, social-sharing image, and structured property data respond to this setting automatically.

## Replacing the featured property

Update the address, price, open-house fields, facts, headline, description, highlights, neighborhood, Web3Forms subject, map URL, and offer guidance in `listing.ts`. Upload the new property photos to deployment-safe storage, then replace the URLs in the `images` array. The first image is the hero and social-sharing image, so it should be the strongest exterior photograph. The remaining images appear in the exact order listed.

If there is no open house, set `openHouse.enabled` to `false`. The announcement bar will disappear, while the remainder of the listing stays intact. The large open-house date is controlled by `openHouse.month` and `openHouse.day` in the same listing file.

## Content checks before deployment

| Check | Why it matters |
| --- | --- |
| Confirm price, bedrooms, bathrooms, square footage, and status | These values appear in both visible content and search-engine metadata. |
| Confirm the inquiry form and map link | Submit one test inquiry after adding the Web3Forms key; visit actions should continue to route to Google Maps. |
| Put the best landscape exterior first | The first image is used in the hero, metadata, and link previews. |
| Review offer guidance with the seller | Financing and proof-of-funds language is seller-provided publication content. |
| Run `pnpm check && pnpm build` | This validates TypeScript and creates the production build before Cloudflare Pages receives it. |

The current implementation does not include a database, login, or external content-management service. The only external submission dependency is Web3Forms. This keeps the one-property workflow inexpensive and reduces the number of systems that can fail. A browser-based editor can be added later if listing changes become frequent enough to justify it.
