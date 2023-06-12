import React from 'react';
import styled from '@emotion/styled';
import ShareButton from '/src/components/ShareButton';

const StyledShareButton = styled(ShareButton)`
  background-color: #FF5F00;
`;

export default (props) => (
  <StyledShareButton {...props} />
);
