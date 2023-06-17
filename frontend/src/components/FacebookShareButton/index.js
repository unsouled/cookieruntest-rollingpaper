import React from 'react';
import styled from '@emotion/styled';
import ShareButton from '/src/components/ShareButton';
import { StaticImage } from 'gatsby-plugin-image';

const StyledShareButton = styled(ShareButton)`
  background: url('/images/facebook@3x.png') no-repeat center center #1877F2;
  background-size: 9px 18px;
`;

export default (props) => (
  <StyledShareButton {...props} />
);
