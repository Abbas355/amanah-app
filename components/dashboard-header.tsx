import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Image as RNImage, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { ProfileMenuSheet } from '@/components/profile-menu-sheet';
import { FONT_DEFAULT, FONT_SEMIBOLD } from '@/constants/fonts';

const PROFILE_IMAGE =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop';

export function DashboardHeader() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <>
      <View style={[styles.header, { paddingTop: 16 + insets.top }]}>
        <Pressable style={styles.left} onPress={() => setIsMenuVisible(true)}>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: PROFILE_IMAGE }} style={styles.avatar} contentFit="cover" />
          </View>
          <View style={styles.welcomeWrap}>
            <View style={styles.welcomeRow}>
              <AppText style={styles.welcomeLabel}>Welcome</AppText>
              <Ionicons name="chevron-forward" size={14} color="#111827" />
            </View>
            <AppText style={styles.userName}>Erza</AppText>
          </View>
        </Pressable>

        <Pressable style={styles.bellButton}>
          <RNImage
            source={require('@/assets/images/icons/bell.png')}
            style={styles.bellIcon}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      <ProfileMenuSheet 
        visible={isMenuVisible} 
        onClose={() => setIsMenuVisible(false)} 
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  welcomeWrap: {
    flexDirection: 'column',
    gap: 0,
  },
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  welcomeLabel: {
    fontFamily: FONT_DEFAULT,
    fontSize: 13,
    color: '#111827',
  },
  userName: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 15,
    color: '#111827',
    marginTop: -2,
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellIcon: {
    width: 20,
    height: 20,
    tintColor: '#111827',
  },
});
