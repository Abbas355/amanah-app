import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { DashboardHeader } from '@/components/dashboard-header';
import { FONT_DEFAULT, FONT_SEMIBOLD } from '@/constants/fonts';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Dummy data for the playlist detail view
const PLAYLIST_DETAIL = {
  id: '1',
  title: 'Studying the Deen is not a luxury it is a responsibility',
  image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=600&auto=format&fit=crop',
  date: 'Nov 28, 2025',
  likes: '13',
  comments: '3',
  shares: '0',
};

export default function PlaylistDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <DashboardHeader />
      
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: PLAYLIST_DETAIL.image }} 
            style={styles.image} 
            contentFit="cover"
          />
          
          {/* Gradient Overlay for text readability */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
            style={styles.gradient}
          />

          {/* Back Button */}
          <Pressable 
            style={[styles.backButton, { top: 20 }]} 
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </Pressable>

          {/* Bottom Content */}
          <View style={[styles.bottomContent, { paddingBottom: insets.bottom + 24 }]}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <AppText style={styles.statText}>{PLAYLIST_DETAIL.likes}</AppText>
                <Ionicons name="heart-outline" size={20} color="#EF4444" />
              </View>
              <Pressable 
                style={styles.statItem}
                onPress={() => router.push(`/playlist/videos/${id}` as any)}
              >
                <AppText style={styles.statText}>{PLAYLIST_DETAIL.comments}</AppText>
                <Ionicons name="chatbubble-outline" size={20} color="#fff" />
              </Pressable>
              <View style={styles.statItem}>
                <AppText style={styles.statText}>{PLAYLIST_DETAIL.shares}</AppText>
                <Ionicons name="repeat" size={20} color="#fff" />
              </View>
            </View>

            <AppText style={styles.title}>{PLAYLIST_DETAIL.title}</AppText>
            <AppText style={styles.date}>| {PLAYLIST_DETAIL.date} |</AppText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff', // Fallback
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    marginTop: 12, // Add some spacing from header
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  bottomContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    gap: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 4,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 16,
    color: '#fff',
  },
  title: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 20,
    color: '#fff',
    lineHeight: 28,
  },
  date: {
    fontFamily: FONT_DEFAULT,
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
});
