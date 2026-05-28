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
12. One active cat: `A`
13. Two active cats: `A and B`
14. Three+: `A, B and C` (no Oxford comma)

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
3. `/welcome/:userId` required page
4. `/` redirects to `/welcome/ff535484-6880-4653-b06e-89983ecf4ed5`
5. `/welcome/:userId` owns data fetching and rendering.
6. Use React Query for fetching with `retry: false`.
7. Render backend `title` and `message` as source-of-truth content.
8. Format `totalPrice` as GBP in UI (`GBP...`) with `Intl.NumberFormat`.
9. Show free-gift state if `freeGift=true`: show positive badge/message.
10. For `400` and `404`, show the same neutral frontend error message (avoid user-enumeration cues).

## 6) Considered Alternatives (Rejected)

1. SSR/frontend served from Nest: rejected due to extra complexity not required by brief.
2. Zod validation layer: removed to keep scope lean and avoid unnecessary runtime/schema plumbing.

## 7) Acceptance Criteria

1. Backend route exists and returns required shape/logic.
2. Exact canonical sample response matches expected values for `ff535484-6880-4653-b06e-89983ecf4ed5`.
3. `400` for malformed UUID and `404` for missing valid UUID.
4. Price and gift logic correctly handle boundaries (`120` vs `120.01`).
5. Frontend route `/welcome/:userId` fetches and renders API content.
6. `/` redirects to `/welcome/ff535484-6880-4653-b06e-89983ecf4ed5`.
7. Free-gift message render per defined rules.
8. Backend and frontend can be started with documented yarn commands.

## 8) Test Strategy

1. Unit tests for:
2. Cat-name formatting
3. Price calculation (integer cents)
4. Free-gift threshold boundary logic
5. Integration-style API test for `/comms/your-next-delivery/:userId` with canonical sample fixture and full body assertion.
6. Keep existing hello-world spec unless changes make it invalid.
7. Prioritize backend tests; frontend tests are optional.

## 9) Runbook (Required in README)

1. Install deps (backend and frontend).
2. Start backend and frontend via root scripts.
3. Open frontend URL.
4. Verify `/` auto-redirects to the canonical sample welcome page.
5. Confirm API URL and expected route behavior.

## 10) Future Improvements (Out of Scope)

1. Accessibility pass (keyboard, landmarks, contrast, focus states).
2. Stronger frontend test coverage.
3. More robust visual polish/responsive refinement.
4. Broader API contract documentation (OpenAPI/Swagger).
5. Localisation of text to support multiple user languages
