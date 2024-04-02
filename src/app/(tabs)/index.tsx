import { Pressable, StyleSheet, Text, View } from 'react-native';

import { router } from 'expo-router';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} />
      <Pressable
        onPress={() => router.push('/(auth)/sign-in')}
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
        <Text>Press me!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
