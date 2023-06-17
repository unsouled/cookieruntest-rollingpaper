import React from 'react';
import styled from '@emotion/styled';
import ShareButton from '/src/components/ShareButton';

const StyledShareButton = styled(ShareButton)`
  background: url('/images/twitter@3x.png') no-repeat center center #2AA3EF;
  background-size: 18px 14px;
`;

export default (props) => (
  <StyledShareButton {...props} />
);
