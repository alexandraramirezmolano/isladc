import cn from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { onGetListing } from '@/app/features/ui.slice';
import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';
import { ThirdwebSDK } from '@thirdweb-dev/sdk/evm';
import { Mumbai } from '@thirdweb-dev/chains';
import NFTGrid from '@/components/ui/nft-card';
import Logo from '@/assets/images/logo-parrot.png';

export const Marketplace = () => {
  const { isGridCompact } = useGridSwitcher();
  const dispatch = useDispatch();
  const { listings } = useSelector((state: RootState) => state.UI);

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        const sdk = new ThirdwebSDK(Mumbai);
        const contract = await sdk.getContract(
          process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS
        );
        const fetchedListings = await contract.directListings.getAll();

        dispatch(onGetListing(fetchedListings));
      } catch (error) {
        console.log('Error initializing SDK:', error);
      }
    };

    initializeSDK();
  }, [dispatch]);

  return (
    <div>
      <div className="text-xl font-medium leading-[1.45em] -tracking-wider text-gray-900 dark:text-white md:text-2xl xl:text-3xl">
        Fondos donde invertir
      </div>
      <div
        className={cn(
          'grid gap-5 sm:grid-cols-2 md:grid-cols-3',
          isGridCompact
            ? '3xl:!grid-cols-4 4xl:!grid-cols-5'
            : '3xl:!grid-cols-3 4xl:!grid-cols-4'
        )}
      >
        {listings.map((nft) => (
          <NFTGrid
            key={nft.id}
            name={nft.asset.name}
            image={nft.asset.image}
            author={nft.asset.name}
            authorImage={Logo}
            price={nft.currencyValuePerToken.displayValue}
            collection={nft.assetContractAddress}
            state={nft.asset.attributes[0].value}
            min={nft.asset.attributes[1].value}
            revenue={nft.asset.attributes[2].value}
            marketcap={nft.asset.attributes[3].value}
            cost={nft.id}
            id={nft.id}
          />
        ))}
      </div>
    </div>
  );
};
