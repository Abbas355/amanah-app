import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { ScreenGradient } from '@/components/screen-gradient';
import { FONT_DEFAULT, FONT_SEMIBOLD } from '@/constants/fonts';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const H_PAD = 20;
const GAP = 16;
const CARD_WIDTH = (SCREEN_WIDTH - H_PAD * 2 - GAP) / 2;

const CATEGORIES = [
  { id: '1', name: 'Discover', icon: 'compass-outline', bg: '#E0F2FE' }, // Light blue
  { id: '2', name: 'Health', icon: 'medkit-outline', bg: '#F3F4F6' }, // Grey/Beige
  { id: '3', name: 'Shop', icon: 'cart-outline', bg: '#FCE7F3' }, // Pinkish
  { id: '4', name: 'Learn', icon: 'book-outline', bg: '#E0E7FF' }, // Indigo-ish
  { id: '5', name: 'Travel', icon: 'airplane-outline', bg: '#DCFCE7' }, // Greenish
] as const;

const CHANNELS = [
  {
    id: '1',
    name: 'Erza Bilalli',
    handle: '@Erzabbb',
    image: 'https://images.unsplash.com/photo-1628563694622-5a76957fd09c?q=80&w=600&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1628563694622-5a76957fd09c?q=80&w=100&auto=format&fit=crop',
    description: 'In remembrance of Allah, hearts find peace.',
    verified: true,
  },
  {
    id: '2',
    name: 'Twinies',
    handle: '@twinies1',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=100&auto=format&fit=crop',
    description: 'In remembrance of Allah...',
    verified: false,
  },
  {
    id: '3',
    name: 'Erza Bilalli',
    handle: '@Erzabbb',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop',
    description: 'In remembrance of Allah, hearts find.',
    verified: true,
  },
  {
    id: '4',
    name: 'Twinies',
    handle: '@twinies1',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
    description: 'In remembrance of Allah...',
    verified: false,
  },
  {
    id: '5',
    name: 'Erza Bilalli',
    handle: '@Erzabbb',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=600&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=100&auto=format&fit=crop',
    description: 'In remembrance of Allah, hearts find.',
    verified: true,
  },
  {
    id: '6',
    name: 'Twinies',
    handle: '@twinies1',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
    description: 'In remembrance of Allah...',
    verified: false,
  },
];

export default function ChannelsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Background Gradient */}
        <ScreenGradient />

        <View style={styles.headerSection}>
          <AppText style={styles.pageTitle}>Channels</AppText>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search"
              placeholderTextColor="#000"
              style={styles.searchInput}
              textAlignVertical="center"
              includeFontPadding={false}
            />
          </View>

          {/* Categories */}
          <AppText style={styles.sectionTitle}>Browse by category</AppText>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {CATEGORIES.map((cat) => (
            <View key={cat.id} style={styles.categoryItem}>
              <View style={[styles.categoryIconWrap, { backgroundColor: cat.bg }]}>
                <Ionicons name={cat.icon as any} size={24} color="#1F2937" />
              </View>
              <AppText style={styles.categoryName}>{cat.name}</AppText>
            </View>
          ))}
        </ScrollView>

        {/* Channel Grid */}
        <View style={styles.gridContainer}>
          {CHANNELS.map((channel) => (
            <Pressable key={channel.id} style={styles.card}>
              <Image source={{ uri: channel.image }} style={styles.cardImage} contentFit="cover" />
              
              {/* Dark Gradient Overlay for text readability */}
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.cardOverlay}
              />

              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardAvatarWrap}>
                    <Image source={{ uri: channel.avatar }} style={styles.cardAvatar} />
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.nameRow}>
                    <AppText style={styles.cardName} numberOfLines={1}>
                      {channel.name}
                    </AppText>
                    {channel.verified && (
                      <Ionicons name="checkmark-circle" size={14} color="#FBBF24" />
                    )}
                  </View>
                  <AppText style={styles.cardHandle}>{channel.handle}</AppText>
                  <AppText style={styles.cardDesc} numberOfLines={2}>
                    {channel.description}
                  </AppText>
                </View>
              </View>
            </Pressable>
          ))}
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
  scrollContent: {
    paddingBottom: 40,
    paddingTop: 12,
  },
  headerSection: {
    paddingHorizontal: H_PAD,
    marginTop: 20,
  },
  pageTitle: {
    fontFamily: FONT_DEFAULT,
    fontSize: 15, 
    color: '#111827',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 16,
    height: 42,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  searchInput: {
    flex: 1,
    fontFamily: FONT_DEFAULT,
    fontSize: 15,
    color: '#111827',
    height: '100%',
    paddingVertical: 0, // Fix for Android vertical alignment
  },
  searchIcon: {
    marginLeft: 8,
  },
  sectionTitle: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  categoriesScroll: {
    paddingHorizontal: H_PAD,
    gap: 20,
    paddingBottom: 24,
  },
  categoryItem: {
    alignItems: 'center',
    gap: 8,
  },
  categoryIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    fontFamily: FONT_DEFAULT,
    fontSize: 13,
    color: '#111827',
  },
  gridContainer: {
    paddingHorizontal: H_PAD,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.3, // Aspect ratio
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F3F4F6',
    marginBottom: GAP,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  cardContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
  },
  cardAvatarWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.8)',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  cardAvatar: {
    width: '100%',
    height: '100%',
  },
  cardFooter: {
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardName: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 15,
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cardHandle: {
    fontFamily: FONT_DEFAULT,
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 4,
  },
  cardDesc: {
    fontFamily: FONT_DEFAULT,
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 15,
  },
});
