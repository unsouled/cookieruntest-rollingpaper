import React from 'react';
import styled from '@emotion/styled';
import ShareButton from '/src/components/ShareButton';

const StyledShareButton = styled(ShareButton)`
  background: url('/images/link@3x.png') no-repeat center center #FF5F00;
  background-size: 19px 20px;
`;

export default (props) => (
  <StyledShareButton {...props} />
);
