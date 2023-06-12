import React from 'react';
import styled from '@emotion/styled';
import ShareButton from '/src/components/ShareButton';

const StyledShareButton = styled(ShareButton)`
  background-color: #4CC764;
`;

export default (props) => (
  <StyledShareButton {...props} />
);
