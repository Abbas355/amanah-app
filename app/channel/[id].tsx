import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
    Dimensions,
    Pressable,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { ChannelDetailsCard } from '@/components/channel-details-card';
import { DashboardHeader } from '@/components/dashboard-header';
import { ScreenGradient } from '@/components/screen-gradient';
import { FONT_BOLD, FONT_DEFAULT, FONT_SEMIBOLD } from '@/constants/fonts';
import { SHORTS, VIDEOS } from '@/constants/videos';
import type { ChannelDetails } from '@/types/channel';
import { MOCK_CHANNEL_WITH_DATA } from '@/types/channel';

const BRAND_BLUE = '#60A5FA';

/** Mock channel map for demo - keyed by id. Replace with API fetch later. */
const CHANNEL_MAP: Record<string, ChannelDetails> = {
  '1': MOCK_CHANNEL_WITH_DATA,
  '2': { ...MOCK_CHANNEL_WITH_DATA, id: '2', name: 'Twinies', handle: 'twinies1', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&fit=crop', banner: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&fit=crop', subscribers: 890, totalViews: 12000, videoCount: 12 },
  '3': { ...MOCK_CHANNEL_WITH_DATA, id: '3', banner: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&fit=crop', subscribers: 2500, totalViews: 78000, videoCount: 38 },
  '4': { ...MOCK_CHANNEL_WITH_DATA, id: '4', name: 'Twinies', handle: 'twinies1', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&fit=crop', banner: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1200&fit=crop', subscribers: 420, totalViews: 8000, videoCount: 8 },
  '5': { ...MOCK_CHANNEL_WITH_DATA, id: '5', banner: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&fit=crop', subscribers: 3200, totalViews: 95000, videoCount: 62 },
  '6': { ...MOCK_CHANNEL_WITH_DATA, id: '6', name: 'Twinies', handle: 'twinies1', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&fit=crop', banner: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&fit=crop', subscribers: 150, totalViews: 3000, videoCount: 3 },
};
const PROFILE_IMAGE = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop';

const PROFILE_TABS = ['Videos', 'Shorts', 'Post', 'Playlists'] as const;
type ProfileTab = (typeof PROFILE_TABS)[number];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const H_PAD = 24;
const CARD_WIDTH = Math.min(300, SCREEN_WIDTH - H_PAD * 2 - 24);
const SHORTS_CARD_WIDTH = (SCREEN_WIDTH - H_PAD * 2 - 16) / 2;


const POSTS = [
  {
    id: '1',
    title: 'Studying the Deen is not a luxury it is a responsibility',
    content: "It's not something we turn to only in hard times, or when life slows down, or when it feels convenient. It's a lifelong duty upon every believer because without knowledge, faith becomes fragile.",
    likes: '13',
    comments: '3',
    shares: '0',
    date: 'Nov 28, 2025',
  },
  {
    id: '2',
    title: 'The importance of patience (Sabr)',
    content: "Patience is not just about waiting, it's about how we behave while we wait. Allah is with those who are patient.",
    likes: '45',
    comments: '12',
    shares: '5',
    date: 'Nov 25, 2025',
  },
  {
    id: '3',
    title: 'Community Iftar Planning',
    content: "We are planning a community Iftar for next week. Everyone is welcome to join and contribute. Let's make this a memorable gathering.",
    likes: '28',
    comments: '8',
    shares: '2',
    date: 'Nov 20, 2025',
  },
  {
    id: '4',
    title: 'Reflection on Surah Al-Kahf',
    content: "Reading Surah Al-Kahf on Fridays is a light between two Fridays. Let's remind each other to read it today.",
    likes: '150',
    comments: '24',
    shares: '30',
    date: 'Nov 15, 2025',
  },
];

const PLAYLISTS = [
  {
    id: '1',
    title: 'Studying the Deen is not a luxury it is a responsibility',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=600&auto=format&fit=crop',
    date: 'Nov 28, 2025',
  },
  {
    id: '2',
    title: 'Studying the Deen is not a luxury it is a responsibility',
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=600&auto=format&fit=crop',
    date: 'Nov 28, 2025',
  },
  {
    id: '3',
    title: 'Studying the Deen is not a luxury it is a responsibility',
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=600&auto=format&fit=crop',
    date: 'Nov 28, 2025',
  },
  {
    id: '4',
    title: 'Studying the Deen is not a luxury it is a responsibility',
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=600&auto=format&fit=crop',
    date: 'Nov 28, 2025',
  },
];

export default function ChannelProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [profileTab, setProfileTab] = useState<ProfileTab>('Videos');

  const channel = useMemo(
    () => (params.id ? CHANNEL_MAP[params.id] ?? MOCK_CHANNEL_WITH_DATA : MOCK_CHANNEL_WITH_DATA),
    [params.id]
  );

  return (
    <View style={styles.container}>
      <DashboardHeader />

      <View style={styles.contentWrap}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ScreenGradient />
          <Pressable onPress={() => router.back()} style={styles.backRow}>
            <Ionicons name="chevron-back" size={20} color="#111827" />
            <AppText style={styles.backRowLabel}>Channel</AppText>
          </Pressable>

          <View style={styles.section}>
            {/* Banner (from backend) */}
            <View style={styles.coverWrap}>
              {channel.banner ? (
                <Image source={{ uri: channel.banner }} style={StyleSheet.absoluteFill} contentFit="cover" />
              ) : (
                <AppText style={styles.coverText}>رمضان كريم</AppText>
              )}
            </View>

            {/* Channel details from backend (avatar, name, handle, description, subscribers, totalViews, videoCount) - same layout as My Channel */}
            <ChannelDetailsCard channel={channel} showAvatar />

            <Pressable style={styles.primaryButton}>
              <AppText style={styles.primaryButtonText}>Follow</AppText>
            </Pressable>
          </View>

          {/* Profile Tabs Switcher - fixed width */}
          <View style={styles.tabsContainer}>
            <View style={styles.tabsWrap}>
              {PROFILE_TABS.map((tab) => (
                <Pressable
                  key={tab}
                  onPress={() => setProfileTab(tab)}
                  style={[styles.tab, profileTab === tab && styles.tabActive]}
                >
                  <AppText 
                    style={[styles.tabText, profileTab === tab && styles.tabTextActive]}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    {tab}
                  </AppText>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Tab Content */}
          <View style={styles.tabContent}>
            {profileTab === 'Videos' && (
              <View style={styles.videosSection}>
                <AppText style={styles.videosSectionTitle}>Latest Video</AppText>
                
                {/* Latest Video Large Card */}
                <Pressable
                  style={styles.latestVideoCard}
                  onPress={() => router.push({ pathname: '/video-player' as any, params: { uri: VIDEOS[0].videoUri, title: VIDEOS[0].title } })}
                >
                  <View style={styles.latestVideoImageWrap}>
                    <Image source={{ uri: VIDEOS[0].image }} style={styles.latestVideoImage} contentFit="cover" />
                    <View style={styles.latestVideoOverlay}>
                      <Ionicons name="play-circle" size={48} color="rgba(255,255,255,0.9)" />
                    </View>
                  </View>
                  <View style={styles.latestVideoContent}>
                    <AppText style={styles.latestVideoTitle}>{VIDEOS[0].title}</AppText>
                    <AppText style={styles.latestVideoDesc} numberOfLines={3}>
                      It's not something we turn to only in hard times, or when life slows down...
                    </AppText>
                    <View style={styles.videoCardStats}>
                      <View style={styles.statItem}>
                        <AppText style={styles.statNum}>{VIDEOS[0].likes}</AppText>
                        <Ionicons name="heart-outline" size={16} color="#EF4444" />
                      </View>
                      <View style={styles.statItem}>
                        <AppText style={styles.statNum}>{VIDEOS[0].comments}</AppText>
                        <Ionicons name="chatbubble-outline" size={16} color="#9CA3AF" />
                      </View>
                      <View style={styles.statItem}>
                        <AppText style={styles.statNum}>{VIDEOS[0].shares}</AppText>
                        <Ionicons name="repeat" size={16} color="#9CA3AF" />
                      </View>
                    </View>
                    <AppText style={styles.videoCardDate}>| {VIDEOS[0].date} |</AppText>
                  </View>
                </Pressable>

                <AppText style={[styles.videosSectionTitle, { marginTop: 24 }]}>Videos</AppText>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.videosScroll}
                >
                  {VIDEOS.map((video) => (
                    <Pressable
                      key={video.id}
                      style={styles.videoCard}
                      onPress={() => router.push({ pathname: '/video-player' as any, params: { uri: video.videoUri, title: video.title } })}
                    >
                      <View style={styles.videoCardImageWrap}>
                        <Image source={{ uri: video.image }} style={styles.videoCardImage} contentFit="cover" />
                        <View style={styles.videoCardPlayBadge}>
                          <Ionicons name="play-circle" size={40} color="rgba(255,255,255,0.95)" />
                        </View>
                      </View>
                      <AppText style={styles.videoCardTitle} numberOfLines={2}>{video.title}</AppText>
                      <AppText style={styles.videoCardDesc} numberOfLines={3}>
                        It's not something we turn to only in hard times, or when life slows down...
                      </AppText>
                      <View style={styles.videoCardStats}>
                        <View style={styles.statItem}>
                          <AppText style={styles.statNum}>{video.likes}</AppText>
                          <Ionicons name="heart-outline" size={16} color="#EF4444" />
                        </View>
                        <View style={styles.statItem}>
                          <AppText style={styles.statNum}>{video.comments}</AppText>
                          <Ionicons name="chatbubble-outline" size={16} color="#9CA3AF" />
                        </View>
                        <View style={styles.statItem}>
                          <AppText style={styles.statNum}>{video.shares}</AppText>
                          <Ionicons name="repeat" size={16} color="#9CA3AF" />
                        </View>
                      </View>
                      <AppText style={styles.videoCardDate}>| {video.date} |</AppText>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}

            {profileTab === 'Shorts' && (
              <View style={styles.videosSection}>
                <AppText style={styles.videosSectionTitle}>Short Videos</AppText>
                <View style={styles.shortsGrid}>
                  {SHORTS.map((short) => (
                    <Pressable
                      key={short.id}
                      style={styles.shortsCard}
                      onPress={() => router.push({ pathname: '/video-player' as any, params: { uri: short.videoUri, title: short.title } })}
                    >
                      <View style={styles.shortsImageWrap}>
                        <Image 
                          source={{ uri: short.image }} 
                          style={styles.shortsImage} 
                          contentFit="cover"
                          transition={200}
                        />
                        <View style={styles.shortsPlayBadge}>
                          <Ionicons name="play-circle" size={36} color="rgba(255,255,255,0.95)" />
                        </View>
                      </View>
                      <View style={styles.shortsContent}>
                        <AppText style={styles.shortsTitle} numberOfLines={3}>
                          {short.title}
                        </AppText>
                        <View style={styles.shortsStats}>
                          <View style={styles.statItem}>
                            <AppText style={styles.statNum}>{short.likes}</AppText>
                            <Ionicons name="heart-outline" size={14} color="#EF4444" />
                          </View>
                          <View style={styles.statItem}>
                            <AppText style={styles.statNum}>{short.comments}</AppText>
                            <Ionicons name="chatbubble-outline" size={14} color="#9CA3AF" />
                          </View>
                          <View style={styles.statItem}>
                            <AppText style={styles.statNum}>{short.shares}</AppText>
                            <Ionicons name="repeat" size={14} color="#9CA3AF" />
                          </View>
                        </View>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}

            {profileTab === 'Post' && (
              <View style={styles.videosSection}>
                <AppText style={styles.videosSectionTitle}>Posts</AppText>
                <View style={styles.postsList}>
                  {POSTS.map((post) => (
                    <View key={post.id} style={styles.postCard}>
                      <AppText style={styles.postTitle}>{post.title}</AppText>
                      <AppText style={styles.postContent} numberOfLines={4}>
                        {post.content}
                      </AppText>
                      <View style={styles.postStats}>
                        <View style={styles.statItem}>
                          <AppText style={styles.statNum}>{post.likes}</AppText>
                          <Ionicons name="heart-outline" size={16} color="#EF4444" />
                        </View>
                        <View style={styles.statItem}>
                          <AppText style={styles.statNum}>{post.comments}</AppText>
                          <Ionicons name="chatbubble-outline" size={16} color="#9CA3AF" />
                        </View>
                        <View style={styles.statItem}>
                          <AppText style={styles.statNum}>{post.shares}</AppText>
                          <Ionicons name="repeat" size={16} color="#9CA3AF" />
                        </View>
                      </View>
                      <AppText style={styles.postDate}>| {post.date} |</AppText>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {profileTab === 'Playlists' && (
              <View style={styles.videosSection}>
                <AppText style={styles.videosSectionTitle}>Playlists</AppText>
                <View style={styles.shortsGrid}>
                  {PLAYLISTS.map((playlist) => (
                    <Pressable
                      key={playlist.id}
                      style={styles.playlistCard}
                      onPress={() => router.push(`/playlist/${playlist.id}` as any)}
                    >
                      <Image source={{ uri: playlist.image }} style={styles.playlistImage} contentFit="cover" />
                      <View style={styles.playlistContent}>
                        <AppText style={styles.playlistTitle} numberOfLines={2}>
                          {playlist.title}
                        </AppText>
                        <AppText style={styles.playlistDate}>| {playlist.date} |</AppText>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentWrap: {
    flex: 1,
    position: 'relative',
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 20,
    marginBottom: 16,
    paddingHorizontal: H_PAD,
    alignSelf: 'flex-start',
  },
  backRowLabel: {
    fontFamily: FONT_DEFAULT,
    fontSize: 15,
    color: '#111827',
  },
  scroll: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    paddingHorizontal: H_PAD,
  },
  coverWrap: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#374151', // Darker placeholder for cover
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  coverText: {
    fontFamily: FONT_DEFAULT,
    fontSize: 28,
    color: '#fff',
    opacity: 0.8,
  },
  userBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  userAvatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#F3F4F6',
  },
  userAvatar: {
    width: '100%',
    height: '100%',
  },
  userInfo: {
    flex: 1,
  },
  nameHandleWrap: {
    height: 56,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userName: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 18,
    color: '#111827',
  },
  verifiedBadge: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  userHandle: {
    fontFamily: FONT_DEFAULT,
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: -2,
  },
  followStatsRow: {
    marginTop: 8,
    marginBottom: 16,
  },
  followStats: {
    fontFamily: FONT_DEFAULT,
    fontSize: 16,
    color: '#111827',
  },
  primaryButton: {
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: BRAND_BLUE,
  },
  primaryButtonText: {
    fontFamily: FONT_DEFAULT,
    fontSize: 15,
    color: BRAND_BLUE,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  bioBlock: {
    gap: 4,
  },
  bioText: {
    fontFamily: FONT_DEFAULT,
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 4,
  },
  bioMeta: {
    fontFamily: FONT_DEFAULT,
    fontSize: 15,
    color: '#6B7280',
  },
  tabsContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
    marginTop: 16,
  },
  tabsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: BRAND_BLUE,
  },
  tabText: {
    fontSize: 14,
    fontFamily: FONT_DEFAULT,
    color: '#9CA3AF',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  tabTextActive: {
    fontFamily: FONT_SEMIBOLD,
    color: '#111827',
  },
  tabContent: {
    paddingHorizontal: H_PAD,
    paddingTop: 24,
  },
  videosSection: {
    paddingBottom: 24,
  },
  videosSectionTitle: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  videosScroll: {
    gap: 24,
    paddingBottom: 8,
  },
  videoCard: {
    width: CARD_WIDTH,
    gap: 12,
  },
  videoCardImageWrap: {
    width: CARD_WIDTH,
    aspectRatio: 1,
    borderRadius: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  videoCardImage: {
    width: '100%',
    height: '100%',
  },
  videoCardPlayBadge: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoCardTitle: {
    fontFamily: FONT_DEFAULT,
    fontSize: 18,
    color: '#111827',
  },
  videoCardDesc: {
    fontFamily: FONT_DEFAULT,
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
    includeFontPadding: false,
  },
  videoCardStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statNum: {
    fontFamily: FONT_BOLD,
    fontSize: 13,
    color: '#111827',
  },
  videoCardDate: {
    fontFamily: FONT_DEFAULT,
    fontSize: 12,
    color: '#9CA3AF',
  },
  latestVideoCard: {
    width: '100%',
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    gap: 12,
  },
  latestVideoImageWrap: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  latestVideoImage: {
    width: '100%',
    height: '100%',
  },
  latestVideoOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  latestVideoContent: {
    gap: 8,
  },
  latestVideoTitle: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 18,
    color: '#111827',
    marginTop: 4,
  },
  latestVideoDesc: {
    fontFamily: FONT_DEFAULT,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
  shortsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  shortsCard: {
    width: SHORTS_CARD_WIDTH,
    gap: 8,
  },
  shortsImageWrap: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  shortsImage: {
    width: '100%',
    height: '100%',
  },
  shortsPlayBadge: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortsContent: {
    gap: 8,
  },
  shortsTitle: {
    fontFamily: FONT_DEFAULT,
    fontSize: 14,
    color: '#111827',
    lineHeight: 20,
  },
  shortsStats: {
    flexDirection: 'row',
    gap: 12,
  },
  postsList: {
    gap: 16,
  },
  postCard: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  postTitle: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 16,
    color: '#111827',
    lineHeight: 24,
  },
  postContent: {
    fontFamily: FONT_DEFAULT,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    includeFontPadding: false,
  },
  postStats: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 4,
  },
  postDate: {
    fontFamily: FONT_DEFAULT,
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    includeFontPadding: false,
  },
  playlistCard: {
    width: SHORTS_CARD_WIDTH,
    gap: 8,
  },
  playlistImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  playlistContent: {
    gap: 4,
  },
  playlistTitle: {
    fontFamily: FONT_DEFAULT,
    fontSize: 14,
    color: '#111827',
    lineHeight: 20,
  },
  playlistDate: {
    fontFamily: FONT_DEFAULT,
    fontSize: 12,
    color: '#9CA3AF',
  },
});
