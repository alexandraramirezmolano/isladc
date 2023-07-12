import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '@/types';
import { Fira_Code } from 'next/font/google';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from 'react-query';
import ModalsContainer from '@/components/modal-views/container';
import DrawersContainer from '@/components/drawer-views/container';
import SettingsButton from '@/components/settings/settings-button';
import SettingsDrawer from '@/components/settings/settings-drawer';
import { WalletProvider } from '@/lib/hooks/use-connect';
import {
  ThirdwebProvider,
  ThirdwebSDKProvider,
  coinbaseWallet,
  metamaskWallet,
  walletConnect,
} from '@thirdweb-dev/react';

import 'overlayscrollbars/overlayscrollbars.css';
// base css file
import 'swiper/css';
import 'swiper/css/pagination';
import '@/assets/css/scrollbar.css';
import '@/assets/css/globals.css';
import '@/assets/css/range-slider.css';
import { useState, useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from '@/app/store';
import { Mumbai } from '@thirdweb-dev/chains';
import { ethers } from 'ethers';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}
function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());
  const signer = new ethers.Wallet(
    'df96eec926afcb5efd766af42d6732e897f4068bd85835ddcb1fcadd422837ae'
  );
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
            console.log('Service worker registered:', registration);
          })
          .catch((error) => {
            console.log('Service worker registration failed:', error);
          });
      });
    }
  }, []);

  // could remove this if you don't need page-level layout
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Provider store={store}>
        <Head>
          {/* maximum-scale 1 meta tag needed to prevent iOS input focus auto zooming */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
          <meta name="theme-color" content="#fff" />
          <link rel="manifest" href="manifest.json" />
          <noscript>
            <h3>Esta app necesita Javascript para funcionar</h3>
          </noscript>
          <title>IslaDC</title>
        </Head>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            enableSystem={false}
            defaultTheme="light"
          >
            <ThirdwebProvider
              activeChain={Mumbai}
              supportedChains={[Mumbai]}
              autoConnect={true}
              autoSwitch={true}
              supportedWallets={[
                walletConnect({
                  projectId: '0d30700acb4c306f17952ad56c0dd8a2',
                }),
                metamaskWallet(),
                coinbaseWallet(),
              ]}
              dAppMeta={{
                name: 'IslaDC',
                description: 'Crypto platform for everyone',
                logoUrl:
                  'https://magenta-loyal-alligator-451.mypinata.cloud/ipfs/QmTbCWi7aumKCaLyMGaDMoaPKQkMo79gNyU76StMEQnYYE?_gl=1*1ds7wqc*_ga*MTIwNjUyMjMxNy4xNjYwODI5NzQ0*_ga_5RMPXG14TE*MTY4ODU5NDUyMi42LjEuMTY4ODU5NDU1My4yOS4wLjA.',
                url: 'https://isladcmarketplace.vercel.app/',
                isDarkMode: true,
              }}
            >
              <WalletProvider>
                <div>
                  {getLayout(<Component {...pageProps} />)}
                  {/* <SettingsButton /> */}
                  {/* <SettingsDrawer /> */}
                  <ModalsContainer />
                  <DrawersContainer />
                </div>
              </WalletProvider>
            </ThirdwebProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default CustomApp;
