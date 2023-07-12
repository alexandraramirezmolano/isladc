import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { NextPageWithLayout } from '@/types';
import NftDetails from '@/components/nft/nft-details';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import MinimalNFTDetails from '@/components/nft/minimal-nft-details';
import RetroNFTDetails from '@/components/nft/retro-nft-details';
import ClassicNFTDetails from '@/components/nft/classic-nft-details';
import RootLayout from '@/layouts/_root-layout';
import { nftData } from '@/data/static/single-nft';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { onSingleListing } from '@/app/features/ui.slice';
import { Mumbai } from '@thirdweb-dev/chains';

export const NFTDetailsPage: NextPageWithLayout = () => {
  const { layout } = useLayout();
  const dispatch = useDispatch();
  const router = useRouter();
  const { contractAddress, id } = router.query as {
    contractAddress: string;
    id: string;
  };

  const sdkRef = useRef<ThirdwebSDK | null>(null);

  const initializeSDK = useCallback(async (): Promise<void> => {
    try {
      if (!sdkRef.current) {
        sdkRef.current = ThirdwebSDK.fromPrivateKey(
          'df96eec926afcb5efd766af42d6732e897f4068bd85835ddcb1fcadd422837ae',
          Mumbai
        );
      }

      const sdk = sdkRef.current;
      const contract = await sdk.getContract(
        process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS
      );
      const listing = await contract.directListings.getListing(id);
      dispatch(onSingleListing(listing));
      // console.log('id:', id, 'contractAddress:', contractAddress, 'listing' , listing);
    } catch (error) {
      console.log('Error initializing SDK:', error);
    }
  }, [dispatch, id]);

  useEffect(() => {
    initializeSDK();
    return () => {
      // Cleanup function to cancel pending requests/subscriptions if needed
    };
  }, [initializeSDK]);

  if (layout === LAYOUT_OPTIONS.MINIMAL) {
    return <MinimalNFTDetails product={nftData} />;
  }

  if (layout === LAYOUT_OPTIONS.RETRO) {
    return <RetroNFTDetails product={nftData} />;
  }

  if (layout === LAYOUT_OPTIONS.CLASSIC) {
    return <ClassicNFTDetails product={nftData} />;
  }

  return (
    <>
      <NextSeo
        title="NFT details"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <NftDetails />
    </>
  );
};

NFTDetailsPage.getLayout = function getLayout(page) {
  return <RootLayout contentClassName="!pb-0">{page}</RootLayout>;
};

export default NFTDetailsPage;
