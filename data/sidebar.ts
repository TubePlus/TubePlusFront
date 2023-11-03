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
    name: 'Home',
    icon: HomeIcon,
    href: '/',
  },
  {
    name: 'Community',
    icon: GlobeIcon,
    href: '/community',
  },
];

export const profileMemusStatic = [
  {
    name: 'User Agreements',
    icon: PersonIcon,
    href: '/user-agreements',
  },
  {
    name: 'Privacy Policy',
    icon: IdCardIcon,
    href: '/privacy-policy',
  },
];

export const subscribeMenuItem = [
  {
    name: '조빵일',
    src: 'https://avatars.githubusercontent.com/u/122770896?v=4',
    href: '/community/young1ll',
  },
  {
    name: '짐짝맨',
    src: 'https://yt3.ggpht.com/C7bTHnoo1S_MRbJXn4VwncNpB87C2aioJC_sKvgM-CGw_xgdxwiz0EFEqzj0SRVz6An2h81T4Q=s68-c-k-c0x00ffffff-no-rj',
    href: '/community/jimjjackman',
  },
  {
    name: '당신이 알았던 이야기',
    src: 'https://yt3.ggpht.com/ytc/APkrFKYwpvzECeLqP488RVUntxR4QDMdOIHJYTwQGnhm=s68-c-k-c0x00ffffff-no-rj',
    href: '/community/youknowstory',
  },
  {
    name: '좌왁굳의 게임방송',
    src: 'https://yt3.ggpht.com/TfNiEYiPS4wX6BWXerod80xL3pB8RvRLHiEDiPTPo1ZOIsgYivENAGTu2Sax_YJ-8g9SCHtvFw=s68-c-k-c0x00ffffff-no-rj',
    href: '/community/leftgoodgame',
  },
];

export const resourceMenuItem = [
  {
    name: 'About TubePlus',
    icon: VideoIcon,
    href: '/about',
  },
  {
    name: 'Help',
    icon: EnvelopeOpenIcon,
    href: '/help',
  },
  {
    name: 'Policies and Agreements',
    icon: IdCardIcon,
    href: '/policies-agreements',
  },
];

export const languages = [
  {
    name: '한국어',
  },
  {
    name: 'English',
  },
  {
    name: '日本語',
  },
  {
    name: '中国话',
  },
  {
    name: 'Español',
  },
];
