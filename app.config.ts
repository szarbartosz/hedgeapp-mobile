import { ConfigContext, ExpoConfig } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Jeżyk',
  slug: 'hedgeapp',
  ios: {
    bundleIdentifier: 'com.szarbartosz.hedgeapp',
  },
  android: {
    package: 'com.szarbartosz.hedgeapp',
    config: {
      googleMaps: {
        apiKey: process.env.ANDROID_GOOGLE_API_KEY,
      },
    },
  },
});
