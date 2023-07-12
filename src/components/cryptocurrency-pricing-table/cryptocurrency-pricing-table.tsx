import React, { useEffect } from 'react';
import { Star } from '@/components/icons/star';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import CryptocurrencyDrawerTable from '@/components/cryptocurrency-pricing-table/cryptocurrency-drawer-table';

import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const axios = require('axios');

const COLUMNS = [
  //{
  //Header: () => <div class="px-1"></div>,
  //accessor: 'name',
  // @ts-ignore
  //Cell: ({ cell: { value } }) => (
  //  <div class="">
  //    <Star />
  //  </div>
  //),
  //minWidth: 20,
  //maxWidth: 20,
  //},
  {
    Header: '#Bloqueados',
    accessor: 'symbol',
    // @ts-ignore
    Cell: ({ cell: { value } }) => <div> </div>,
    minWidth: 30,
    maxWidth: 30,
  },
  {
    Header: 'Logo',
    accessor: 'logo',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div>
        <img
          src={
            value ??
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.wikipedia.org%2Fwiki%2F%24&psig=AOvVaw1ho4taO7lkx6wpNAGPSvKi&ust=1685488600974000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCMiqqLzUm_8CFQAAAAAdAAAAABAE'
          }
          style={{ width: '25px', height: '25px', objectFit: 'contain' }}
        ></img>
      </div>
    ),
    width: 30,
    height: 30,
  },
  {
    Header: () => <div className="">Activo</div>,
    accessor: 'name',
    // @ts-ignore
    Cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.image}
        <div className="ltr:text-left rtl:text-left">{row.original.name}</div>
      </div>
    ),
    minWidth: 90,
    maxWidth: 90,
  },
  {
    Header: () => <div className="">Precio</div>,
    accessor: 'balance',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltr:text-left rtl:text-left">${value}</div>
    ),
    minWidth: 40,
    maxWidth: 40,
  },
  /*{
    Header: () => <div className="">Interés EA</div>,
    accessor: 'price_change_percentage_1h_in_currency',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div
        className={`${
          Math.sign(value) === 1 ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {Math.sign(value) === 1 ? '+' : ''}
        {value}%
      </div>
    ),
    maxWidth: 40,
  },*/
  /*{
    Header: () => <div className="">Cantidad</div>,
    accessor: 'balance',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltr:text-left rtl:text-left">${value}</div>
    ),
    minWidth: 40,
    maxWidth: 40,
  },*/
];

export default function CryptocurrencyPricingTable() {
  const columns = React.useMemo(() => COLUMNS, []);
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();

  const { coinsOwned } = useSelector((state: RootState) => state.UI);

  return <CryptocurrencyDrawerTable columns={columns} data={coinsOwned} />;
}
