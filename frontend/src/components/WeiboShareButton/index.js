import React from 'react';
import styled from '@emotion/styled';
import ShareButton from '/src/components/ShareButton';
import { StaticImage } from 'gatsby-plugin-image';

const StyledShareButton = styled(ShareButton)`
  background: url('/images/weibo@3x.png') no-repeat center center #fff;
  background-size: 19px 20px;
`;

export default (props) => (
  <StyledShareButton {...props} />
);
