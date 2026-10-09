# Vardha Builders — Two Primary Page Structure

The site is now organized around two primary experiences:

1. `/` — Home
   - Brand hero
   - Philosophy
   - Featured project
   - 3D architecture experience
   - Selected work
   - Lifestyle/process
   - Final CTA

2. `/portfolio` — Portfolio
   - Portfolio hero
   - Project filters
   - Project cards
   - Individual project links
   - Site-visit CTA

Supporting pages remain available so existing functionality is not lost:
- `/about`
- `/floor-plans`
- `/gallery`
- `/contact`

Legacy `/projects` URLs redirect to `/portfolio`.

Before deployment, replace the placeholder WhatsApp number in:
- `frontend/src/pages/Contact.tsx`
- `frontend/src/components/common/WhatsAppFloat.tsx`
