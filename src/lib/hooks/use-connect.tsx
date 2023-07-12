/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, createContext, ReactNode } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import {
  onGetChain,
  onGetWalletAddress,
  onGetChainName,
  onGetCoinsOwned,
  onGetNftsOwned,
  onGetBalance,
  onChangeSigner,
} from '@/app/features/ui.slice';
import axios from 'axios';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { Mumbai } from '@thirdweb-dev/chains';
import { forEach } from 'lodash';

const web3modalStorageKey = 'WEB3_CONNECT_CACHED_PROVIDER';

export const WalletContext = createContext<any>({});
const EXTRADATA = [{}];
const NftsOwnedByAddress = [{}];

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const web3Modal =
    typeof window !== 'undefined' && new Web3Modal({ cacheProvider: true });
  const dispatch = useDispatch();
  const { walletAddress, chainName, chain, nftsOwned } = useSelector(
    (state: RootState) => state.UI
  );
  /* This effect will fetch wallet address if user has already connected his/her wallet */

  const useAssets = async () => {
    // Define the baseURL based on chainName
    const baseURL =
      'https://polygon-Mumbai.g.alchemy.com/v2/qg82ocbBhqeF4CalJF9ZHHAFLn7SdK1U';

    const data = JSON.stringify({
      jsonrpc: '2.0',
      method: 'alchemy_getTokenBalances',
      headers: {
        'Content-Type': 'application/json',
      },
      params: [`${walletAddress || ''}`],
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
      response = response.data;

      const balances = response.result;

      const nonZeroNonEthBalances = balances.tokenBalances.filter(
        (token: { tokenBalance: string; contractAddress: string }) =>
          //token.tokenBalance !== '0' &&
          token.contractAddress.toLowerCase() !==
          '0x0000000000000000000000000000000000000000'
      );

      let i = 1;

      for (let token of nonZeroNonEthBalances) {
        let balance = token.tokenBalance;
        const decimals = 18;
        const balanceFloat = parseFloat(balance);
        const balanceReadable = (balanceFloat / Math.pow(10, decimals)).toFixed(
          2
        );

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

        metadata.data.result.balance = balanceReadable;

        EXTRADATA.push(metadata.data.result);
      }
    } catch (error) {
      console.error('Error fetching token balances:', error);
    }
  };

  useEffect(() => {
    async function checkConnection() {
      try {
        if (window && window.ethereum) {
          // Check if web3modal wallet connection is available on storage
          if (localStorage.getItem(web3modalStorageKey)) {
            const cachedProvider = localStorage.getItem(web3modalStorageKey);
            switch (cachedProvider) {
              case 'metamask':
                await connectToMetamask();
                break;
              case 'walletconnect':
                await connectToWalletConnect();
                break;
              case 'bravewallet':
                await connectToBraveWallet();
                break;
              default:
                console.log('Unsupported wallet provider');
            }
          }
        } else {
          console.log('window or window.ethereum is not available');
        }
      } catch (error) {
        console.log(error, 'Error de captura La cuenta no está conectada');
      }
    }
    checkConnection();
    GetNftsOwnedByWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBalance = async (provider: any, walletAddress: string) => {
    const walletBalance = await provider.getBalance(walletAddress);
    const balanceInEth = ethers.utils.formatEther(walletBalance);
    dispatch(onGetBalance(balanceInEth));
  };

  const setWalletAddress = async (provider: ethers.providers.Web3Provider) => {
    try {
      const signer = provider.getSigner();
      const networkId = provider.getNetwork();
      if (signer) {
        const web3Address = await signer.getAddress();
        dispatch(onGetWalletAddress(web3Address));
        dispatch(onGetChain((await networkId).chainId ?? 0));
        dispatch(onGetChainName((await networkId).name ?? null));
        setAddress(web3Address);
        getBalance(provider, web3Address);
        dispatch(onGetCoinsOwned(EXTRADATA));
      }
    } catch (error) {
      console.log(
        'Error while connecting the account from setWalletAddress function: ',
        error,
        'Look at the assets' + assets
      );
    }
  };

  const disconnectWallet = () => {
    dispatch(onGetWalletAddress(''));
    dispatch(onGetChain(0));
    dispatch(onGetChainName(''));
    dispatch(onGetCoinsOwned([]));
    dispatch(onGetNftsOwned([]));
    //dispatch(onChangeSigner());
    setAddress(undefined);
    dispatch(onGetBalance(''));
    setAssets([]);
    web3Modal && web3Modal.clearCachedProvider();
  };

  const checkIfExtensionIsAvailable = () => {
    if (
      (window && window.web3 === undefined) ||
      (window && window.ethereum === undefined)
    ) {
      setError(true);
      web3Modal && web3Modal.toggleModal();
    }
  };

  const connectToWallet = async () => {
    try {
      setLoading(true);
      checkIfExtensionIsAvailable();
      const connection = web3Modal && (await web3Modal.connect());
      const provider = new ethers.providers.Web3Provider(connection);
      await subscribeProvider(connection);

      setWalletAddress(provider);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(
        error,
        'obtuve este error en el bloque de captura connectToWallet al conectar la billetera'
      );
    }
  };
  const connectToMetamask = async () => {
    try {
      setLoading(true);
      checkIfExtensionIsAvailable();
      const connection = web3Modal && (await web3Modal.connect());
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      await subscribeProvider(connection);

      setWalletAddress(provider);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(
        error,
        'obtuve este error en el bloque de captura connectToMetamask al conectar la billetera'
      );
    }
  };

  const connectToWalletConnect = async () => {
    try {
      setLoading(true);

      const provider = new WalletConnectProvider({
        infuraId:
          'https://mainnet.infura.io/v3/08ef47690144477c8183f788b07c8f51', // Replace with your Infura Project ID
      });

      await provider.enable(); // Prompt user to connect their wallet

      const web3Provider = new ethers.providers.Web3Provider(provider);
      await subscribeProvider(web3Provider);

      const signer = web3Provider.getSigner();

      const walletAddress = await signer.getAddress();

      setWalletAddress(web3Provider);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(
        error,
        'obtuve este error en el bloque de captura connectToWalletConnect al conectar la billetera'
      );
    }
  };
  const connectToBraveWallet = async () => {
    try {
      setLoading(true);

      if (window.ethereum && window.navigator.brave) {
        await window.ethereum.enable();
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);

        await subscribeProvider(web3Provider);

        const signer = web3Provider.getSigner();
        const walletAddress = await signer.getAddress();

        setWalletAddress(web3Provider);
        setLoading(false);
      } else {
        throw new Error('Brave Wallet not detected');
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(
        error,
        'Error occurred in connectToBraveWallet while connecting to wallet'
      );
    }
  };

  const subscribeProvider = async (connection: any) => {
    connection.on('close', () => {
      disconnectWallet();
    });
    connection.on('accountsChanged', async (accounts: string[]) => {
      if (accounts?.length) {
        setAddress(accounts[0]);
        const provider = new ethers.providers.Web3Provider(connection);
        getBalance(provider, accounts[0]);
      } else {
        disconnectWallet();
      }
    });
  };

  const GetNftsOwnedByWallet = async () => {};

  return (
    <WalletContext.Provider
      value={{
        address,
        loading,
        assets,
        error,
        useAssets,
        GetNftsOwnedByWallet,
        connectToBraveWallet,
        connectToMetamask,
        connectToWalletConnect,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
