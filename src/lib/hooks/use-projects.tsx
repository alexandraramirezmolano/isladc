import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { ethers } from 'ethers';
import { ThirdwebSDK } from '@thirdweb-dev/sdk/evm';
import { Mumbai } from '@thirdweb-dev/chains';

export interface SDKContextValue {
  list: any[]; // Use the 'any' type for the list
}

export const SDKContext = createContext<SDKContextValue | undefined>(undefined);

export const SDKProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [list, setList] = useState<any>([]); // Use the 'any' type for the list

  const initializeSDK = async (): Promise<void> => {
    const privateKey = '0xADe8C8680e0d795c2AAe510D5077d638228F6476';
    const sdk = ThirdwebSDK.fromPrivateKey(
      'df96eec926afcb5efd766af42d6732e897f4068bd85835ddcb1fcadd422837ae',
      Mumbai
    );
    const contract = await sdk.getContract(
      '0x014Ed2220C85ACC979C30E347F2003C9faab29dD'
    );
    const listings = await contract.directListings.getAll();

    setList(listings);
  };

  useEffect(() => {
    initializeSDK();
  }, []);

  const contextValue: SDKContextValue = {
    list,
  };

  return (
    <SDKContext.Provider value={contextValue}>{children}</SDKContext.Provider>
  );
};

export const useSDK = (): SDKContextValue => {
  const context = React.useContext(SDKContext);
  if (!context) {
    throw new Error('useSDK must be used within an SDKProvider');
  }
  return context;
};
