# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with Turbopack
npm run build     # Production build
npm run lint      # ESLint
npm run format    # Prettier (app/**/*.ts only)
```

No test suite exists.

## Environment Variables

Required in `.env.local`:

- `RESEND_API_KEY` — from resend.com, used to send email notifications
- `NOTIFICATION_EMAIL` — destination address for form submissions

## Architecture

This is a Next.js 16 app (App Router, all client components) styled with Tailwind v4. There are no shared component files — each route is a self-contained `page.tsx`.

**User flow:**
1. `/` — intro splash, auto-redirects to `/questions/0` after `loveSite.homeIntro.redirectDelayMs`
2. `/questions/[index]` — steps through `loveSite.story[]` one section at a time; each section shows a literary quote and collects one or more text answers; answers are persisted in `localStorage` via helpers in `love-data.ts`
3. `/girlfriend` — final proposal page; both accept/decline buttons forward the user to `/contact`
4. `/contact` — collects a freeform message via react-hook-form + zod, then POSTs to `/api/submit`
5. `/api/submit` — Route Handler that sends all answers + message as an HTML email via Resend

**Single source of truth for all content:** `app/love-data.ts`

- `loveSite` — typed config object (`LoveSite`) holding user/girl names, intro timing, the full story (7 sections of literary quotes/poems with prompts), and the final proposal text
- `LOVE_STORAGE_KEY`, `loadStoredAnswers`, `saveStoredAnswers`, `clearStoredAnswers` — localStorage helpers used across question and contact pages

To add/edit story sections, modify `loveSite.story[]` in `love-data.ts`. Each section has an `id`, `kind` (`'quote'|'poem'`), `pageTitle`, `quote` (author + text), and `questions[]`. Questions have a `prompt` and optional `exampleAnswer` shown as an italicised author message.
