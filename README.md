# hedgeapp mobile :hedgehog:

Mobile app created to streamline and enhance the inventory processes for individuals and teams managing green areas.

## preview :eye:

| List of investments                                                                               | Investment details                                                                               | Investor details                                                                                  | Office details                                                                                    |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| <img width="200" alt="image" src="assets/462650107_3765312603735855_5423466211216614636_n.jpg" /> | <img width="200" alt="image" src="assets/466729359_548106131393961_8682861411856069245_n.jpg" /> | <img width="200" alt="image" src="assets/462566824_1115766920218576_4647418960574164106_n.jpg" /> | <img width="200" alt="image" src="assets/462570629_1302322244115890_1643044618316419013_n.jpg" /> |

## tech stack :wrench:

![React Native](https://img.shields.io/badge/react_native-%23000000.svg?style=for-the-badge&logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/expo-%23000000.svg?style=for-the-badge&logo=expo&logoColor=white)
![Bun](https://img.shields.io/badge/bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![Tamagui](https://img.shields.io/badge/tamagui-%23000000.svg?style=for-the-badge&logo=tamagui&logoColor=white)

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
