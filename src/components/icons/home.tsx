export const HomeIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="currentColor"
      {...props}
    >
      <defs>
        <filter
          id="alpha"
          width="100%"
          height="100%"
          x="0%"
          y="0%"
          filterUnits="objectBoundingBox"
        >
          <feColorMatrix
            in="SourceGraphic"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          ></feColorMatrix>
        </filter>
        <mask id="mask0">
          <g filter="url(#alpha)">
            <path fillOpacity="0.965" d="M0 0H18V18H0z"></path>
          </g>
        </mask>
        <clipPath id="clip1">
          <path d="M0 0H18V18H0z"></path>
        </clipPath>
        <g id="surface5" clipPath="url(#clip1)">
          <path
            fillRule="evenodd"
            d="M8.984 1.773c1.207.079 2.414.184 3.618.32a383.585 383.585 0 01-1.79 3.286c-.03.023-.054.02-.07-.02-.199-.402-.402-.8-.617-1.195A613.595 613.595 0 013.18 7.77c-.575.07-.836-.184-.79-.754a.687.687 0 01.266-.371 464.965 464.965 0 006.922-3.606 14.314 14.314 0 01-.594-1.266zm0 0"
          ></path>
        </g>
        <mask id="mask1">
          <g filter="url(#alpha)">
            <path fillOpacity="0.984" d="M0 0H18V18H0z"></path>
          </g>
        </mask>
        <clipPath id="clip2">
          <path d="M0 0H18V18H0z"></path>
        </clipPath>
        <g id="surface8" clipPath="url(#clip2)">
          <path
            fillRule="evenodd"
            d="M13.656 5.96c.485-.007.965 0 1.446.017a.685.685 0 01.472.406c.02 3.066.024 6.137.02 9.21h-2.43c-.004-3.062 0-6.12.02-9.179a.703.703 0 01.472-.453zm0 0"
          ></path>
        </g>
        <mask id="mask2">
          <g filter="url(#alpha)">
            <path fillOpacity="0.984" d="M0 0H18V18H0z"></path>
          </g>
        </mask>
        <clipPath id="clip3">
          <path d="M0 0H18V18H0z"></path>
        </clipPath>
        <g id="surface11" clipPath="url(#clip3)">
          <path
            fillRule="evenodd"
            d="M10.11 7.75c.503-.012 1.007.004 1.507.055.2.082.324.226.371.437.02 2.45.024 4.899.02 7.352h-2.43c-.004-2.477 0-4.95.02-7.422a.709.709 0 01.511-.422zm0 0"
          ></path>
        </g>
        <mask id="mask3">
          <g filter="url(#alpha)">
            <path fillOpacity="0.984" d="M0 0H18V18H0z"></path>
          </g>
        </mask>
        <clipPath id="clip4">
          <path d="M0 0H18V18H0z"></path>
        </clipPath>
        <g id="surface14" clipPath="url(#clip4)">
          <path
            fillRule="evenodd"
            d="M6.383 9.578c.539-.004 1.078 0 1.617.02.168.078.29.199.367.37.016 1.872.024 3.747.016 5.626H5.96c-.008-1.856 0-3.707.016-5.555a.631.631 0 01.406-.46zm0 0"
          ></path>
        </g>
        <mask id="mask4">
          <g filter="url(#alpha)">
            <path fillOpacity="0.984" d="M0 0H18V18H0z"></path>
          </g>
        </mask>
        <clipPath id="clip5">
          <path d="M0 0H18V18H0z"></path>
        </clipPath>
        <g id="surface17" clipPath="url(#clip5)">
          <path
            fillRule="evenodd"
            d="M2.797 11.375c.527-.008 1.055 0 1.578.016.18.05.305.16.371.336.05 1.285.07 2.574.05 3.867H2.376c-.008-1.27 0-2.535.016-3.797a.653.653 0 01.406-.422zm0 0"
          ></path>
        </g>
      </defs>
      <g>
        <use mask="url(#mask0)" xlinkHref="#surface5"></use>
        <use mask="url(#mask1)" xlinkHref="#surface8"></use>
        <use mask="url(#mask2)" xlinkHref="#surface11"></use>
        <use mask="url(#mask3)" xlinkHref="#surface14"></use>
        <use mask="url(#mask4)" xlinkHref="#surface17"></use>
      </g>
    </svg>
  );
};
