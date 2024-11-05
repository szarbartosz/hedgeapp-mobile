# hedgeapp mobile :hedgehog:

## dev quickstart :construction:

```bash
$ bun install
$ bun run ios/android
```

## eas build :truck:

```bash
eas build --platform android --profile development
eas build --platform ios --profile development
```

---

## project structure :deciduous_tree:

```bash
.
├── README.md
├── app.json
├── babel.config.js
├── bun.lockb
├── expo-env.d.ts
├── package.json
├── src
│   ├── api
│   │   ├── auth.service.ts
│   │   └── core.service.ts
│   ├── app
│   │   ├── (auth)
│   │   ├── (tabs)
│   │   ├── +html.tsx
│   │   ├── +not-found.tsx
│   │   ├── _layout.tsx
│   │   └── modal.tsx
│   ├── assets
│   │   ├── fonts
│   │   └── images
│   ├── components
│   ├── constants
│   ├── context
│   ├── models
│   ├── redux
│   ├── types
│   └── utils
├── tsconfig.json
└── types
    └── fonts.d.ts
```
