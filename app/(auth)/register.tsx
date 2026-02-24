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

const BRAND_COLOR = '#5FA0FA';
const INPUT_BG = '#F3F4F6';
const TOGGLE_OFF = '#E5E7EB';

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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

        <AppText style={styles.title}>Create Account</AppText>

        {/* Form */}
        <View style={styles.form}>
          <FormInput label="First Name" placeholder="Erza" />
          <FormInput
            label="Email or phone number"
            placeholder="erzabilallil@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <FormInput label="Last Name" placeholder="Bilalli" />
          <FormInput
            label="Date of birth (MM/DD/YY)"
            placeholder="02/25/1999"
            rightIcon="calendar"
          />
          <FormInput
            label="Password"
            placeholder="************"
            secureTextEntry
            showPasswordToggle
            isPasswordVisible={showPassword}
            onPasswordToggle={() => setShowPassword(!showPassword)}
          />
          <FormInput
            label="Confirm Password"
            placeholder="************"
            secureTextEntry
            showPasswordToggle
            isPasswordVisible={showConfirmPassword}
            onPasswordToggle={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          <View style={styles.controls}>
            <Pressable
              onPress={() => setRememberMe(!rememberMe)}
              style={styles.rememberRow}
            >
              <View style={[styles.toggle, rememberMe && styles.toggleOn]}>
                <View style={[styles.toggleKnob, rememberMe && styles.toggleKnobOn]} />
              </View>
              <AppText style={styles.rememberText}>Remember me</AppText>
            </Pressable>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Pressable style={styles.primaryButton}>
            <AppText style={styles.primaryButtonText}>Sign in</AppText>
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

        {/* Footer Link */}
        <View style={styles.signupRow}>
          <AppText style={styles.signupText}>You have the account </AppText>
          <Link href="/(auth)/login" asChild>
            <Pressable>
              <AppText style={styles.signupLink}>Log In</AppText>
            </Pressable>
          </Link>
        </View>

        {/* Store Badges */}
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
  controls: {
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
  actions: {
    marginTop: 28,
    gap: 16,
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
