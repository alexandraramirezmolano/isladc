import {
  onChangeStep,
  onOpenCheckout,
  stepEnum,
} from '@/app/features/ui.slice';
import { Checkout } from './checkout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useEffect, useState } from 'react';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { Mumbai } from '@thirdweb-dev/chains';
import { ethers } from 'ethers';
import Button from '@/components/ui/button';
import { OptionIcon } from '@/components/icons/option';
import { useAddress } from '@thirdweb-dev/react';

export default function NFTDetailCard() {
  const dispatch = useDispatch();
  const { singleListing, checkoutOpen, step } = useSelector(
    (state: RootState) => state.UI
  );

  const walletAddress = useAddress();
  const [nftsOwned, setNftsOwned] = useState(0);

  const getNftsOwned = async () => {
    // Address of the wallet to check NFT balance
    const sdk = new ThirdwebSDK(Mumbai);
    const contract = await sdk.getContract(
      singleListing?.assetContractAddress ||
        '0xf990dec2c6C1A48ad50F6eb92155cd811B4575e9'
    );

    const balance = await contract.erc1155.getOwned(
      walletAddress || '0xcb6193a5D6135b327D95669BC4779baDb70c29F1'
    );
    const owned = await balance[0].quantityOwned;
    if (Number(owned) > 0) {
      setNftsOwned(Number(owned));
    }
  };

  useEffect(() => {
    getNftsOwned();
  });

  return (
    <section className="body-font overflow-hidden text-gray-600">
      <div className="container mx-auto px-5 py-24">
        <div className="">
          <Button
            shape="rounded"
            size="small"
            variant="ghost"
            color="gray"
            className="!h-11 !p-3 hover:!translate-y-0 hover:!shadow-none focus:!translate-y-0 focus:!shadow-none bg-dark"
          >
            <OptionIcon className="relative h-auto w-[18px]" />
          </Button>
        </div>
        <div className="mx-auto flex flex-wrap lg:w-4/5">
          <img
            src={singleListing?.asset.image || ''}
            className="rounded object-cover object-center mt-6"
            alt={singleListing?.asset.name || ''}
            style={{
              maxWidth: '490px',
              maxHeight: '560px',
              minWidth: '390px',
              minHeight: '460px',
            }}
          />

          <div className=" w-full lg:mt-0 lg:w-1/3 lg:py-6 lg:pl-10">
            {/*<div className="float-right mt-2 mb-4">
              <button
                onClick={() => dispatch(onChangeStep(stepEnum.START))}
                className="rounded-full bg-dark text-white shadow-md hover:bg-gray-700 text-white p-2 mt-4"
              >
                Volver al Marketplace
              </button>
            </div>*/}

            <div className="w-full">
              <h1 className="title-font mb-1 text-3xl font-medium text-gray-900 sm:mt-6 ">
                {singleListing?.asset.name}
              </h1>
              <p className="text-gray-800 text-medium">
                {singleListing?.asset.description}
              </p>
            </div>

            <div className="mb-4 mt-2 grid grid-cols-2 gap-4 text-md text-dark">
              <p>Tokens disponibles:</p>
              <p>{singleListing?.quantity}</p>
              <p>Tipo de contrato:</p>
              <p>ERC-1155</p>
              <p>Ver en Etherscan:</p>
              <p>
                <a
                  className="title-font text-medium mb-1  text-dark "
                  href={`https://Mumbai.polygonscan.com/address/${singleListing?.assetContractAddress}`}
                  target="_blank"
                >
                  {singleListing?.assetContractAddress.slice(0, 17)}
                </a>
              </p>
              <p>Tokens en propiedad:</p>
              <p>{nftsOwned}</p>
              <p>Precio unitario:</p>
              <p>$ {singleListing?.currencyValuePerToken.displayValue} Matic</p>
            </div>

            <div className="flex w-full flex-row justify-center">
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
          </div>
        </div>
      </div>
    </section>
  );
}
