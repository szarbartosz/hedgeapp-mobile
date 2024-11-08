# hedgeapp mobile :hedgehog:

## tech stack :wrench:

![React Native](https://img.shields.io/badge/react_native-%23000000.svg?style=for-the-badge&logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/expo-%23000000.svg?style=for-the-badge&logo=expo&logoColor=white)
![Bun](https://img.shields.io/badge/bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![Nativewind](https://img.shields.io/badge/nativewind-%23000000.svg?style=for-the-badge&logo=tamagui&logoColor=white)

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
├── eas.json
├── expo-env.d.ts
├── package.json
├── src
│   ├── api
│   ├── app
│   │   ├── (auth)
│   │   ├── (tabs)
│   │   ├── investments
│   │   ├── investors
│   │   ├── modal.tsx
│   │   └── offices
│   ├── assets
│   │   ├── fonts
│   │   ├── icons
│   │   └── images
│   ├── components
│   ├── constants
│   ├── context
│   ├── models
│   ├── redux
│   ├── types
│   └── utils
└── tsconfig.json
```
