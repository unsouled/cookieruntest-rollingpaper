import React from 'react';
import styled from '@emotion/styled';
import ShareButton from '/src/components/ShareButton';
import { WeiboShareButton } from "react-share";

const StyledShareButton = styled(ShareButton)`
  background: url('/images/weibo@3x.png') no-repeat center center #fff;
  background-size: 19px 20px;
`;

export default ({ url, onClick, ...props }) => (
  <WeiboShareButton url={url} onClick={onClick}>
    <StyledShareButton {...props} />
  </WeiboShareButton>
);
