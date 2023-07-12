import Avatar from './avatar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import {
  onChangeStep,
  onSelectedListing,
  stepEnum,
} from '@/app/features/ui.slice';
import { Verified } from '../icons/verified';
import AnchorLink from './links/anchor-link';
import Image from '@/components/ui/image';
import routes from '@/config/routes';

type NFTGridProps = {
  nftKey: string;
  author: string;
  authorImage: any;
  image: string;
  name: string;
  min: string;
  cost: number;
  collection: string;
  price: string;
  state: string;
  revenue: string;
  marketcap: string;
  id: number;
};

export default function NFTGrid({
  nftKey,
  author,
  authorImage,
  image,
  name,
  min,
  cost,
  collection,
  price,
  state,
  revenue,
  marketcap,
  id,
}: NFTGridProps) {
  const dispatch = useDispatch();

  const { step } = useSelector((state: RootState) => state.UI);
  const goToNftDetail = (id: number) => {
    dispatch(onSelectedListing(id));
    //dispatch(onChangeStep(stepEnum.CONTINUE));
  };

  console.log(' image ', image.toString());

  return (
    <a
      href={`/nft-details/${collection}/${id.toString()}`}
      className="relative overflow-hidden rounded-lg bg-brand shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark"
      style={{ height: '450px' }}
    >
      <div className="p-4">
        <AnchorLink
          href={`/nft-details/${collection}/${id.toString()}`}
          className="flex items-center text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <Avatar
            image={authorImage}
            alt={name}
            size="sm"
            className="text-ellipsis ltr:mr-3 rtl:ml-3 dark:border-gray-500"
          />
          <span className="overflow-hidden text-ellipsis">IslaDC {name}</span>
        </AnchorLink>
      </div>
      <div className="relative block w-full">
        <img
          src={image}
          placeholder="blur"
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          alt={name}
        />
      </div>

      <div className="p-5">
        <div className="text-sm font-medium text-black dark:text-white">
          {name}
        </div>

        <div className="mt-1.5 flex">
          <div className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400">
            Estado : {state}
          </div>
        </div>

        <div className="mt-1.5 flex">
          <div className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400">
            Precio unitario : ${price} Matic
          </div>
        </div>

        <div className="mt-1.5 flex">
          <div className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400">
            Inversión mínima : ${min} USD
          </div>
        </div>

        <div className="mt-1.5 flex">
          <div className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400">
            Rentabilidad : ${revenue} %EA
          </div>
        </div>

        <div className="flex justify-center items-center p-2">
          <a
            href={`/nft-details/${collection}/${id.toString()}`}
            className="btn btn-large bg-white text-md text-gray-800 dark:text-gray-400 rounded-lg w-1/2 flex justify-center items-center"
            style={{ height: '2.5rem', textAlign: 'center' }}
          >
            Ver detalle
          </a>
        </div>
      </div>
    </a>
  );
}
