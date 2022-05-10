import React from 'react';
import styled from 'styled-components';
const Logo: React.FC = () => {
  return (
    <Wrapper
      width='105'
      height='30'
      viewBox='0 0 105 37'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_i_302_3)'>
        <path
          d='M31.7003 0.636363V37H24.2429L9.77202 16.0128H9.54119V37H0.752131V0.636363H8.31605L22.6271 21.5881H22.929V0.636363H31.7003ZM54.6806 15.4801V22.1562H37.8482V15.4801H54.6806ZM69.5998 0.636363V37H60.8107V0.636363H69.5998ZM73.9277 7.77415V0.636363H104.663V7.77415H93.6365V37H84.9718V7.77415H73.9277Z'
          fill='#04AD52'
        />
      </g>
      <defs>
        <filter
          id='filter0_i_302_3'
          x='0.751953'
          y='0.636719'
          width='103.91'
          height='40.3633'
          filterUnits='userSpaceOnUse'
          color-interpolation-filters='sRGB'
        >
          <feFlood flood-opacity='0' result='BackgroundImageFix' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='BackgroundImageFix'
            result='shape'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='4' />
          <feGaussianBlur stdDeviation='2' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
          />
          <feBlend
            mode='normal'
            in2='shape'
            result='effect1_innerShadow_302_3'
          />
        </filter>
      </defs>
    </Wrapper>
  );
};

const Wrapper = styled.svg`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default Logo;
