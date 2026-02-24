import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { FONT_SEMIBOLD } from '@/constants/fonts';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Home</AppText>
      <AppText style={styles.subtitle}>Your feed will appear here.</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  title: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 24,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
  },
});
