import React from 'react';
import styled from '@emotion/styled';
import ShareButton from '/src/components/ShareButton';

const StyledShareButton = styled(ShareButton)`
  background: url('/images/line@3x.png') no-repeat center center #4CC764;
  background-size: 20px 20px;
`;

export default (props) => (
  <StyledShareButton {...props} />
);
