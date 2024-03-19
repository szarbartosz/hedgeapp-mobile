# hedgeapp mobile :hedgehog:

## dev quickstart :construction:

```bash
$ bun install
$ bun run ios/android
```

---

## project structure :deciduous_tree:

```bash
.
├── README.md
├── app
│   ├── (tabs)
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── two.tsx
│   ├── +html.tsx
│   ├── +not-found.tsx
│   ├── _layout.tsx
│   └── modal.tsx
├── app.json
├── assets
│   ├── fonts
│   │   └── SpaceMono-Regular.ttf
│   └── images
│       ├── adaptive-icon.png
│       ├── favicon.png
│       ├── icon.png
│       └── splash.png
├── babel.config.js
├── components
│   ├── EditScreenInfo.tsx
│   ├── ExternalLink.tsx
│   ├── StyledText.tsx
│   ├── Themed.tsx
│   ├── useClientOnlyValue.ts
│   ├── useClientOnlyValue.web.ts
│   ├── useColorScheme.ts
│   └── useColorScheme.web.ts
├── constants
│   └── Colors.ts
├── expo-env.d.ts
├── package.json
├── tsconfig.json
└── types
    └── fonts.d.ts
```
