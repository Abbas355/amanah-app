import { AppText } from '@/components/app-text';
import { BrandLogo } from '@/components/brand-logo';
import { FONT_DEFAULT } from '@/constants/fonts';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';

const BRAND_COLOR = '#5FA0FA';

export default function CheckEmailScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Header */}
        <Link href="/(auth)/login" asChild>
          <Pressable style={styles.brandHeader}>
            <BrandLogo height={40} />
          </Pressable>
        </Link>

        <View style={styles.content}>
          <Image
            source={require('@/assets/images/email-check-illustration.png')}
            style={styles.emailIllustration}
            contentFit="contain"
          />
          <AppText style={styles.title}>Please check{'\n'}your email!</AppText>
          <AppText style={styles.description}>
            In your email address associated with your account we will send you a
            link to reset password.
          </AppText>
          <View style={styles.buttons}>
            <Link href="/(auth)/reset-password" asChild>
              <Pressable style={styles.demoButton}>
                <AppText style={styles.demoButtonText}>Go to Reset (Demo)</AppText>
              </Pressable>
            </Link>
          </View>
        </View>

        {/* Store Badges */}
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

        {/* Footer */}
        <View style={styles.footer}>
          <Pressable>
            <AppText style={styles.footerLink}>Terms and Conditions</AppText>
          </Pressable>
          <AppText style={styles.footerCopy}>© 2026 Amanah. All Rights Reserved.</AppText>
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
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    alignItems: 'center',
  },
  brandHeader: {
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    maxWidth: 320,
  },
  emailIllustration: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  title: {
    fontFamily: FONT_DEFAULT,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 48,
  },
  buttons: {
    gap: 16,
  },
  demoButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  demoButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: BRAND_COLOR,
  },
  storeBadges: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginTop: 48,
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
