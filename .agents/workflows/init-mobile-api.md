---
description:
---

# Goal

You are operating within Google Antigravity. Your objective is to build the core API connection and Offline-first storage logic for the new React Native (Expo) app (`novel-mobile`), strictly coupling it with the existing Next.js Web backend.

# Context & Constraints

- The backend API is located at `app/api/v1/` and returns a strict JSON format: `{ success, data, error, pagination }`.
- We do not use Cookies for mobile; we MUST use Bearer Tokens for Authorization.
- The mobile app MUST follow the same Domain-Driven Design (DDD) as the web, structuring logic inside `src/features/...`.
- For local storage, we MUST use `react-native-mmkv` instead of `localStorage`. The sync key is `AG_READING_HISTORY`.

# Step-by-Step Execution Plan

**Step 1: Setup & Dependencies**

- Navigate to the `novel-mobile` directory.
- Use your terminal tools to install `axios` and `react-native-mmkv` if they are not already installed.

**Step 2: Create Storage Utility**

- Create the file `src/lib/storage.ts`.
- Initialize `MMKV` and export standard keys for `ACCESS_TOKEN` and `AG_READING_HISTORY`.

**Step 3: Create Core API Client**

- Create `src/lib/api-client.ts`.
- Set up an `axios` instance targeting the `/api/v1` endpoint.
- Add a request interceptor to automatically attach the Bearer Token from MMKV.
- Add a response interceptor to unwrap the `{ success, data, error, pagination }` wrapper. If `success` is false, reject the promise with the `error` payload.

**Step 4: Scaffold Domain APIs (DDD)**

- Create `src/features/auth/api.ts`: Implement `login` (saving token to MMKV) and `logout` (deleting token).
- Create `src/features/history/api.ts`: Implement `saveLocalHistory`, `getLocalHistory`, and `syncToServer` to ensure the Offline-first UX rule is strictly met.
- Create `src/features/story/api.ts`: Implement `getStories` (handling pagination) and `getStoryDetail`.

**Step 5: Review**

- Do not use the `any` keyword. Generate typescript interfaces simulating the Prisma schema types where applicable.
- Confirm that no UI components are fetching data directly, maintaining the Separation of Concerns rule.
