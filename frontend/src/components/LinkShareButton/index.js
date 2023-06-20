import React from 'react';
import styled from '@emotion/styled';
import ShareButton from '/src/components/ShareButton';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const StyledShareButton = styled(ShareButton)`
  background: url('/images/link@3x.png') no-repeat center center #FF5F00;
  background-size: 19px 20px;
`;

export default ({ url, onClick, onCopy, ...props }) => (
  <CopyToClipboard text={url} onClick={onClick} onCopy={onCopy}>
    <StyledShareButton {...props} />
  </CopyToClipboard>
);
