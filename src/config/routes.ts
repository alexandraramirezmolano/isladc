const routes = {
  home: '/invest',
  minimal: '/minimal',
  portafolio: '/portfolio',
  retro: '/retro',
  pedir: '/borrow',
  depositar: '/deposit',
  liquidityPosition: '/liquidity-position',
  farms: '/farms',
  createNft: '/create-nft',
  nftDetails: (contractAddress: string, id: string) =>
    `/nft-details/${contractAddress.toLowerCase()}/${id}`,
  search: '/invest',
  notification: '/notifications',
  vote: '/vote',
  proposals: '/proposals',
  createProposal: '/proposals/create',
  charts: '/charts',
  profile: '/profile',
  //portfolio: '/profile?view=portfolio',
  history: '/profile?view=history',
  classic: '/classic',
  coinDetails: '/coin-details',
};

export default routes;
