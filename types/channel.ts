/**
 * Backend channel response structure
 */
export type ChannelDetails = {
  id: string;
  name: string;
  handle: string;
  description: string;
  avatar?: string;
  banner?: string;
  subscribers: number;
  totalViews: number;
  videoCount?: number;
};

/** Mock channel details for demos (channel with data, channel with no data) */
export const MOCK_CHANNEL_WITH_DATA: ChannelDetails = {
  id: '1',
  name: 'My Channel',
  handle: 'my_channel',
  description: 'Channel description. Sharing knowledge and reflections on the Deen.',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  banner: 'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?q=80&w=1200&auto=format&fit=crop',
  subscribers: 1500,
  totalViews: 50000,
  videoCount: 50,
};

export const MOCK_CHANNEL_EMPTY: ChannelDetails = {
  id: '1',
  name: 'My Channel',
  handle: 'my_channel',
  description: 'Your channel is ready. Start posting to grow your audience.',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  banner: undefined,
  subscribers: 0,
  totalViews: 0,
  videoCount: 0,
};
