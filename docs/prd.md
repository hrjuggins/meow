# PRD: KatKin Tech Test (Revised)

## 1) Goals

1. Implement `GET /comms/your-next-delivery/:userId` in the NestJS backend.
2. Return the exact required personalized payload shape and wording pattern from the brief.
3. Build a React frontend with required route `/welcome/:userId` that consumes this API.
4. Keep implementation readable, typed, minimal, and aligned with test constraints.

## 2) Non-Goals

1. No authentication/authorization.
2. No database or persistence-layer changes (use `data.json` only).
3. No SSR-in-Nest approach.
4. No unrelated refactors or infrastructure additions.

## 3) Backend Requirements

1. Add a dedicated `comms` module with `CommsController` and `CommsService`.
2. Route: `GET /comms/your-next-delivery/:userId`.
3. Validate `userId` with Nest `ParseUUIDPipe`.
4. Return `400` for malformed UUID.
5. Return `404` for valid UUID not found.
6. Keep existing root `GET /` hello endpoint unchanged.
7. Load users from `data.json` directly in `CommsService` (no repository abstraction).
8. Enable `resolveJsonModule` in `tsconfig.json` for typed JSON import.
9. Use integer-cents arithmetic for price calculation.
10. Use strict free gift rule: `freeGift = totalPrice > 120`.
11. Cat name grammar:
1. One active cat: `A`
2. Two active cats: `A and B`
3. Three+: `A, B and C` (no Oxford comma)

## 4) API Contract

Response body:

```json
{
  "title": "Your next delivery for <formatted active cat names>",
  "message": "Hey <firstName>! In two days' time, we'll be charging you for your next order for <formatted active cat names>'s fresh food.",
  "totalPrice": 134,
  "freeGift": true
}
```

Price map:

- `A=55.50`, `B=59.50`, `C=62.75`, `D=66.00`, `E=69.00`, `F=71.25`

Important note:

- JSON numbers do not preserve trailing zeros, so `134.00` is represented as numeric `134`.

Canonical verification fixture:

- `ff535484-6880-4653-b06e-89983ecf4ed5` must return:

```json
{
  "title": "Your next delivery for Dorian and Ocie",
  "message": "Hey Kayleigh! In two days' time, we'll be charging you for your next order for Dorian and Ocie's fresh food.",
  "totalPrice": 134,
  "freeGift": true
}
```

## 5) Frontend UX Contract

1. Separate frontend app in `frontend/` using manual minimal Vite setup (no generator packages).
2. Use `react-router-dom` with:
1. `/` launcher page
2. `/welcome/:userId` required page
3. On `/`, provide:
1. "Try sample user" action
2. Manual `userId` input
3. Light UUID client validation before navigation
4. `/welcome/:userId` owns data fetching and rendering.
5. Use React Query for fetching with `retry: false`.
6. Render backend `title` and `message` as source-of-truth content.
7. Format `totalPrice` as GBP in UI (`GBP...`) with `Intl.NumberFormat`.
8. Show free-gift state:
1. If `freeGift=true`: show positive badge/message.
2. If `freeGift=false` and `totalPrice>0`: show `Spend GBPX more for a free gift` where `X = max(0, 120.01 - totalPrice)` formatted as GBP.
9. Use `cataas.com` image URL with simple broken-image fallback handling.
10. For `400` and `404`, show the same neutral frontend error message (avoid user-enumeration cues).

## 6) Technical Decisions

1. Package manager: `yarn` (do not switch project to npm).
2. Add root convenience scripts:
1. `dev:backend`
2. `dev:frontend`
3. `dev` (both, via `concurrently`)
3. Default ports:
1. Backend `3000`
2. Frontend `5173`
4. Backend CORS:
1. Allow `http://localhost:5173` and `http://127.0.0.1:5173` by default
2. Allow env override via `FRONTEND_ORIGINS`
5. Keep Nest default error response payload shape (no custom exception filter).

## 7) Considered Alternatives (Rejected)

1. SSR/frontend served from Nest: rejected due to extra complexity not required by brief.
2. Zod validation layer: removed to keep scope lean and avoid unnecessary runtime/schema plumbing.
3. True random-user homepage flow: rejected to avoid adding extra API surface beyond requirement.

## 8) Acceptance Criteria

1. Backend route exists and returns required shape/logic.
2. Exact canonical sample response matches expected values for `ff535484-6880-4653-b06e-89983ecf4ed5`.
3. `400` for malformed UUID and `404` for missing valid UUID.
4. Price and gift logic correctly handle boundaries (`120` vs `120.01`).
5. Frontend route `/welcome/:userId` fetches and renders API content.
6. `/` launcher page navigates to `/welcome/:userId` via sample action or validated input.
7. Free-gift and spend-more messages render per defined rules.
8. Backend and frontend can be started with documented yarn commands.

## 9) Test Strategy

1. Unit tests for:
1. Cat-name formatting
2. Price calculation (integer cents)
3. Free-gift threshold boundary logic
2. Integration-style API test for `/comms/your-next-delivery/:userId` with canonical sample fixture and full body assertion.
3. Keep existing hello-world spec unless changes make it invalid.
4. Prioritize backend tests; frontend tests are optional.

## 10) Runbook (Required in README)

1. Install deps (backend and frontend).
2. Start backend and frontend via root scripts.
3. Open frontend URL.
4. Use sample user ID for immediate verification.
5. Confirm API URL and expected route behavior.

## 11) Known Deviations From Minimum Brief

1. Added `/` launcher page (brief only requires `/welcome/:userId`).
2. Added explicit spend-more/free-gift UX messaging.
3. Added convenience root dev scripts for reviewer experience.

## 12) Future Improvements (Out of Scope)

1. Accessibility pass (keyboard, landmarks, contrast, focus states).
2. Stronger frontend test coverage.
3. More robust visual polish/responsive refinement.
4. Broader API contract documentation (OpenAPI/Swagger).
