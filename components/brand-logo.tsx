import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

export function BrandLogo({ height = 40 }: { height?: number }) {
  return (
    <View style={[styles.wrap, { height }]}>
      <Image
        source={require('@/assets/images/amanah-logo.png')}
        style={[styles.logo, { height }]}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'center',
  },
  logo: {
    minWidth: 100,
  },
});
