import { AppText } from '@/components/app-text';
import { BrandLogo } from '@/components/brand-logo';
import { FormInput } from '@/components/form-input';
import { FONT_DEFAULT, FONT_SEMIBOLD } from '@/constants/fonts';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BRAND_COLOR = '#5FA0FA';
const INPUT_BG = '#F3F4F6';
const SUCCESS_GREEN = '#4ADE80';

export default function ResetPasswordScreen() {
  const insets = useSafeAreaInsets();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Brand Header */}
        <Link href="/(auth)/login" asChild>
          <Pressable style={styles.brandHeader}>
            <BrandLogo height={40} />
          </Pressable>
        </Link>

        <AppText style={styles.title}>Reset Password!</AppText>

        {/* Form */}
        <View style={styles.form}>
          <FormInput
            label="New Password"
            placeholder="**********"
            helperText="Must be 8 Characters"
            helperColor="#111827"
            secureTextEntry
            showPasswordToggle
            isPasswordVisible={showNewPassword}
            onPasswordToggle={() => setShowNewPassword(!showNewPassword)}
            autoCapitalize="none"
          />
          <FormInput
            label="Repeat New Password"
            placeholder="**********"
            helperText="Your Password Matchs"
            helperColor={SUCCESS_GREEN}
            secureTextEntry
            showPasswordToggle
            isPasswordVisible={showRepeatPassword}
            onPasswordToggle={() => setShowRepeatPassword(!showRepeatPassword)}
            autoCapitalize="none"
          />
        </View>

        <Link href="/(auth)/login" asChild>
          <Pressable style={styles.primaryButton}>
            <AppText style={styles.primaryButtonText}>Log In</AppText>
          </Pressable>
        </Link>
      </ScrollView>

      {/* Bottom Section - fixed at bottom */}
      <View style={[styles.bottomSection, { paddingBottom: 40 + insets.bottom }]}>
        <View style={styles.storeBadges}>
          <Pressable>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg',
              }}
              style={styles.storeBadge}
            />
          </Pressable>
          <Pressable>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg',
              }}
              style={styles.storeBadge}
            />
          </Pressable>
        </View>
        <View style={styles.footer}>
          <Pressable>
            <AppText style={styles.footerLink}>Terms and Conditions</AppText>
          </Pressable>
          <AppText style={styles.footerCopy}>© 2026 Amanah. All Rights Reserved.</AppText>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },
  brandHeader: {
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 20,
    fontStyle: 'normal',
    color: '#000',
    letterSpacing: -0.5,
    lineHeight: 36,
    marginTop: 32,
  },
  form: {
    marginTop: 24,
    gap: 20,
  },
  helperText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    paddingHorizontal: 4,
    marginTop: 4,
  },
  primaryButton: {
    width: '100%',
    height: 48,
    backgroundColor: BRAND_COLOR,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  primaryButtonText: {
    fontFamily: FONT_DEFAULT,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  storeBadges: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingBottom: 16,
  },
  storeBadge: {
    height: 48,
    width: 140,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    paddingTop: 24,
    width: '100%',
  },
  footerLink: {
    fontSize: 10,
    fontWeight: '500',
    color: BRAND_COLOR,
  },
  footerCopy: {
    fontSize: 10,
    fontWeight: '500',
    color: '#9CA3AF',
  },
});
