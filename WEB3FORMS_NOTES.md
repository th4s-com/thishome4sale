# Web3Forms Integration Notes

Official API documentation confirms browser-side form submissions should `POST` to `https://api.web3forms.com/submit` and include the required `access_key` field. The visitor email field becomes the reply-to address. Web3Forms also supports a hidden `botcheck` field for spam prevention and returns JSON success and error responses for JavaScript submissions.

Web3Forms states that an access key is public and intended for client-side use rather than treated as a secret API key. Optional CAPTCHA and paid domain restrictions are available for additional abuse protection.

Sources:

- https://docs.web3forms.com/getting-started/api-reference
- https://web3forms.com/platforms/javascript-contact-form
- https://docs.web3forms.com/getting-started/faq
