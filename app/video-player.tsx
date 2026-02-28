import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { FONT_SEMIBOLD } from '@/constants/fonts';

export default function VideoPlayerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ uri: string; title?: string }>();
  const insets = useSafeAreaInsets();
  const videoRef = useRef<Video>(null);

  const uri = params.uri as string;
  const title = (params.title as string) ?? 'Video';

  const handleBack = () => {
    router.back();
  };

  if (!uri) return null;

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri }}
        style={styles.video}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        isLooping={false}
      />
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </Pressable>
        <AppText style={styles.title} numberOfLines={2}>
          {title}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
    width: '100%',
    marginBottom: 24,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
});
