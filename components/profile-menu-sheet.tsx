import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { FONT_SEMIBOLD } from '@/constants/fonts';

type ProfileMenuSheetProps = {
  visible: boolean;
  onClose: () => void;
};

export function ProfileMenuSheet({ visible, onClose }: ProfileMenuSheetProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleNavigation = (route: string, params?: any) => {
    onClose();
    // Small delay to allow modal to close before navigating
    setTimeout(() => {
      router.push({ pathname: route as any, params });
    }, 300);
  };

  const handleSignOut = () => {
    onClose();
    setTimeout(() => {
      router.replace('/(auth)/login');
    }, 300);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.handle} />
          
          <View style={styles.menu}>
            <Pressable 
              style={[styles.menuItem, styles.menuItemActive]} 
              onPress={() => handleNavigation('/profile')}
            >
              <AppText style={styles.menuText}>My Profile</AppText>
              <Ionicons name="checkmark" size={20} color="#3B82F6" />
            </Pressable>

            <Pressable 
              style={styles.menuItem} 
              onPress={() => handleNavigation('/profile', { initialTab: 'MY CHANNEL' })}
            >
              <AppText style={styles.menuText}>My Channel</AppText>
            </Pressable>

            <Pressable style={styles.menuItem} onPress={onClose}>
              <AppText style={styles.menuText}>Settings</AppText>
            </Pressable>

            <Pressable style={styles.menuItem} onPress={onClose}>
              <AppText style={styles.menuText}>Support</AppText>
            </Pressable>

            <Pressable 
              style={styles.menuItem} 
              onPress={() => handleNavigation('/profile', { initialTab: 'CHANNEL ANALYTICS' })}
            >
              <AppText style={styles.menuText}>Channel Analytics</AppText>
            </Pressable>

            <Pressable 
              style={[styles.menuItem, styles.signOutItem]} 
              onPress={handleSignOut}
            >
              <AppText style={styles.signOutText}>Sign Out</AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  menu: {
    gap: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  menuItemActive: {
    backgroundColor: '#EFF6FF',
  },
  menuText: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 14,
    color: '#111827',
  },
  signOutItem: {
    backgroundColor: '#FEF2F2',
    marginTop: 8,
  },
  signOutText: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 14,
    color: '#111827',
  },
});
