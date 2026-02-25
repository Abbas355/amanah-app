import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

interface ScreenGradientProps {
  style?: ViewStyle;
}

export function ScreenGradient({ style }: ScreenGradientProps) {
  return (
    <LinearGradient
      colors={['rgba(96,165,250,0.35)', 'rgba(96,165,250,0.15)', 'transparent']}
      locations={[0, 0.4, 0.75]}
      style={[styles.gradient, style]}
    />
  );
}

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 580,
    zIndex: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
});
