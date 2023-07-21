import { StaticImageData } from 'next/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { ArrowLinkIcon } from '@/components/icons/arrow-link-icon';
import Avatar from '@/components/ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { ThirdwebSDK } from '@thirdweb-dev/sdk/evm';
import { useEffect, useState } from 'react';
import { onGetListing, onOpenCheckout } from '@/app/features/ui.slice';
import { Checkout } from '../search/checkout';
import { useAddress } from '@thirdweb-dev/react';
import CollapsibleSection from '@/components/nft/collapsible-section';
import DescriptionGrid from '@/components/nft/description-grid';
import { useModal } from '../modal-views/context';
import Button from '../ui/button';
import { Mumbai } from '@thirdweb-dev/chains';

type Avatar = {
  id: string | number;
  name: string;
  slug: string;
  logo: StaticImageData;
};
type NftDetailsProps = {
  isAuction?: boolean;
  image: StaticImageData;
  name: string;
  description: string;
  minted_date: string;
  minted_slug: string;
  price: number;
  creator: Avatar;
  collection: Avatar;
  owner: Avatar;
  block_chains: Avatar[];
};

export default function NftDetails() {
  const dispatch = useDispatch();

  const { openModal } = useModal();
  const { singleListing, checkoutOpen } = useSelector(
    (state: RootState) => state.UI
  );
  const walletAddress = useAddress();
  const [nftsOwned, setNftsOwned] = useState<number>(0);
  const [nftsQuantity, setNftsQuantity] = useState<number>(0);

  const initializeSDK = async (): Promise<void> => {
    try {
      const sdk = new ThirdwebSDK(Mumbai);
      const contract = await sdk.getContract(
        '0xADe8C8680e0d795c2AAe510D5077d638228F6476'
      );
      const listing = await contract.directListings.getListing(
        singleListing?.id || 0
      );
      setNftsQuantity(Number(listing.quantity));
    } catch (error) {
      console.log('Error initializing SDK:', error);
    }
  };

  const getNftsOwned = async (): Promise<void> => {
    try {
      const sdk = new ThirdwebSDK('mumbai');
      const contract = await sdk.getContract(
        singleListing?.assetContractAddress ||
          '0xf990dec2c6C1A48ad50F6eb92155cd811B4575e9'
      );
      const balance = await contract.erc1155.getOwned(
        walletAddress || '0xcb6193a5D6135b327D95669BC4779baDb70c29F1'
      );
      const owned = balance[0].quantityOwned;
      setNftsOwned(Number(owned));
    } catch (error) {
      console.error('Error getting NFTs owned', error);
      setNftsOwned(0);
    }
  };

  useEffect(() => {
    initializeSDK();
    getNftsOwned();
  });

  return (
    <div className="flex flex-grow">
      <div className="mx-auto flex w-full flex-grow flex-col transition-all xl:max-w-[1360px] 4xl:max-w-[1760px]">
        <div className="relative mb-5 flex flex-grow items-center justify-center md:pb-7 md:pt-4 ltr:md:left-0 ltr:md:pl-6 rtl:md:right-0 rtl:md:pr-6 lg:fixed lg:mb-0 lg:h-[calc(100%-96px)] lg:w-[calc(100%-492px)] ltr:lg:pl-8 rtl:lg:pr-8 xl:w-[calc(100%-550px)] ltr:xl:pl-[340px] ltr:xl:pr-12 rtl:xl:pl-12 rtl:xl:pr-[340px] ltr:2xl:pl-96 rtl:2xl:pr-96 3xl:w-[calc(100%-632px)] ltr:4xl:pl-0 rtl:4xl:pr-0">
          <div className="flex h-full max-h-full w-full items-center justify-center lg:max-w-[768px]">
            <div className="relative aspect-square max-h-full overflow-hidden rounded-lg">
              <img
                src={singleListing?.asset.image || ''}
                alt={'hi'}
                width={768}
                className="h-full bg-gray-200 dark:bg-light-dark"
              />
            </div>
          </div>
        </div>

        <div className="relative flex h-full w-full flex-col justify-between pt-10 ltr:md:ml-auto ltr:md:pl-8 rtl:md:mr-auto rtl:md:pr-8 lg:min-h-[calc(100vh-96px)] lg:w-[460px] ltr:lg:pl-12 rtl:lg:pr-12 xl:w-[592px] ltr:xl:pl-20 rtl:xl:pr-20">
          <div className="block">
            <div className="block">
              <div className="flex justify-between">
                <h2 className="text-xl font-medium leading-[1.45em] -tracking-wider text-gray-900 dark:text-white md:text-2xl xl:text-3xl">
                  {singleListing?.asset.name}
                </h2>
              </div>
              <AnchorLink
                href={`https://mumbai.polygonscan.com/address/${singleListing?.assetContractAddress}`}
                target="_blank"
                className="mt-1.5 inline-flex items-center text-sm -tracking-wider text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white xl:mt-2.5"
              >
                Ver en Etherscan {''}
                <ArrowLinkIcon className="h-3 w-3 ltr:ml-2 rtl:mr-2" />
              </AnchorLink>
              <div className="mt-4 flex flex-wrap gap-6 pt-0.5 lg:-mx-6 lg:mt-6 lg:gap-0">
                <div className="shrink-0 border-dashed border-gray-200 dark:border-gray-700 lg:px-6 lg:ltr:border-r lg:rtl:border-l"></div>
                <div className="lg:px-6">
                  <h3 className="mb-2.5  text-gray-900 dark:text-white">
                    {singleListing?.asset.description || ''}
                  </h3>
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-col pb-5 xl:mt-9">
              <div className="align-center grid grid-cols-3 gap-2 text-center">
                <DescriptionGrid
                  title={'Precio Unitario'}
                  text={
                    `$ ${singleListing?.currencyValuePerToken.displayValue} ${singleListing?.currencyValuePerToken.symbol}` ||
                    ''
                  }
                />
                <DescriptionGrid
                  title={'Tokens disponibles'}
                  text={`${nftsQuantity}`}
                />
                <DescriptionGrid title={'Tipo de contrato'} text={`ERC-1155`} />
                <DescriptionGrid
                  title={'Tokens en propiedad'}
                  text={`${nftsOwned}`}
                />
                <DescriptionGrid
                  title={'Marketcap'}
                  text={
                    `$  ${singleListing?.asset.attributes[3].value || ''} 
                    ${singleListing?.currencyValuePerToken.symbol}` || ''
                  }
                />
                <DescriptionGrid
                  title={'Ver en Etherscan'}
                  text={
                    <a
                      target="_blank"
                      href={`https://mumbai.polygonscan.com/address/${singleListing?.assetContractAddress}`}
                      className="text-gray-700"
                    >
                      Ver
                    </a>
                  }
                />
              </div>
            </div>
            <div className="mb-5 flex w-full flex-row justify-center">
              <button
                onClick={() => dispatch(onOpenCheckout(true))}
                className="ml-auto flex w-full justify-center rounded border-0 bg-brand p-2 px-6 py-2 font-medium text-black hover:bg-green-400 focus:outline-none"
              >
                Comprar
              </button>
            </div>

            {checkoutOpen && (
              <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-gray-500">
                <Checkout />
              </div>
            )}
            <CollapsibleSection
              title="Metodología"
              text={singleListing?.asset.description || ''}
            />
            <CollapsibleSection
              title="Mantenimiento"
              text={singleListing?.asset.description || ''}
            />
            <CollapsibleSection
              title="Fees"
              text={singleListing?.asset.description || ''}
            />
            <CollapsibleSection
              title="Riesgos"
              text={singleListing?.asset.description || ''}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
