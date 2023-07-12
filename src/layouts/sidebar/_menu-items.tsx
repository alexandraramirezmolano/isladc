import routes from '@/config/routes';
import { HomeIcon } from '@/components/icons/home';
import { FarmIcon } from '@/components/icons/farm';
import { PoolIcon } from '@/components/icons/pool';
import { ProfileIcon } from '@/components/icons/profile';
import { DiskIcon } from '@/components/icons/disk';
import { ExchangeIcon } from '@/components/icons/exchange';
import { VoteIcon } from '@/components/icons/vote-icon';
import { PlusCircle } from '@/components/icons/plus-circle';
import { CompassIcon } from '@/components/icons/compass';
import { LivePricing } from '@/components/icons/live-pricing';

import { Academy } from '@/components/icons/academy';
import { SocialMedia } from '@/components/icons/socialmedia';
import { FAQ } from '@/components/icons/faq';
import { Community } from '@/components/icons/community';

export const menuItems = [
  {
    name: 'Portafolio',
    icon: <HomeIcon />,
    href: routes.portafolio,
  },
  {
    name: 'Invertir',
    icon: <CompassIcon />,
    href: routes.search,
  },
  /*{
    name: 'Live Pricing',
    icon: <LivePricing />,
    href: routes.portafolio,
  },*/
  /*{
    name: 'Depositar',
    icon: <PoolIcon />,
    href: routes.depositar,
  },
  {
    name: 'Pedir prestado',
    icon: <ExchangeIcon />,
    href: routes.pedir,
  },*/
  {
    name: 'Academia',
    icon: <Academy />,
    href: 'https://www.tiktok.com/@isladc_',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    name: 'Comunidad',
    icon: <Community />,
    href: 'https://t.me/+OVBoBLgAyd9iNWRh',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    name: 'Red Social',
    icon: <SocialMedia />,
    href: 'https://twitter.com/isladc_',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    name: 'FAQ',
    icon: <FAQ />,
    href: '',
    target: '',
    rel: 'noopener noreferrer',
  },
  /* {
    name: 'NFT Details',
    icon: <DiskIcon />,
    href: routes.nftDetails,
  }  */
  /*{
    name: 'Farm',
    icon: <FarmIcon />,
    href: routes.farms,
  },*/
  /*  dropdownItems: [
      {
        name: 'Explore NFTs',
        icon: <CompassIcon />,
        href: routes.search,
      },
      {
        name: 'Create NFT',
        icon: <PlusCircle />,
        href: routes.createNft,
      },
      {
        name: 'NFT Details',
        icon: <DiskIcon />,
        href: routes.nftDetails,
      },
    ],
  },*/

  /*{
    name: 'Profile',
    icon: <ProfileIcon />,
    href: routes.profile,
  },
  {
    name: 'Vote',
    icon: <VoteIcon />,
    href: routes.vote,
    dropdownItems: [
      {
        name: 'Explore',
        href: routes.vote,
      },
      {
        name: 'Vote with pools',
        href: routes.proposals,
      },
      {
        name: 'Create proposal',
        href: routes.createProposal,
      },
    ],
  },*/
];
