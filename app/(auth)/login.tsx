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

const BRAND_COLOR = '#5FA0FA';
const INPUT_BG = '#F3F4F6';
const TOGGLE_OFF = '#E5E7EB';

const ERROR_RED = '#EF4444';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    setError(null);
    const formData = { login, password, rememberMe };
    if (!login.trim()) {
      setError('Email or phone number is required');
      return;
    }
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    console.log('Login form submitted:', formData);
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Brand Header */}
        <View style={styles.brandHeader}>
          <BrandLogo height={40} />
        </View>

        <AppText style={styles.title}>Log In</AppText>

        {/* Form */}
        <View style={styles.form}>
          <FormInput
            label="Login"
            placeholder="Email or phone number"
            value={login}
            onChangeText={(t) => { setLogin(t); setError(null); }}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />

          <FormInput
            label="Password"
            placeholder="Enter password"
            value={password}
            onChangeText={(t) => { setPassword(t); setError(null); }}
            secureTextEntry
            showPasswordToggle
            isPasswordVisible={showPassword}
            onPasswordToggle={() => setShowPassword(!showPassword)}
            autoCapitalize="none"
          />

          {/* Controls */}
          <View style={styles.controls}>
            <Pressable
              onPress={() => setRememberMe(!rememberMe)}
              style={styles.rememberRow}
            >
              <View
                style={[
                  styles.toggle,
                  rememberMe && styles.toggleOn,
                ]}
              >
                <View
                  style={[
                    styles.toggleKnob,
                    rememberMe && styles.toggleKnobOn,
                  ]}
                />
              </View>
              <AppText style={styles.rememberText}>Remember me</AppText>
            </Pressable>
            <Link href="/(auth)/forgot-password" asChild>
              <Pressable>
                <AppText style={styles.forgotLink}>Forgot password?</AppText>
              </Pressable>
            </Link>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          {error ? <AppText style={styles.errorText}>{error}</AppText> : null}
          <Pressable
            style={styles.primaryButton}
            onPress={handleSubmit}
          >
            <AppText style={styles.primaryButtonText}>Log In</AppText>
          </Pressable>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
          </View>

          <Pressable style={styles.googleButton}>
            <View style={styles.googleIconWrap}>
              <Image
                source={require('@/assets/images/google-logo.png')}
                style={styles.googleIcon}
                contentFit="contain"
              />
            </View>
            <AppText style={styles.googleButtonText}>Or sign in with Google</AppText>
          </Pressable>
        </View>

        {/* Signup Link */}
        <View style={styles.signupRow}>
          <AppText style={styles.signupText}>Dont have an account? </AppText>
          <Link href="/(auth)/register" asChild>
            <Pressable>
              <AppText style={styles.signupLink}>Sign up now</AppText>
            </Pressable>
          </Link>
        </View>

        {/* Store Badges */}
        <View style={styles.storeBadges}>
          <Pressable style={styles.storeBadgeButton}>
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg' }}
              style={styles.storeBadge}
              contentFit="contain"
            />
          </Pressable>
          <Pressable style={styles.storeBadgeButton}>
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg' }}
              style={styles.storeBadge}
              contentFit="contain"
            />
          </Pressable>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Pressable>
            <AppText style={styles.footerLink}>Terms and Conditions</AppText>
          </Pressable>
          <AppText style={styles.footerCopy}>© 2026 Amanah. All Rights Reserved.</AppText>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    alignItems: 'center',
  },
  brandHeader: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  title: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 20,
    fontStyle: 'normal',
    color: '#000',
    letterSpacing: -0.5,
    alignSelf: 'flex-start',
    marginTop: 40,
  },
  form: {
    width: '100%',
    marginTop: 24,
    gap: 24,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  toggle: {
    width: 48,
    height: 24,
    borderRadius: 12,
    backgroundColor: TOGGLE_OFF,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleOn: {
    backgroundColor: BRAND_COLOR,
  },
  toggleKnob: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    transform: [{ translateX: 4 }],
  },
  toggleKnobOn: {
    transform: [{ translateX: 28 }],
  },
  rememberText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#111827',
  },
  forgotLink: {
    fontSize: 12,
    fontWeight: '500',
    color: BRAND_COLOR,
  },
  actions: {
    width: '100%',
    marginTop: 32,
    gap: 16,
  },
  errorText: {
    fontSize: 14,
    color: ERROR_RED,
    width: '100%',
    textAlign: 'center',
    marginBottom: 4,
  },
  primaryButton: {
    width: '100%',
    height: 48,
    backgroundColor: BRAND_COLOR,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontFamily: FONT_DEFAULT,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
  },
  divider: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  dividerLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  googleButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#000',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  googleIconWrap: {
    padding: 4,
  },
  googleIcon: {
    width: 18,
    height: 18,
  },
  googleButtonText: {
    fontFamily: FONT_DEFAULT,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
  },
  signupRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 24,
    gap: 4,
  },
  signupText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#111827',
  },
  signupLink: {
    fontSize: 12,
    fontWeight: '700',
    color: BRAND_COLOR,
  },
  storeBadges: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 48,
    paddingBottom: 16,
  },
  storeBadgeButton: {
    width: 140,
    height: 48,
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
    paddingBottom: 40,
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
