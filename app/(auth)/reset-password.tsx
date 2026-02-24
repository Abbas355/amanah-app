import { AppText } from '@/components/app-text';
import { BrandLogo } from '@/components/brand-logo';
import { FormInput } from '@/components/form-input';
import { FONT_DEFAULT, FONT_SEMIBOLD } from '@/constants/fonts';
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
const SUCCESS_GREEN = '#4ADE80';
const ERROR_RED = '#EF4444';

export default function ResetPasswordScreen() {
  const insets = useSafeAreaInsets();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const newPasswordHelper =
    newPassword.length === 0
      ? undefined
      : newPassword.length < 8
        ? { text: 'Must be 8 characters', color: '#6B7280' }
        : undefined;

  const repeatPasswordHelper =
    repeatPassword.length === 0
      ? undefined
      : repeatPassword !== newPassword
        ? { text: 'Passwords must match', color: ERROR_RED }
        : { text: 'Your passwords match', color: SUCCESS_GREEN };

  const isValid = newPassword.length >= 8 && newPassword === repeatPassword;

  const handleSubmit = () => {
    setSubmitError(null);
    if (!isValid) {
      if (newPassword.length < 8) setSubmitError('Password must be at least 8 characters');
      else if (newPassword !== repeatPassword) setSubmitError('Passwords do not match');
      return;
    }
    console.log('Reset password form submitted:', { newPassword, repeatPassword });
    router.replace('/(auth)/login');
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
            value={newPassword}
            onChangeText={(t) => { setNewPassword(t); setSubmitError(null); }}
            helperText={newPasswordHelper?.text}
            helperColor={newPasswordHelper?.color}
            secureTextEntry
            showPasswordToggle
            isPasswordVisible={showNewPassword}
            onPasswordToggle={() => setShowNewPassword(!showNewPassword)}
            autoCapitalize="none"
            centerPasswordPlaceholder
          />
          <FormInput
            label="Repeat New Password"
            placeholder="**********"
            value={repeatPassword}
            onChangeText={(t) => { setRepeatPassword(t); setSubmitError(null); }}
            helperText={repeatPasswordHelper?.text}
            helperColor={repeatPasswordHelper?.color}
            secureTextEntry
            showPasswordToggle
            isPasswordVisible={showRepeatPassword}
            onPasswordToggle={() => setShowRepeatPassword(!showRepeatPassword)}
            autoCapitalize="none"
            centerPasswordPlaceholder
          />
        </View>

        {submitError ? <AppText style={styles.submitErrorText}>{submitError}</AppText> : null}
        <Pressable style={styles.primaryButton} onPress={handleSubmit}>
          <AppText style={styles.primaryButtonText}>Log In</AppText>
        </Pressable>
      </ScrollView>

      {/* Bottom Section - fixed at bottom */}
      <View style={[styles.bottomSection, { paddingBottom: 40 + insets.bottom }]}>
        <View style={styles.storeBadges}>
          <Pressable style={styles.storeBadgeButton}>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg',
              }}
              style={styles.storeBadge}
              contentFit="contain"
            />
          </Pressable>
          <Pressable style={styles.storeBadgeButton}>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg',
              }}
              style={styles.storeBadge}
              contentFit="contain"
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
  submitErrorText: {
    fontSize: 14,
    color: ERROR_RED,
    width: '100%',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
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
    alignItems: 'center',
    gap: 12,
    paddingBottom: 16,
    width: '100%',
  },
  storeBadgeButton: {
    flex: 1,
    maxWidth: 160,
    height: 48,
    borderRadius: 8,
    overflow: 'hidden',
  },
  storeBadge: {
    width: '100%',
    height: '100%',
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
