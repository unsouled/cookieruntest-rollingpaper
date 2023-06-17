import React from 'react';
import styled from '@emotion/styled';
import ShareButton from '/src/components/ShareButton';
import { StaticImage } from 'gatsby-plugin-image';

const StyledShareButton = styled(ShareButton)`
  background: url('/images/wechat@3x.png') no-repeat center center #2DC100;
  background-size: 21px 18px;
`;

export default (props) => (
  <StyledShareButton {...props} />
);
