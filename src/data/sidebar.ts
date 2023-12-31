import {
  EnvelopeOpenIcon,
  GlobeIcon,
  HomeIcon,
  IdCardIcon,
  PersonIcon,
  VideoIcon,
} from '@radix-ui/react-icons';

export const defaultMenuItem = [
  {
    name: 'home',
    icon: HomeIcon,
    href: '/',
  },
  {
    name: 'community',
    icon: GlobeIcon,
    href: '/community',
  },
];

export const profileMemusStatic = [
  {
    name: 'user-agreements',
    icon: PersonIcon,
    href: '/user-agreements',
  },
  {
    name: 'privacy-policy',
    icon: IdCardIcon,
    href: '/policies-agreements',
  },
];

export const subscribeMenuItem = [
  {
    name: '조빵일',
    src: 'https://avatars.githubusercontent.com/u/122770896?v=4',
    href: '/tube/young1ll',
    favorite: true,
  },
  {
    name: '짐짝맨',
    src: 'https://yt3.ggpht.com/C7bTHnoo1S_MRbJXn4VwncNpB87C2aioJC_sKvgM-CGw_xgdxwiz0EFEqzj0SRVz6An2h81T4Q=s68-c-k-c0x00ffffff-no-rj',
    href: '/tube/jimjjackman',
    favorite: true,
  },
  {
    name: '당신이 알았던 이야기',
    src: 'https://yt3.ggpht.com/ytc/APkrFKYwpvzECeLqP488RVUntxR4QDMdOIHJYTwQGnhm=s68-c-k-c0x00ffffff-no-rj',
    href: '/tube/youknowstory',
    favorite: true,
  },
  {
    name: '좌왁굳의 게임방송',
    src: 'https://yt3.ggpht.com/TfNiEYiPS4wX6BWXerod80xL3pB8RvRLHiEDiPTPo1ZOIsgYivENAGTu2Sax_YJ-8g9SCHtvFw=s68-c-k-c0x00ffffff-no-rj',
    href: '/tube/leftgoodgame',
    favorite: true,
  },
  {
    name: '코딱지주먹',
    src: 'https://yt3.googleusercontent.com/Ng8hFPffppauDvBoBRvEYQDaYRVSYZ8zLgSVBkq_TFuUQamv9i9H_ubuQ9KG85zbWEv_hoL6=s176-c-k-c0x00ffffff-no-rj',
    href: '/tube/leftgoodgame',
    favorite: true,
  },
  {
    name: '나뭇잎마을 대장',
    src: 'https://yt3.googleusercontent.com/ytc/APkrFKbrdBq1AJemr-HwXj8yPPvuDjXGgGLR8mZHliDf=s176-c-k-c0x00ffffff-no-rj',
    href: '/tube/leftgoodgame',
    favorite: true,
  },
  {
    name: '우치하 간달프',
    src: 'https://yt3.googleusercontent.com/RvzoemxjwrrPC_MNd2jy1fb6qEpsdpao1EVgDpP-ZOjx1CQchWqznXj8W0b6b4aFZvj92436=s176-c-k-c0x00ffffff-no-rj',
    href: '/tube/leftgoodgame',
    favorite: true,
  },
];

export const resourceMenuItem = [
  {
    name: 'about-tube',
    icon: VideoIcon,
    href: '/about',
  },
  {
    name: 'help',
    icon: EnvelopeOpenIcon,
    href: '/help',
  },
  {
    name: 'policies-terms',
    icon: IdCardIcon,
    href: '/policies-agreements',
  },
];

export const languages = [
  {
    name: '한국어',
    locale: 'ko-KR',
    src: 'https://flagcdn.com/kr.svg',
  },
  {
    name: 'English',
    locale: 'en-US',
    src: 'https://flagcdn.com/us.svg',
  },
  {
    name: '日本語',
    locale: 'ja-JP',
    src: 'https://flagcdn.com/jp.svg',
  },
  {
    name: '中国话',
    value: 'chinese',
    locale: 'zh-TW',
    src: 'https://flagcdn.com/cn.svg',
  },
  {
    name: 'Español',
    locale: 'es-ES',
    src: 'https://flagcdn.com/es.svg',
  },
];

export const communityCategory = [
  { code: 'MOVIE' },
  { code: 'CAR' },
  { code: 'MUSIC' },
  { code: 'ANIMAL' },
  { code: 'SPORTS' },
  { code: 'TRAVEL' },
  { code: 'GAME' },
  { code: 'BLOG' },
  { code: 'COMEDY' },
  { code: 'ENTERTAINMENT' },
  { code: 'NEWS' },
  { code: 'STYLE' },
  { code: 'EDUCATION' },
  { code: 'SCIENCE' },
];
