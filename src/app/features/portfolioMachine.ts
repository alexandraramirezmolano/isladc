import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PortfolioContext {
  step: stepEnum;
  nft: any[];
}

export enum stepEnum {
  PORTFOLIOCURRENCIES = 'PORTFOLIOCURRENCIES',
  PORTFOLIONFTS = 'PORTFOLIONFTS',
}

const initialState: PortfolioContext = {
  step: stepEnum.PORTFOLIOCURRENCIES,
  nft: [],
};

export const PortfolioSlice = createSlice({
  name: 'IslaDC Portfolio',
  initialState,
  reducers: {
    onChangeStep: (state, action: PayloadAction<stepEnum>) => {
      state.step = action.payload;
    },
    onChangeNft: (state, action: PayloadAction<any[]>) => {
      state.nft = action.payload;
    },
  },
});

export const { onChangeStep, onChangeNft } = PortfolioSlice.actions;
