import { useDispatch, useSelector } from 'react-redux';
import { Marketplace } from './marketplace';
import { RootState } from '@/app/store';
import { onChangeStep, stepEnum } from '@/app/features/ui.slice';
import { NftDetail } from './nft-detail';
import { Checkout } from './checkout';
import { useEffect } from 'react';

export default function Feeds() {
  return (
    <>
      <div className="2xl:ltr:pl-8 2xl:rtl:pr-8 4xl:ltr:pl-10 4xl:rtl:pr-10">
        <Marketplace />
      </div>
    </>
  );
}
