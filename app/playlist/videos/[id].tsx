import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { DashboardHeader } from '@/components/dashboard-header';
import { FONT_DEFAULT, FONT_SEMIBOLD } from '@/constants/fonts';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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

const PLAYLIST_VIDEOS = [
  {
    id: '1',
    title: 'Studying the Deen is not a luxury it is a responsibility',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=600&auto=format&fit=crop',
    date: 'Nov 28, 2025',
  },
  {
    id: '2',
    title: 'Studying the Deen is not a luxury it is a responsibility',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=600&auto=format&fit=crop',
    date: 'Nov 28, 2025',
  },
  {
    id: '3',
    title: 'Studying the Deen is not a luxury it is a responsibility',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=600&auto=format&fit=crop',
    date: 'Nov 28, 2025',
  },
  {
    id: '4',
    title: 'Studying the Deen is not a luxury it is a responsibility',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=600&auto=format&fit=crop',
    date: 'Nov 28, 2025',
  },
];

const COMMENT = {
  id: '1',
  user: {
    name: 'Adam Al-Sharif',
    initials: 'AA',
  },
  text: "Real peace doesn't come from having control over life it comes from trusting.",
};

export default function PlaylistVideosScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <DashboardHeader />
      
      <ScrollView 
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Image Section */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: PLAYLIST_DETAIL.image }} 
            style={styles.image} 
            contentFit="cover"
          />
        </View>

        {/* Playlist Videos List */}
        <View style={styles.videosList}>
          {PLAYLIST_VIDEOS.map((video) => (
            <View key={video.id} style={styles.videoItem}>
              <Image source={{ uri: video.image }} style={styles.videoThumb} contentFit="cover" />
              <View style={styles.videoInfo}>
                <AppText style={styles.videoTitle} numberOfLines={3}>
                  {video.title}
                </AppText>
                <AppText style={styles.videoDate}>| {video.date} |</AppText>
              </View>
            </View>
          ))}
        </View>

        {/* Comments Section */}
        <View style={styles.commentSection}>
          <View style={styles.commentRow}>
            <View style={styles.avatarWrap}>
              <AppText style={styles.avatarText}>{COMMENT.user.initials}</AppText>
            </View>
            <View style={styles.commentContent}>
              <AppText style={styles.commentUser}>{COMMENT.user.name}</AppText>
              <AppText style={styles.commentText}>{COMMENT.text}</AppText>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginTop: 12,
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  videosList: {
    paddingHorizontal: 24,
    gap: 20,
    marginBottom: 32,
  },
  videoItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  videoThumb: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  videoInfo: {
    flex: 1,
    gap: 4,
  },
  videoTitle: {
    fontFamily: FONT_DEFAULT,
    fontSize: 16,
    color: '#111827',
    lineHeight: 22,
  },
  videoDate: {
    fontFamily: FONT_DEFAULT,
    fontSize: 12,
    color: '#6B7280',
  },
  commentSection: {
    paddingHorizontal: 24,
    marginTop: 8,
    marginBottom: 24,
  },
  commentRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  avatarWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 14,
    color: '#6B7280',
  },
  commentContent: {
    flex: 1,
    gap: 4,
  },
  commentUser: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 14,
    color: '#111827',
  },
  commentText: {
    fontFamily: FONT_DEFAULT,
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 20,
  },
});
