import React from 'react';
import styled from '@emotion/styled';
import ShareButton from '/src/components/ShareButton';
import { StaticImage } from 'gatsby-plugin-image';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const StyledShareButton = styled(ShareButton)`
  background: url('/images/wechat@3x.png') no-repeat center center #2DC100;
  background-size: 21px 18px;
`;

export default ({ url, ...props }) => (
  <CopyToClipboard text={url} onCopy={() => {
    window.location.href = 'weixin://dl/chat';
  }}>
    <StyledShareButton {...props} />
  </CopyToClipboard>
);
