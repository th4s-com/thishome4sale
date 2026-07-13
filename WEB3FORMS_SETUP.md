# Connecting the Seller Inquiry Form

The inquiry form is already designed and wired to the official Web3Forms browser endpoint. Only the access key remains to be added.

Open:

`client/src/content/listing.ts`

Find this field and paste the Web3Forms access key between the quotation marks:

```ts
web3formsAccessKey: "PASTE_KEY_HERE",
```

The form automatically becomes active when this value is not empty. It submits the visitor's name, email, phone, inquiry type, and message to the email connected to that Web3Forms key. Loading, success, and service-error states are included.

The access key is intended by Web3Forms for browser-side use and is not treated as a secret. The form also includes Web3Forms' hidden `botcheck` field. For additional protection, enable CAPTCHA or domain restriction in the Web3Forms account if needed.

After adding the key, run `pnpm check` and `pnpm build`, then submit one real test inquiry from the deployed Cloudflare Pages domain.

