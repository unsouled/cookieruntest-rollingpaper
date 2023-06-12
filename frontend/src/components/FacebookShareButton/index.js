import React from 'react';
import styled from '@emotion/styled';
import ShareButton from '/src/components/ShareButton';
import { StaticImage } from 'gatsby-plugin-image';

const StyledShareButton = styled(ShareButton)`
  background-color: #1877F2;
`;

export default (props) => (
  <StyledShareButton>
    <StaticImage 
      src="../../images/facebook.png" 
      srcSet="../../images/facebook@3x.png 3x, ../../images/facebook@2x.png 2x" 
    />
  </StyledShareButton>
);
