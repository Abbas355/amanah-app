import { AppText } from '@/components/app-text';
import { BrandLogo } from '@/components/brand-logo';
import { FormInput } from '@/components/form-input';
import { FONT_DEFAULT, FONT_SEMIBOLD } from '@/constants/fonts';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
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

export default function ForgotPasswordScreen() {
  const insets = useSafeAreaInsets();
  const [captcha, setCaptcha] = useState('Ft2h');

  const refreshCaptcha = () => {
    // Simple random captcha - in production use real captcha API
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptcha(result);
  };

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
        <Link href="/(auth)/register" asChild>
          <Pressable style={styles.brandHeader}>
            <BrandLogo height={40} />
          </Pressable>
        </Link>

        <AppText style={styles.title}>Forgot your Password?</AppText>

        {/* Form */}
        <View style={styles.form}>
          <FormInput
            label="Email"
            placeholder="Email or phone number"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <FormInput label="What you see Captcha" placeholder="Ft2h" />

          {/* Captcha display */}
          <View style={styles.inputGroup}>
            <AppText style={styles.label}>Captcha</AppText>
            <View style={styles.captchaRow}>
              <View style={styles.captchaBox}>
                <View style={styles.captchaTextRow}>
                  {captcha.split('').map((char, i) => (
                    <View
                      key={i}
                      style={[
                        i === 1 && styles.captchaCharRotateLeft,
                        i === 3 && styles.captchaCharRotateRight,
                      ]}
                    >
                      <AppText style={styles.captchaText}>{char}</AppText>
                    </View>
                  ))}
                </View>
              </View>
              <Pressable
                onPress={refreshCaptcha}
                style={styles.refreshButton}
              >
                <Ionicons name="refresh" size={24} color="#fff" />
              </Pressable>
            </View>
          </View>
        </View>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.replace('/(auth)/check-email')}
        >
          <AppText style={styles.primaryButtonText}>Continue</AppText>
        </Pressable>

        {/* Back to Login */}
        <View style={styles.loginRow}>
          <AppText style={styles.loginText}>Remember your password? </AppText>
          <Link href="/(auth)/login" asChild>
            <Pressable>
              <AppText style={styles.loginLink}>Log In</AppText>
            </Pressable>
          </Link>
        </View>
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
    marginTop: 32,
  },
  form: {
    marginTop: 24,
    gap: 20,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontFamily: FONT_DEFAULT,
    fontSize: 10,
    fontWeight: '500',
    color: '#6A6A6A',
    paddingLeft: 12,
  },
  captchaRow: {
    flexDirection: 'row',
    gap: 8,
  },
  captchaBox: {
    flex: 1,
    height: 52,
    backgroundColor: INPUT_BG,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  captchaTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  captchaText: {
    fontSize: 28,
    fontStyle: 'italic',
    letterSpacing: 4,
    color: '#374151',
  },
  captchaCharRotateLeft: {
    transform: [{ rotate: '-12deg' }],
  },
  captchaCharRotateRight: {
    transform: [{ rotate: '6deg' }],
  },
  refreshButton: {
    width: 52,
    height: 52,
    backgroundColor: BRAND_COLOR,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
  loginRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 24,
    gap: 4,
  },
  loginText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#111827',
  },
  loginLink: {
    fontSize: 12,
    fontWeight: '700',
    color: BRAND_COLOR,
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
