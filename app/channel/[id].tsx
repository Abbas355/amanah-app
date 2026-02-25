import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Pressable,
    Image as RNImage,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { DashboardHeader } from '@/components/dashboard-header';
import { ScreenGradient } from '@/components/screen-gradient';
import { FONT_DEFAULT, FONT_SEMIBOLD } from '@/constants/fonts';

const BRAND_BLUE = '#60A5FA';
const PROFILE_IMAGE = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop';
const CARD_IMAGE_1 = 'https://picsum.photos/id/1018/600/600';
const CARD_IMAGE_2 = 'https://picsum.photos/id/1060/600/600';

const PROFILE_TABS = ['Videos', 'Shorts', 'Post', 'Playlists'] as const;
type ProfileTab = (typeof PROFILE_TABS)[number];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const H_PAD = 24;
const CARD_WIDTH = Math.min(300, SCREEN_WIDTH - H_PAD * 2 - 24);
const SHORTS_CARD_WIDTH = (SCREEN_WIDTH - H_PAD * 2 - 16) / 2;

const SHORTS = [
  {
    id: '1',
    title: 'Studying the Deen is not a luxury it is a responsibility',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=600&auto=format&fit=crop',
    likes: '13',
    comments: '3',
    shares: '0',
  },
  {
    id: '2',
    title: 'Daily Dua for peace and guidance',
    image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=600&auto=format&fit=crop',
    likes: '45',
    comments: '12',
    shares: '5',
  },
  {
    id: '3',
    title: 'Beautiful Quran Recitation',
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=600&auto=format&fit=crop',
    likes: '120',
    comments: '8',
    shares: '15',
  },
  {
    id: '4',
    title: 'Visiting the historic Mosque',
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=600&auto=format&fit=crop',
    likes: '89',
    comments: '4',
    shares: '2',
  },
];

export default function ChannelProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [profileTab, setProfileTab] = useState<ProfileTab>('Videos');

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
            <AppText style={styles.backRowLabel}>Personal Profile</AppText>
          </Pressable>
          <View style={styles.section}>
            {/* Cover Card */}
            <View style={styles.coverWrap}>
              <AppText style={styles.coverText}>رمضان كريم</AppText>
            </View>

            {/* User Info Bar: PFP + name + @handle */}
            <View style={styles.userBar}>
              <View style={styles.userAvatarWrap}>
                <Image source={{ uri: PROFILE_IMAGE }} style={styles.userAvatar} contentFit="cover" />
              </View>
              <View style={styles.userInfo}>
                <View style={styles.nameHandleWrap}>
                  <View style={styles.nameRow}>
                    <AppText style={styles.userName}>Erza Bilalli</AppText>
                    <RNImage
                      source={require('@/assets/images/verified.png')}
                      style={styles.verifiedBadge}
                      resizeMode="contain"
                    />
                  </View>
                  <AppText style={styles.userHandle}>@Erzabbb</AppText>
                </View>
              </View>
            </View>

            {/* Followers / Following below PFP and names */}
            <View style={styles.followStatsRow}>
              <AppText style={styles.followStats}>21 Followers | 40 Following</AppText>
            </View>

            <Pressable style={styles.primaryButton}>
              <AppText style={styles.primaryButtonText}>Follow</AppText>
            </Pressable>

            <View style={styles.bioBlock}>
              <AppText style={styles.bioText}>In remembrance of Allah, hearts find peace 🌙🕋</AppText>
              <AppText style={styles.bioMeta}>25.02.1999</AppText>
              <AppText style={styles.bioMeta}>Married</AppText>
              <AppText style={styles.bioMeta}>+383 44 999 211</AppText>
            </View>
          </View>

          {/* Profile Tabs Switcher - horizontally scrollable */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsWrap}
            style={styles.tabsScroll}
          >
            {PROFILE_TABS.map((tab) => (
              <Pressable
                key={tab}
                onPress={() => setProfileTab(tab)}
                style={[styles.tab, profileTab === tab && styles.tabActive]}
              >
                <AppText style={[styles.tabText, profileTab === tab && styles.tabTextActive]}>
                  {tab}
                </AppText>
              </Pressable>
            ))}
          </ScrollView>

          {/* Tab Content */}
          <View style={styles.tabContent}>
            {profileTab === 'Videos' && (
              <View style={styles.videosSection}>
                <AppText style={styles.videosSectionTitle}>Latest Video</AppText>
                
                {/* Latest Video Large Card */}
                <View style={styles.latestVideoCard}>
                   <Image source={{ uri: CARD_IMAGE_1 }} style={styles.latestVideoImage} contentFit="cover" />
                   <View style={styles.latestVideoOverlay}>
                      <Ionicons name="play-circle" size={48} color="rgba(255,255,255,0.9)" />
                   </View>
                   <View style={styles.latestVideoContent}>
                      <AppText style={styles.latestVideoTitle}>Studying the Deen Is not a luxury it is a responsibility</AppText>
                      <AppText style={styles.latestVideoDesc} numberOfLines={3}>
                        It's not something we turn to only in hard times, or when life slows down, or when it feels convenient. It's a lifelong duty upon every believer because without knowledge, faith...
                      </AppText>
                      <View style={styles.videoCardStats}>
                        <View style={styles.statItem}>
                          <AppText style={styles.statNum}>13</AppText>
                          <Ionicons name="heart-outline" size={16} color="#EF4444" />
                        </View>
                        <View style={styles.statItem}>
                          <AppText style={styles.statNum}>3</AppText>
                          <Ionicons name="chatbubble-outline" size={16} color="#9CA3AF" />
                        </View>
                        <View style={styles.statItem}>
                          <AppText style={styles.statNum}>0</AppText>
                          <Ionicons name="repeat" size={16} color="#9CA3AF" />
                        </View>
                      </View>
                      <AppText style={styles.videoCardDate}>| Nov 28, 2025 |</AppText>
                   </View>
                </View>

                <AppText style={[styles.videosSectionTitle, { marginTop: 24 }]}>Videos</AppText>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.videosScroll}
                >
                  <View style={styles.videoCard}>
                    <Image source={{ uri: CARD_IMAGE_1 }} style={styles.videoCardImage} contentFit="cover" />
                    <AppText style={styles.videoCardTitle} numberOfLines={2}>
                      Studying the Deen is not a luxury it is a responsibility
                    </AppText>
                    <AppText style={styles.videoCardDesc} numberOfLines={3}>
                      It's not something we turn to only in hard times, or when life slows down, or when it
                      feels convenient. It's a lifelong duty upon every believer because without knowledge,
                      faith...
                    </AppText>
                    <View style={styles.videoCardStats}>
                      <View style={styles.statItem}>
                        <AppText style={styles.statNum}>13</AppText>
                        <Ionicons name="heart-outline" size={16} color="#EF4444" />
                      </View>
                      <View style={styles.statItem}>
                        <AppText style={styles.statNum}>3</AppText>
                        <Ionicons name="chatbubble-outline" size={16} color="#9CA3AF" />
                      </View>
                      <View style={styles.statItem}>
                        <AppText style={styles.statNum}>0</AppText>
                        <Ionicons name="repeat" size={16} color="#9CA3AF" />
                      </View>
                    </View>
                    <AppText style={styles.videoCardDate}>| Nov 28, 2025 |</AppText>
                  </View>

                  <View style={styles.videoCard}>
                    <Image source={{ uri: CARD_IMAGE_2 }} style={styles.videoCardImage} contentFit="cover" />
                    <AppText style={styles.videoCardTitle} numberOfLines={2}>
                      My beautiful family
                    </AppText>
                    <AppText style={styles.videoCardDesc} numberOfLines={3}>
                      Grateful for every moment we share together. Family is the greatest blessing from
                      Allah.
                    </AppText>
                    <View style={styles.videoCardStats}>
                      <View style={styles.statItem}>
                        <AppText style={styles.statNum}>8</AppText>
                        <Ionicons name="heart-outline" size={16} color="#EF4444" />
                      </View>
                      <View style={styles.statItem}>
                        <AppText style={styles.statNum}>2</AppText>
                        <Ionicons name="chatbubble-outline" size={16} color="#9CA3AF" />
                      </View>
                      <View style={styles.statItem}>
                        <AppText style={styles.statNum}>1</AppText>
                        <Ionicons name="repeat" size={16} color="#9CA3AF" />
                      </View>
                    </View>
                    <AppText style={styles.videoCardDate}>| Nov 28, 2025 |</AppText>
                  </View>
                </ScrollView>
              </View>
            )}

            {profileTab === 'Shorts' && (
              <View style={styles.videosSection}>
                <AppText style={styles.videosSectionTitle}>Short Videos</AppText>
                <View style={styles.shortsGrid}>
                  {SHORTS.map((short) => (
                    <Pressable key={short.id} style={styles.shortsCard}>
                      <Image source={{ uri: short.image }} style={styles.shortsImage} contentFit="cover" />
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
    fontWeight: '400',
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
  tabsScroll: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
    maxHeight: 72,
    marginTop: 16,
  },
  tabsWrap: {
    flexDirection: 'row',
    paddingHorizontal: H_PAD,
    gap: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 24,
    height: 40,
    borderRadius: 999,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: BRAND_BLUE,
    borderRadius: 0,
    paddingHorizontal: 4,
    height: 38,
  },
  tabText: {
    fontSize: 15,
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
  videoCardImage: {
    width: CARD_WIDTH,
    aspectRatio: 1,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
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
    fontFamily: FONT_DEFAULT,
    fontSize: 13,
    fontWeight: '700',
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
  latestVideoImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
  },
  latestVideoOverlay: {
    position: 'absolute',
    top: 12, // Match padding
    left: 12, // Match padding
    right: 12, // Match padding
    height: undefined, // Remove fixed height
    aspectRatio: 16 / 9, // Match image aspect ratio
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
  shortsImage: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
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
});
