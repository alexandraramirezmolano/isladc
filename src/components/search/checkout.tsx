import {
  onOpenCheckout,
  onChangeQuantity,
  onChangePurchaseValue,
} from '@/app/features/ui.slice';
import { TransferNft } from './transferNft';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { ThirdwebSDK } from '@thirdweb-dev/sdk/evm';
import { useContext, useEffect, useState } from 'react';
import { Mumbai } from '@thirdweb-dev/chains';

export const Checkout = () => {
  const dispatch = useDispatch();
  const { singleListing, purchaseValue } = useSelector(
    (state: RootState) => state.UI
  );

  const [listNfts, setListNfts] = useState({});

  const getNfts = async () => {
    const sdk = ThirdwebSDK.fromPrivateKey(
      'df96eec926afcb5efd766af42d6732e897f4068bd85835ddcb1fcadd422837ae',
      'mumbai'
    );
    const contract = await sdk.getContract(
      singleListing?.assetContractAddress ||
        '0x0c902Fdc0e167Ea09d615352CCb53F972FA95085'
    );
    const nfts = await contract.erc1155.getAll();
    setListNfts(nfts);
  };

  useEffect(() => {
    getNfts();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className="rounded-lg bg-white p-6 shadow-lg"
        style={{ width: '400px', height: '380px' }}
      >
        <div className="flex justify-end">
          <button
            onClick={() => [
              dispatch(onOpenCheckout(false)),
              dispatch(onChangeQuantity(0)),
              dispatch(onChangePurchaseValue(0)),
            ]}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-dark text-white hover:bg-gray-700 focus:outline-none"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <h2 className="mb-4 text-xl font-bold">{singleListing?.asset.name}</h2>

        <div className="mb-4 flex grid grid-cols-2 gap-4">
          <label className="mr-2 font-bold text-dark">Cantidad:</label>
          <input
            type="number"
            onChange={(e) => [
              dispatch(onChangeQuantity(Number(e.target.value))),
              dispatch(
                onChangePurchaseValue(
                  Number(
                    Number(e.target.value) *
                      Number(singleListing?.currencyValuePerToken.displayValue)
                  )
                )
              ),
            ]}
            className="appearance-none rounded border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand"
            min={1}
            max={singleListing?.quantity}
            placeholder={`max ... ${singleListing?.quantity}`}
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <label className="font-bold text-dark">Precio por unidad</label>
          <p className=" px-2 py-1">
            $ {singleListing?.currencyValuePerToken.displayValue}{' '}
            {singleListing?.currencyValuePerToken.name}
          </p>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <label className="font-bold text-dark">Precio total </label>
          <p className=" px-2 py-1">
            $ {purchaseValue} {singleListing?.currencyValuePerToken.name}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1">
          <TransferNft />
        </div>
      </div>
    </div>
  );
};
