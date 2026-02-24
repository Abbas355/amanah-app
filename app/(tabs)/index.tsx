import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { FONT_SEMIBOLD } from '@/constants/fonts';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Home</AppText>
      <AppText style={styles.subtitle}>Current active section</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 36,
    color: '#1F2937',
    textTransform: 'capitalize',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9CA3AF',
    marginTop: 8,
  },
});
