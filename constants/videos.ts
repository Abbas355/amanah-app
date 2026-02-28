/** Sample video URLs (public test videos) */
const VIDEO_URLS = {
  bigBuckBunny:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  elephantsDream:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  forBiggerBlazes:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  sintel: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
};

export type VideoItem = {
  id: string;
  title: string;
  image: string;
  videoUri: string;
  likes: string;
  comments: string;
  shares: string;
  date?: string;
};

export type ShortItem = {
  id: string;
  title: string;
  image: string;
  videoUri: string;
  likes: string;
  comments: string;
  shares: string;
};

export const SHORTS: ShortItem[] = [
  {
    id: '1',
    title: 'Studying the Deen is not a luxury it is a responsibility',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=600&auto=format&fit=crop',
    videoUri: VIDEO_URLS.forBiggerBlazes,
    likes: '13',
    comments: '3',
    shares: '0',
  },
  {
    id: '2',
    title: 'Daily Dua for peace and guidance',
    image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=600&auto=format&fit=crop',
    videoUri: VIDEO_URLS.elephantsDream,
    likes: '45',
    comments: '12',
    shares: '5',
  },
  {
    id: '3',
    title: 'Beautiful Quran Recitation',
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=600&auto=format&fit=crop',
    videoUri: VIDEO_URLS.bigBuckBunny,
    likes: '120',
    comments: '8',
    shares: '15',
  },
  {
    id: '4',
    title: 'Visiting the historic Mosque',
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=600&auto=format&fit=crop',
    videoUri: VIDEO_URLS.sintel,
    likes: '89',
    comments: '4',
    shares: '2',
  },
];

export const VIDEOS: VideoItem[] = [
  {
    id: '1',
    title: 'Studying the Deen is not a luxury it is a responsibility',
    image: 'https://picsum.photos/id/1018/600/600',
    videoUri: VIDEO_URLS.bigBuckBunny,
    likes: '13',
    comments: '3',
    shares: '0',
    date: 'Nov 28, 2025',
  },
  {
    id: '2',
    title: 'My beautiful family',
    image: 'https://picsum.photos/id/1060/600/600',
    videoUri: VIDEO_URLS.elephantsDream,
    likes: '8',
    comments: '2',
    shares: '1',
    date: 'Nov 28, 2025',
  },
];
