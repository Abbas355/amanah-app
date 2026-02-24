import { Tabs } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { DashboardHeader } from '@/components/dashboard-header';
import { HapticTab } from '@/components/haptic-tab';

const TAB_BLUE = '#60A5FA';
const TAB_INACTIVE_ICON = '#111827';
const TAB_INACTIVE_BG = '#E5E7EB';
const ICON_SIZE = 20;

const TAB_ICONS = {
  index: require('@/assets/images/icons/home.png'),
  explore: require('@/assets/images/icons/compass.png'),
  videos: require('@/assets/images/icons/videos.png'),
  channels: require('@/assets/images/icons/channel.png'),
  messages: require('@/assets/images/icons/message.png'),
} as const;

function TabIcon({ routeName, focused }: { routeName: keyof typeof TAB_ICONS; focused: boolean }) {
  const source = TAB_ICONS[routeName];
  const tint = focused ? '#fff' : TAB_INACTIVE_ICON;
  return (
    <View style={[styles.iconWrap, focused ? styles.iconWrapActive : styles.iconWrapInactive]}>
      <Image
        source={source}
        style={[styles.iconImage, { tintColor: tint }]}
        resizeMode="contain"
      />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        header: () => <DashboardHeader />,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: TAB_BLUE,
        tabBarInactiveTintColor: TAB_INACTIVE_ICON,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          height: 80,
          paddingBottom: 8,
          paddingTop: 12,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon routeName="index" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => <TabIcon routeName="explore" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          title: 'Videos',
          tabBarIcon: ({ focused }) => <TabIcon routeName="videos" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="channels"
        options={{
          title: 'Channels',
          tabBarIcon: ({ focused }) => <TabIcon routeName="channels" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ focused }) => <TabIcon routeName="messages" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  iconWrapInactive: {
    backgroundColor: TAB_INACTIVE_BG,
  },
  iconWrapActive: {
    backgroundColor: TAB_BLUE,
    shadowColor: TAB_BLUE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});
