# MTC - Mobile App Project Structure

> Cập nhật lần cuối: 2026-04-19

## Tech Stack
- **Framework:** React Native 0.81 + Expo SDK 54
- **Router:** expo-router 6
- **State:** Zustand 5, TanStack React Query 5
- **HTTP Client:** Axios
- **Local Storage:** react-native-mmkv (Offline-first)
- **Language:** TypeScript (strict mode)

## Cấu trúc thư mục

```
mtc/
├── app/                        # Expo Router - file-based routing
│   ├── _layout.tsx             # Root Layout (QueryClientProvider, SafeAreaProvider, ThemeProvider)
│   ├── (tabs)/                 # Bottom Tab Navigation group
│   │   ├── _layout.tsx         # Tabs Layout (Khám phá, Tủ truyện)
│   │   ├── index.tsx           # Tab: Khám phá (Home/Explore)
│   │   └── library.tsx         # Tab: Tủ truyện (Offline-first Library)
│   ├── (reader)/               # Reader mode group (immersive, no gesture back)
│   │   ├── _layout.tsx         # Reader Stack Layout (headerShown: false)
│   │   └── [chapterId].tsx     # Dynamic route: đọc chapter theo ID
│   └── story/
│       └── [slug].tsx          # Dynamic route: chi tiết truyện theo slug
├── assets/                     # Tài nguyên tĩnh (ảnh, font...)
├── components/                 # Shared UI components
├── constants/                  # Hằng số (Colors, Sizes...)
├── hooks/                      # Custom React hooks
├── scripts/                    # Build scripts
├── src/
│   ├── lib/                    # Core utilities & configs
│   │   ├── storage.ts          # MMKV storage instance + keys
│   │   └── api-client.ts       # Axios instance + interceptors (Bearer Token, response unwrap)
│   └── features/               # Domain-Driven Design modules
│       ├── auth/
│       │   └── api.ts          # Login (lưu token), Logout (xóa token)
│       ├── story/
│       │   └── api.ts          # getStories (pagination), getStoryDetail (slug)
│       └── history/
│           └── api.ts          # Offline-first: saveLocalHistory, getLocalHistory, syncToServer
├── app.json                    # Expo config
├── package.json
└── tsconfig.json               # Path alias: @/* → ./src/*
```

## Routing Architecture
- **`(tabs)`**: Bottom tab navigation - 2 tab chính (Khám phá & Tủ truyện)
- **`(reader)`**: Giao diện đọc truyện toàn màn hình, `gestureEnabled: false` để tránh swipe back
- **`story/[slug]`**: Chi tiết truyện với header hiển thị, title "Chi tiết truyện"

## Path Alias
- `@/*` → `./src/*` (cấu hình trong `tsconfig.json`)

## API Convention
- Backend trả về format chuẩn: `{ success, data, error, pagination }`
- Mobile dùng **Bearer Token** (không dùng Cookie)
- Token lưu trong MMKV với key `ACCESS_TOKEN`
- Lịch sử đọc offline lưu trong MMKV với key `AG_READING_HISTORY`
