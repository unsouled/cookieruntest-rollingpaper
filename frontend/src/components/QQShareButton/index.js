import React from 'react';
import styled from '@emotion/styled';
import ShareButton from '/src/components/ShareButton';
import { StaticImage } from 'gatsby-plugin-image';

const StyledShareButton = styled(ShareButton)`
  background: url('/images/qq@3x.png') no-repeat center center #0A64FF;
  background-size: 14px 17px;
`;

export default (props) => (
  <StyledShareButton {...props} />
);
