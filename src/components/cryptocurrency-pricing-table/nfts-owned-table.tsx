import React, { useEffect } from 'react';
import { Star } from '@/components/icons/star';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import NftDrawerTable from './nft-drawer-table';

const axios = require('axios');

const COLUMNS = [
  {
    Header: 'Nombre',
    accessor: 'name',
    // @ts-ignore
    Cell: ({ cell: { value } }) => <div> {value}</div>,
    minWidth: 80,
    maxWidth: 80,
  },
  {
    Header: 'Logo',
    accessor: 'image',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div>
        <img
          src={
            value ??
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.wikipedia.org%2Fwiki%2F%24&psig=AOvVaw1ho4taO7lkx6wpNAGPSvKi&ust=1685488600974000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCMiqqLzUm_8CFQAAAAAdAAAAABAE'
          }
          style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          alt={value}
        ></img>
      </div>
    ),
    width: 40,
    height: 40,
  },
  {
    Header: () => <div className="">Cantidad</div>,
    accessor: 'quantityOwned',
    // @ts-ignore
    Cell: ({ value }) => (
      <div className="flex items-center gap-2">
        <div className="ltr:text-left rtl:text-left">{value}</div>
      </div>
    ),
    minWidth: 40,
    maxWidth: 40,
  },
  {
    Header: () => <div className="">Precio Unitario</div>,
    accessor: 'price',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltr:text-left rtl:text-left">
        ${(value / Math.pow(10, 18)).toFixed(2)}
      </div>
    ),
    minWidth: 70,
    maxWidth: 70,
  },

  {
    Header: () => <div className="">Precio Total</div>,
    accessor: 'totalPrice',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltr:text-left rtl:text-left">$ {value} Matic</div>
    ),
    minWidth: 50,
    maxWidth: 50,
  },
  {
    Header: () => <div className="">Polygon Scan</div>,
    accessor: 'polygonscan',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="font-bold text-dark ltr:text-left rtl:text-left">
        <a href={value} target="_blank">
          Ver
        </a>
      </div>
    ),
    minWidth: 50,
    maxWidth: 50,
  },
];

export default function NftsOwnedTable() {
  const columns = React.useMemo(() => COLUMNS, []);
  const { nftsOwned } = useSelector((state: RootState) => state.UI);

  return <NftDrawerTable columns={columns} data={nftsOwned} />;
}
