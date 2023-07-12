import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DirectListingV3 } from '@thirdweb-dev/sdk/evm';
import { Chain } from '@thirdweb-dev/react';
import { json } from 'stream/consumers';

export interface MarketplaceContext {
  step: stepEnum;
  listings: any[];
  singleListing: DirectListingV3 | null;
  selectedListing: number | null;
  walletAddress: string | null;
  mainnet: boolean | null;
  chain: number | null;
  chainName: string | null;
  coinsOwned: any[];
  quantity: number | 1;
  purchaseValue: number | null;
  projectAddress: string | null;
  project: any[] | null;
  checkoutOpen: boolean | null;
  nftsOwned: any[];
  balance: string;
  wallet: walletEnum;
}

export enum stepEnum {
  START = 'START',
  CONTINUE = 'CONTINUE',
  CHECKOUTOPEN = 'CHECKOUTOPEN',
  CANCEL = 'CANCEL',
}

export enum walletEnum {
  OFF = 'OFF',
  BRAVE = 'BRAVE',
  METAMASK = 'METAMASK',
  WALLETCONNECT = 'WALLETCONNECT',
}

const initialState: MarketplaceContext = {
  step: stepEnum.START,
  listings: [],
  singleListing: null,
  selectedListing: null,
  walletAddress: null,
  mainnet: false,
  chain: null,
  chainName: null,
  coinsOwned: [],
  quantity: 1,
  purchaseValue: 0,
  projectAddress: null,
  project: null,
  checkoutOpen: false,
  nftsOwned: [],
  balance: '',
  wallet: walletEnum.OFF,
};

export const uiSlice = createSlice({
  name: 'IslaDC Marketplace',
  initialState,
  reducers: {
    onChangeStep: (state, action: PayloadAction<stepEnum>) => {
      state.step = action.payload;
    },
    onGetWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload;
    },
    onGetChain: (state, action: PayloadAction<number>) => {
      state.chain = action.payload;
    },
    onGetChainName: (state, action: PayloadAction<string>) => {
      state.chainName = action.payload;
    },
    onGetListing: (state, action: PayloadAction<any[]>) => {
      state.listings = action.payload;
    },
    onSelectedListing: (state, action: PayloadAction<number>) => {
      state.selectedListing = action.payload;
    },
    onChangeQuantity: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload;
    },
    onChangePurchaseValue: (state, action: PayloadAction<number>) => {
      state.purchaseValue = action.payload;
    },
    onSingleListing: (state, action: PayloadAction<DirectListingV3>) => {
      state.singleListing = action.payload;
    },
    onGetCoinsOwned: (state, action: PayloadAction<any[]>) => {
      state.coinsOwned = action.payload;
    },
    onGetProject: (state, action: PayloadAction<any[]>) => {
      state.project = action.payload;
    },
    onGetProjectAddress: (state, action: PayloadAction<string>) => {
      state.projectAddress = action.payload;
    },
    onOpenCheckout: (state, action: PayloadAction<boolean>) => {
      state.checkoutOpen = action.payload;
    },
    onGetNftsOwned: (state, action: PayloadAction<any[]>) => {
      state.nftsOwned = action.payload;
    },
    onGetBalance: (state, action: PayloadAction<string>) => {
      state.balance = action.payload;
    },
    onGetWallet: (state, action: PayloadAction<walletEnum>) => {
      state.wallet = action.payload;
    },
  },
});

export const {
  onChangeStep,
  onGetWalletAddress,
  onGetChain,
  onGetChainName,
  onGetListing,
  onSelectedListing,
  onSingleListing,
  onGetCoinsOwned,
  onChangePurchaseValue,
  onChangeQuantity,
  onGetProject,
  onGetProjectAddress,
  onOpenCheckout,
  onGetNftsOwned,
  onGetBalance,
  onGetWallet,
} = uiSlice.actions;
