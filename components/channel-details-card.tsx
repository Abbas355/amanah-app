import { AppText } from '@/components/app-text';
import { FONT_DEFAULT, FONT_SEMIBOLD } from '@/constants/fonts';
import type { ChannelDetails } from '@/types/channel';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const BRAND_BLUE = '#60A5FA';
const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop';

type ChannelDetailsCardProps = {
  channel: ChannelDetails;
  /** When true, shows avatar and uses compact header (for other's channel page) */
  showAvatar?: boolean;
};

function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export function ChannelDetailsCard({ channel, showAvatar }: ChannelDetailsCardProps) {
  return (
    <View style={[styles.card, showAvatar && styles.cardWithAvatar]}>
      {showAvatar && (
        <View style={styles.avatarWrap}>
          <Image
            source={{ uri: channel.avatar ?? DEFAULT_AVATAR }}
            style={styles.avatar}
            contentFit="cover"
          />
        </View>
      )}
      <View style={styles.content}>
      <AppText style={styles.name}>{channel.name}</AppText>
      <AppText style={styles.handle}>@{channel.handle}</AppText>
      {channel.description ? (
        <AppText style={styles.description} numberOfLines={3}>
          {channel.description}
        </AppText>
      ) : null}
      <View style={styles.statsRow}>
        <AppText style={styles.statsText}>
          {formatNumber(channel.subscribers)} Subscribers
        </AppText>
        <AppText style={styles.statsDot}>•</AppText>
        <AppText style={styles.statsText}>
          {formatNumber(channel.totalViews)} Views
        </AppText>
        {(channel.videoCount ?? 0) > 0 && (
          <>
            <AppText style={styles.statsDot}>•</AppText>
            <AppText style={styles.statsText}>
              {channel.videoCount} Videos
            </AppText>
          </>
        )}
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 4,
  },
  cardWithAvatar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  avatarWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  name: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 18,
    color: '#111827',
  },
  handle: {
    fontFamily: FONT_DEFAULT,
    fontSize: 14,
    color: BRAND_BLUE,
    marginBottom: 4,
  },
  description: {
    fontFamily: FONT_DEFAULT,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  statsText: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 14,
    color: '#111827',
  },
  statsDot: {
    fontFamily: FONT_DEFAULT,
    fontSize: 14,
    color: '#9CA3AF',
  },
});
