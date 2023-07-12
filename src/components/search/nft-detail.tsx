import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { ThirdwebSDK } from '@thirdweb-dev/sdk/evm';
import { useEffect, useState } from 'react';
import Logo from './../ui/logo-icon';
import {
  onSingleListing,
  onGetProject,
  onGetProjectAddress,
} from '@/app/features/ui.slice';
import NFTDetailCard from '@/components/search/nft-detail-card';
import { Mumbai } from '@thirdweb-dev/chains';

export const NftDetail = () => {
  const dispatch = useDispatch();
  const { selectedListing } = useSelector((state: RootState) => state.UI);

  const [isLoading, setIsLoading] = useState(true);

  const initializeSDK = async (): Promise<void> => {
    try {
      const sdk = new ThirdwebSDK(Mumbai);
      const contract = await sdk.getContract(
        process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS
      );
      if (selectedListing !== null) {
        const listing = await contract.directListings.getListing(
          selectedListing
        );
        dispatch(onSingleListing(listing));
        dispatch(onGetProjectAddress(listing.assetContractAddress));
      }
      setIsLoading(false);
    } catch (error) {
      console.log('Error initializing SDK:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeSDK();
  }, []);

  return (
    <>
      <NFTDetailCard />
    </>
  );
};
