import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
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
import { FONT_SEMIBOLD } from '@/constants/fonts';

const BRAND_BLUE = '#60A5FA';
const PROFILE_IMAGE = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop';
const CARD_IMAGE_1 = 'https://picsum.photos/id/1018/600/600';
const CARD_IMAGE_2 = 'https://picsum.photos/id/1060/600/600';

const PROFILE_TABS = ['HOME', 'MY CHANNEL', 'CHANNEL ANALYTICS'] as const;
type ProfileTab = (typeof PROFILE_TABS)[number];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const H_PAD = 24;
const CARD_WIDTH = Math.min(300, SCREEN_WIDTH - H_PAD * 2 - 24);

function EmptyChannelState() {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyStateCircle}>
        <View style={styles.emptyStateCard}>
          <View style={styles.emptyStateIconWrap}>
            <RNImage
              source={require('@/assets/images/icons/channel.png')}
              style={styles.emptyStateIcon}
            />
          </View>
          <View style={styles.emptyStateBar1} />
          <View style={styles.emptyStateBar2} />
        </View>
      </View>
      <AppText style={styles.emptyStateTitle}>You Haven't Started Your Channel Yet</AppText>
      <AppText style={styles.emptyStateSubtitle}>
        Start your content creator journey by creating your own channel
      </AppText>
      <Pressable style={styles.emptyStateButton}>
        <AppText style={styles.emptyStateButtonText}>Start Your Channel</AppText>
      </Pressable>
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [profileTab, setProfileTab] = useState<ProfileTab>('HOME');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[BRAND_BLUE, 'rgba(96,165,250,0.4)', 'transparent']}
        locations={[0, 0.35, 0.7]}
        style={styles.gradient}
      />
      {/* Header with back */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <AppText style={styles.headerTitleWhite}>My Profile</AppText>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header Section */}
        <View style={styles.section}>
          {/* Cover Image Area */}
          <View style={styles.coverWrap}>
            <AppText style={styles.coverText}>رمضان كريم</AppText>
          </View>

          {/* User Info Bar */}
          <View style={styles.userBar}>
            <View style={styles.userAvatarWrap}>
              <Image source={{ uri: PROFILE_IMAGE }} style={styles.userAvatar} contentFit="cover" />
            </View>
            <View style={styles.userInfo}>
              <View style={styles.nameRow}>
                <AppText style={styles.userName}>Erza Bilalli</AppText>
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark" size={14} color="#fff" />
                </View>
              </View>
              <AppText style={styles.userHandle}>@Erzabbb</AppText>
            </View>
          </View>

          <AppText style={styles.followStats}>21 Followers | 40 Following</AppText>

          <Pressable style={styles.primaryButton}>
            <AppText style={styles.primaryButtonText}>Complete your Profile</AppText>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </Pressable>

          <View style={styles.bioBlock}>
            <AppText style={styles.bioText}>In remembrance of Allah, hearts find peace 🌙🕋</AppText>
            <AppText style={styles.bioMeta}>25.02.1999</AppText>
            <AppText style={styles.bioMeta}>Married</AppText>
            <AppText style={styles.bioMeta}>+383 44 999 211</AppText>
          </View>
        </View>

        {/* HOME tab content - share box & AI bar */}
        {profileTab === 'HOME' && (
          <View style={styles.homeSection}>
            <AppText style={styles.shareTitle}>Feel free to share your thoughts</AppText>

            <View style={styles.shareBox}>
              <View style={styles.shareIconWrap}>
                <AppText style={styles.shareIconEmoji}>🔗</AppText>
              </View>
              <AppText style={styles.shareHint} numberOfLines={1}>
                Insights, reflections, and ideas are welcome
              </AppText>
              <Pressable style={styles.shareMic}>
                <Ionicons name="mic-outline" size={20} color="#9CA3AF" />
              </Pressable>
              <Pressable style={styles.shareSend}>
                <Ionicons name="arrow-up" size={22} color={BRAND_BLUE} />
              </Pressable>
            </View>

            <View style={styles.aiBar}>
              <AppText style={styles.aiBarText} numberOfLines={1}>
                Need inspiration? Let AI help you craft the perfect post
              </AppText>
              <Pressable style={styles.aiBarButton}>
                <Ionicons name="sparkles" size={14} color="#fff" />
                <AppText style={styles.aiBarButtonText}>Generate Ideas</AppText>
                <Ionicons name="chevron-forward" size={14} color="#fff" />
              </Pressable>
            </View>
          </View>
        )}

        {/* Profile Tabs Switcher */}
        <View style={styles.tabsWrap}>
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
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {profileTab === 'HOME' ? (
            <View style={styles.videosSection}>
              <AppText style={styles.videosSectionTitle}>Videos</AppText>
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
          ) : (
            <EmptyChannelState />
          )}
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
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 320,
    zIndex: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(243,244,246,0.8)',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 17,
    color: '#111827',
  },
  headerTitleWhite: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 17,
    color: '#fff',
  },
  headerRight: {
    width: 40,
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
    paddingTop: 16,
  },
  coverWrap: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#F8FAFC',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  coverText: {
    fontSize: 28,
    color: '#9CA3AF',
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
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userName: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 18,
    color: '#111827',
  },
  verifiedBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EAB308',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userHandle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
  },
  followStats: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 15,
    color: '#111827',
    marginBottom: 16,
  },
  primaryButton: {
    height: 56,
    backgroundColor: BRAND_BLUE,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  primaryButtonText: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 16,
    color: '#fff',
  },
  bioBlock: {
    gap: 4,
  },
  bioText: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 4,
  },
  bioMeta: {
    fontSize: 15,
    color: '#9CA3AF',
  },
  homeSection: {
    paddingHorizontal: H_PAD,
    paddingTop: 32,
    paddingBottom: 24,
    gap: 24,
  },
  shareTitle: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 28,
    color: '#111827',
  },
  shareBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 32,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F9FAFB',
    gap: 12,
  },
  shareIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  shareIconEmoji: {
    fontSize: 18,
  },
  shareHint: {
    flex: 1,
    fontSize: 13,
    color: '#9CA3AF',
  },
  shareMic: {
    padding: 8,
  },
  shareSend: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: BRAND_BLUE,
    borderRadius: 999,
    paddingVertical: 4,
    paddingLeft: 24,
    paddingRight: 16,
    gap: 12,
  },
  aiBarText: {
    flex: 1,
    fontSize: 11,
    color: '#fff',
    opacity: 0.9,
  },
  aiBarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  aiBarButtonText: {
    fontSize: 11,
    fontFamily: FONT_SEMIBOLD,
    color: '#fff',
  },
  tabsWrap: {
    flexDirection: 'row',
    paddingHorizontal: H_PAD,
    gap: 12,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
    backgroundColor: '#fff',
  },
  tab: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: '#F1F5F9',
  },
  tabActive: {
    backgroundColor: BRAND_BLUE,
  },
  tabText: {
    fontSize: 11,
    fontFamily: FONT_SEMIBOLD,
    color: '#9CA3AF',
  },
  tabTextActive: {
    color: '#fff',
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
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
  },
  videoCardTitle: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 18,
    color: '#111827',
  },
  videoCardDesc: {
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
    fontSize: 13,
    fontFamily: FONT_SEMIBOLD,
    fontWeight: '700',
    color: '#111827',
  },
  videoCardDate: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: FONT_SEMIBOLD,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyStateCircle: {
    width: 192,
    height: 192,
    borderRadius: 96,
    backgroundColor: '#F1F5F9',
    opacity: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyStateCard: {
    width: 112,
    height: 144,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 6,
  },
  emptyStateIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: BRAND_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emptyStateIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  emptyStateBar1: {
    width: 40,
    height: 6,
    backgroundColor: '#EBF5FF',
    borderRadius: 3,
  },
  emptyStateBar2: {
    width: 24,
    height: 6,
    backgroundColor: '#EBF5FF',
    borderRadius: 3,
  },
  emptyStateTitle: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 20,
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: 280,
  },
  emptyStateButton: {
    width: '100%',
    maxWidth: 280,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: BRAND_BLUE,
    borderRadius: 999,
    alignItems: 'center',
  },
  emptyStateButtonText: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 16,
    color: BRAND_BLUE,
  },
});
