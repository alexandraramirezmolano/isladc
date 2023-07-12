import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './features/ui.slice';
import { PortfolioSlice } from './features/portfolioMachine';

const store = configureStore({
  reducer: {
    UI: uiSlice.reducer,
    PORTFOLIO: PortfolioSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
