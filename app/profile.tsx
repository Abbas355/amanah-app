import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
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
import { CreateChannelSheet } from '@/components/create-channel-sheet';
import { DashboardHeader } from '@/components/dashboard-header';
import { ScreenGradient } from '@/components/screen-gradient';
import { FONT_DEFAULT, FONT_SEMIBOLD } from '@/constants/fonts';

const BRAND_BLUE = '#60A5FA';
const PROFILE_IMAGE = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop';
const CARD_IMAGE_1 = 'https://picsum.photos/id/1018/600/600';
const CARD_IMAGE_2 = 'https://picsum.photos/id/1060/600/600';

const PROFILE_TABS = ['HOME', 'MY CHANNEL', 'CHANNEL ANALYTICS'] as const;
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

function EmptyChannelState({ 
  onCreateChannel, 
  onDemoClick,
  onEmptyDemoClick 
}: { 
  onCreateChannel: () => void, 
  onDemoClick?: () => void,
  onEmptyDemoClick?: () => void
}) {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyStateImageWrap}>
        <RNImage
          source={require('@/assets/images/no_channel.png')}
          style={styles.emptyStateImage}
          resizeMode="contain"
        />
      </View>
      <AppText style={styles.emptyStateTitle}>You Haven't Started Your Channel Yet</AppText>
      <AppText style={styles.emptyStateSubtitle}>
        Start your content creator journey by creating your own channel
      </AppText>
      <Pressable style={styles.emptyStateButton} onPress={onCreateChannel}>
        <AppText style={styles.emptyStateButtonText}>Start Your Channel</AppText>
      </Pressable>

      {onDemoClick && (
        <Pressable onPress={onDemoClick} style={{ marginTop: 24 }}>
          <AppText style={{ fontFamily: FONT_DEFAULT, color: BRAND_BLUE, textDecorationLine: 'underline', fontSize: 14 }}>
            Channel with posts (demo)
          </AppText>
        </Pressable>
      )}

      {onEmptyDemoClick && (
        <Pressable onPress={onEmptyDemoClick} style={{ marginTop: 12 }}>
          <AppText style={{ fontFamily: FONT_DEFAULT, color: BRAND_BLUE, textDecorationLine: 'underline', fontSize: 14 }}>
            Channel with no posts (demo)
          </AppText>
        </Pressable>
      )}
    </View>
  );
}

function EmptyTabState({ type }: { type: 'Video' | 'Shorts' | 'Post' }) {
  return (
    <View style={styles.emptyTabState}>
      <View style={styles.emptyTabImageWrap}>
        <RNImage
          source={require('@/assets/images/no_posts.png')}
          style={styles.emptyTabImage}
          resizeMode="contain"
        />
      </View>
      <AppText style={styles.emptyTabTitle}>You Have no {type} Yet</AppText>
      <AppText style={styles.emptyTabSubtitle}>
        Start your content creator journey by posting your first {type}
      </AppText>
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ initialTab?: ProfileTab }>();
  const insets = useSafeAreaInsets();
  const [profileTab, setProfileTab] = useState<ProfileTab>(params.initialTab || 'HOME');
  const [isCreateChannelVisible, setIsCreateChannelVisible] = useState(false);
  
  // Demo state: 'none' | 'full' | 'empty'
  const [demoType, setDemoType] = useState<'none' | 'full' | 'empty'>('none');
  const [demoSubTab, setDemoSubTab] = useState<'Videos' | 'Shorts' | 'Post'>('Videos');

  useEffect(() => {
    if (params.initialTab && PROFILE_TABS.includes(params.initialTab)) {
      setProfileTab(params.initialTab);
    }
  }, [params.initialTab]);

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
            <AppText style={styles.backRowLabel}>My Profile</AppText>
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

            <Pressable style={styles.primaryButton} onPress={() => router.push('/complete-profile')}>
              <AppText style={styles.primaryButtonText} numberOfLines={1}>
                Complete your Profile
              </AppText>
              <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.primaryButtonIcon} />
            </Pressable>

          <View style={styles.bioBlock}>
            <AppText style={styles.bioText}>In remembrance of Allah, hearts find peace 🌙🕋</AppText>
            <AppText style={styles.bioMeta}>25.02.1999</AppText>
            <AppText style={styles.bioMeta}>Married</AppText>
            <AppText style={styles.bioMeta}>+383 44 999 211</AppText>
          </View>
          </View>

        {/* HOME tab content - share box & AI bar */}
        <View style={styles.homeSection}>
          <AppText style={styles.shareTitle}>
            Feel free to share{'\n'}your thoughts
          </AppText>

          <View style={styles.shareBox}>
            <View style={styles.shareIconWrap}>
              <RNImage
                source={require('@/assets/images/icons/url.png')}
                style={styles.shareUrlIcon}
                resizeMode="contain"
              />
            </View>
            <AppText style={styles.shareHint} numberOfLines={2}>
              Insights, reflections, and{'\n'}ideas are welcome
            </AppText>
            <Pressable style={styles.shareMic}>
              <RNImage
                source={require('@/assets/images/icons/mic.png')}
                style={styles.shareMicIcon}
                resizeMode="contain"
              />
            </Pressable>
            <Pressable style={styles.shareSend}>
              <Ionicons name="arrow-up" size={24} color={BRAND_BLUE} />
            </Pressable>
          </View>

          <LinearGradient
            colors={['#3b82f6', '#1e3a8a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.aiBar}
          >
            <AppText style={styles.aiBarText} numberOfLines={2}>
              Need inspiration? Let AI help you craft the perfect post
            </AppText>
            <Pressable style={styles.aiBarButton}>
              <Ionicons name="sparkles" size={12} color="#FDE047" />
              <AppText style={styles.aiBarButtonText}>Generate Ideas</AppText>
              <Ionicons name="arrow-forward" size={14} color="#fff" />
            </Pressable>
          </LinearGradient>
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
          ) : profileTab === 'MY CHANNEL' ? (
            demoType !== 'none' ? (
              <View style={styles.videosSection}>
                {/* Sub Tabs */}
                <View style={styles.subTabsWrap}>
                  {['Videos', 'Shorts', 'Post'].map((tab) => (
                    <Pressable 
                      key={tab} 
                      onPress={() => setDemoSubTab(tab as any)} 
                      style={[styles.subTab, demoSubTab === tab && styles.subTabActive]}
                    >
                      <AppText style={[styles.subTabText, demoSubTab === tab && styles.subTabTextActive]}>{tab}</AppText>
                    </Pressable>
                  ))}
                </View>

                {demoSubTab === 'Videos' && (
                  demoType === 'full' ? (
                    <>
                      <AppText style={styles.videosSectionTitle}>Latest Video</AppText>
                      
                      {/* Latest Video Card */}
                      <View style={styles.latestVideoCard}>
                        <Image source={{ uri: CARD_IMAGE_1 }} style={styles.latestVideoImage} contentFit="cover" />
                        <View style={styles.latestVideoOverlay}>
                          <Ionicons name="play-circle" size={48} color="rgba(255,255,255,0.9)" />
                        </View>
                        <View style={styles.latestVideoContent}>
                          <AppText style={styles.latestVideoTitle}>Studying the Deen is not a luxury it is a responsibility</AppText>
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
                    </>
                  ) : (
                    <EmptyTabState type="Video" />
                  )
                )}

                {demoSubTab === 'Shorts' && (
                  demoType === 'full' ? (
                    <>
                      <AppText style={styles.videosSectionTitle}>Short Videos</AppText>
                      <View style={styles.shortsGrid}>
                        {SHORTS.map((short) => (
                          <Pressable key={short.id} style={styles.shortsCard}>
                            <Image 
                              source={{ uri: short.image }} 
                              style={styles.shortsImage} 
                              contentFit="cover"
                              transition={200}
                            />
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
                    </>
                  ) : (
                    <EmptyTabState type="Shorts" />
                  )
                )}

                {demoSubTab === 'Post' && (
                  demoType === 'full' ? (
                    <>
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
                    </>
                  ) : (
                    <EmptyTabState type="Post" />
                  )
                )}
              </View>
            ) : (
              <EmptyChannelState 
                onCreateChannel={() => setIsCreateChannelVisible(true)} 
                onDemoClick={() => setDemoType('full')}
                onEmptyDemoClick={() => setDemoType('empty')}
              />
            )
          ) : (
            <EmptyChannelState 
              onCreateChannel={() => setIsCreateChannelVisible(true)} 
            />
          )}
        </View>
        </ScrollView>
      </View>

      <CreateChannelSheet 
        visible={isCreateChannelVisible} 
        onClose={() => setIsCreateChannelVisible(false)} 
      />
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
  headerTitleWhite: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 17,
    color: '#fff',
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
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  coverText: {
    fontFamily: FONT_DEFAULT,
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
    height: 48,
    backgroundColor: BRAND_BLUE,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    fontFamily: FONT_DEFAULT,
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    flex: 1,
  },
  primaryButtonIcon: {
    position: 'absolute',
    right: 16,
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
  homeSection: {
    paddingHorizontal: H_PAD,
    paddingTop: 24,
    paddingBottom: 24,
    gap: 24,
  },
  shareTitle: {
    fontFamily: FONT_DEFAULT,
    fontSize: 28,
    color: '#111827',
    marginBottom: 16,
    lineHeight: 34,
  },
  shareBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 999,
    padding: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  shareIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  shareUrlIcon: {
    width: 20,
    height: 20,
    tintColor: '#111827',
  },
  shareHint: {
    fontFamily: FONT_DEFAULT,
    flex: 1,
    fontSize: 13,
    color: '#111827',
  },
  shareMic: {
    padding: 8,
  },
  shareMicIcon: {
    width: 18,
    height: 18,
    tintColor: '#111827',
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
    borderRadius: 999,
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 8,
    gap: 12,
  },
  aiBarText: {
    fontFamily: FONT_DEFAULT,
    flex: 1,
    fontSize: 11,
    color: '#fff',
    opacity: 0.95,
    lineHeight: 17,
  },
  aiBarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: BRAND_BLUE,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  aiBarButtonText: {
    fontSize: 11,
    fontFamily: FONT_SEMIBOLD,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  tabsScroll: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
    maxHeight: 72,
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
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: BRAND_BLUE,
  },
  tabText: {
    fontSize: 11,
    fontFamily: FONT_SEMIBOLD,
    color: '#9CA3AF',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  tabTextActive: {
    fontFamily: FONT_SEMIBOLD,
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyStateImageWrap: {
    width: 200,
    height: 200,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateImage: {
    width: '100%',
    height: '100%',
  },
  emptyStateTitle: {
    fontFamily: FONT_DEFAULT,
    fontWeight: '500',
    fontSize: 18,
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 26,
  },
  emptyStateSubtitle: {
    fontFamily: FONT_DEFAULT,
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 240,
    lineHeight: 18,
  },
  emptyStateButton: {
    width: '100%',
    maxWidth: 240,
    height: 44,
    borderWidth: 1.5,
    borderColor: BRAND_BLUE,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateButtonText: {
    fontFamily: FONT_DEFAULT,
    fontWeight: '500',
    fontSize: 15,
    color: BRAND_BLUE,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  // New Styles
  subTabsWrap: {
    flexDirection: 'row',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 0,
  },
  subTab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  subTabActive: {
    borderBottomColor: BRAND_BLUE,
  },
  subTabText: {
    fontFamily: FONT_DEFAULT,
    fontSize: 15,
    color: '#6B7280',
  },
  subTabTextActive: {
    color: '#111827',
    fontFamily: FONT_SEMIBOLD,
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
    top: 12,
    left: 12,
    right: 12,
    aspectRatio: 16 / 9,
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
  // Empty Tab Styles
  emptyTabState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyTabImageWrap: {
    width: 200,
    height: 200,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTabImage: {
    width: '100%',
    height: '100%',
  },
  emptyTabTitle: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 18,
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyTabSubtitle: {
    fontFamily: FONT_DEFAULT,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 240,
    lineHeight: 20,
  },
});
