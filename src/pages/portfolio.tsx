import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { onChangeStep, stepEnum } from '@/app/features/portfolioMachine';
import { NextSeo } from 'next-seo';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import CryptocurrencyPricingTable from '@/components/cryptocurrency-pricing-table/cryptocurrency-pricing-table';
import CryptocurrencyPricingRetroTable from '@/components/cryptocurrency-pricing-table/cryptocurrency-pricing-retro-table';
import NftsOwnedTable from '@/components/cryptocurrency-pricing-table/nfts-owned-table';
import { useCoins } from '@/hooks/useCoin';
import { NextPageWithLayout } from '@/types';
import RootLayout from '@/layouts/_root-layout';
import { GetStaticProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { API_ENDPOINTS } from '@/data/utils/endpoints';
import client from '@/data/utils';
import { NATIVE_TOKENS, ThirdwebSDK } from '@thirdweb-dev/sdk';
import { Mumbai } from '@thirdweb-dev/chains';
import { useEffect, useState } from 'react';
import { onGetCoinsOwned, onGetNftsOwned } from '@/app/features/ui.slice';
import { ethers } from 'ethers';
import axios from 'axios';
import { useAddress, useBalance } from '@thirdweb-dev/react';
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';
import { UseQueryResult } from '@tanstack/react-query';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  try {
    await Promise.all([
      queryClient.prefetchQuery(
        [API_ENDPOINTS.SETTINGS, { language: locale }],
        ({ queryKey }) =>
          client.settings.all(queryKey[1] as SettingsQueryOptions)
      ),
      queryClient.prefetchInfiniteQuery(
        [API_ENDPOINTS.PRICING, { language: locale }],
        ({ queryKey }) => client.coins.all(queryKey[1] as CryptoQueryOptions)
      ),
    ]);
    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
      revalidate: 300, // In seconds
    };
  } catch (error) {
    //* if we get here, the product doesn't exist or something else went wrong
    return {
      notFound: true,
    };
  }
};

const LiveDemo: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const { step } = useSelector((state: RootState) => state.PORTFOLIO);
  const walletAddress = useAddress();
  const balance = useBalance(NATIVE_TOKEN_ADDRESS);

  const GetNftsOwnedByWallet = async () => {
    try {
      const sdk = new ThirdwebSDK(Mumbai);
      const contract = await sdk.getContract(
        '0xADe8C8680e0d795c2AAe510D5077d638228F6476' || ''
      );

      const listings = await contract.directListings.getAll();

      const ownedNFTs = [];
      for (const listing of listings) {
        const ListingContract = await sdk.getContract(
          listing.assetContractAddress
        );
        const balance = await ListingContract.erc1155.balanceOf(
          walletAddress || '',
          0
        );

        if (balance.toNumber() > 0) {
          const ownedNFT = {
            name: listing.asset.name,
            image: listing.asset.image,
            quantity: listing.quantity,
            price: listing.pricePerToken,
            listing: listing,
            quantityOwned: balance.toNumber(),
            polygonscan: `https://mumbai.polygonscan.com/address/${listing.assetContractAddress}`,
            totalPrice: (
              (balance.toNumber() * listing.pricePerToken) /
              Math.pow(10, 18)
            ).toFixed(2),
          };
          ownedNFTs.push(ownedNFT);
        }
      }
      if (ownedNFTs.length >= 1) {
        dispatch(onGetNftsOwned(ownedNFTs));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      dispatch(onGetNftsOwned([]));
    }
  };

  const UseAssets = async (
    balance: UseQueryResult<
      | {
          symbol: string;
          value: ethers.BigNumber;
          name: string;
          decimals: number;
          displayValue: string;
        }
      | undefined,
      unknown
    >
  ) => {
    const coins = [];
    const matic = {
      name: 'Matic',
      symbol: 'Matic',
      //balance: getMatic,
      balance: balance.data?.displayValue.slice(0, 7),
      logo: 'https://logowik.com/content/uploads/images/polygon-matic-icon3725.logowik.com.webp',
    };

    coins.push(matic);
    const baseURL =
      'https://polygon-mumbai.g.alchemy.com/v2/FI6foSUn6ZrENOgqxC5oFo_pj8qMaoar';

    const data = JSON.stringify({
      jsonrpc: '2.0',
      method: 'alchemy_getTokenBalances',
      headers: {
        'Content-Type': 'application/json',
      },
      params: [`${walletAddress}`],
      id: 80001,
    });

    const config = {
      method: 'post',
      url: baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    try {
      let response = await axios(config);

      const balances = response.data.result;
      const nonZeroBalances = await balances.tokenBalances.filter(
        (token: { tokenBalance: string }) => {
          return token.tokenBalance !== '0';
        }
      );

      for (let token of nonZeroBalances) {
        let balance = token.tokenBalance;
        const options = {
          method: 'POST',
          url: baseURL,
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
          },
          data: {
            id: 1,
            jsonrpc: '2.0',
            method: 'alchemy_getTokenMetadata',
            params: [token.contractAddress],
          },
        };

        const metadata = await axios.request(options);

        const decimals = 18;
        balance = balance / Math.pow(10, metadata.data.result.decimals);
        balance = balance.toFixed(2);

        const coindata = {
          name: metadata.data.result.name,
          symbol: metadata.data.result.symbol,
          balance: balance,
          logo: metadata.data.result.logo,
        };
        coins.push(coindata);
      }

      dispatch(onGetCoinsOwned(coins));
    } catch (error) {
      console.error('Error fetching token balances:', error);
      dispatch(onGetCoinsOwned([]));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await GetNftsOwnedByWallet();
      await UseAssets(balance);
    };
    fetchData();
  }, [walletAddress, balance]);

  return (
    <>
      <NextSeo
        title="Portafolio"
        description="IslaDC Cryptocurrency platform for everyone"
      />
      <div className="justify-left flex flex-row">
        <button
          onClick={() => dispatch(onChangeStep(stepEnum.PORTFOLIOCURRENCIES))}
          className={`${
            step === stepEnum.PORTFOLIOCURRENCIES ? 'bg-brand' : 'bg-white'
          } rounded-l-lg px-4 py-2 text-gray-700 hover:bg-gray-300 focus:outline-none`}
          style={{ width: '160px', height: '60px' }} // Add width and height styles
        >
          Criptomonedas
        </button>
        <button
          onClick={() => dispatch(onChangeStep(stepEnum.PORTFOLIONFTS))}
          className={`${
            step === stepEnum.PORTFOLIONFTS ? 'bg-brand' : 'bg-white'
          } rounded-r-lg px-4 py-2 text-gray-700 hover:bg-gray-300 focus:outline-none`}
          style={{ width: '160px', height: '60px' }} // Add width and height styles
        >
          Nfts
        </button>
      </div>
      {/*<LivePricingSlider limits={4} />*/}
      {step === stepEnum.PORTFOLIOCURRENCIES && <CryptocurrencyPricingTable />}
      {step === stepEnum.PORTFOLIONFTS && <NftsOwnedTable />}
    </>
  );
};

LiveDemo.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default LiveDemo;
