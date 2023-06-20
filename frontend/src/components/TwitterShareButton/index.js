import React from 'react';
import styled from '@emotion/styled';
import ShareButton from '/src/components/ShareButton';
import { TwitterShareButton } from "react-share";

const StyledShareButton = styled(ShareButton)`
  background: url('/images/twitter@3x.png') no-repeat center center #2AA3EF;
  background-size: 18px 14px;
`;

export default ({ url, onClick, ...props }) => (
  <TwitterShareButton url={url} onClick={onClick}>
    <StyledShareButton {...props} />
  </TwitterShareButton>
);
