import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { FONT_SEMIBOLD } from '@/constants/fonts';

export default function ChannelsScreen() {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Channels</AppText>
      <View style={styles.tag}>
        <AppText style={styles.tagText}>Under Development</AppText>
      </View>
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
  tag: {
    backgroundColor: '#FEF2F2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  tagText: {
    fontSize: 12,
    fontFamily: FONT_SEMIBOLD,
    color: '#EF4444',
  },
});
