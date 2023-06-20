import React from 'react';
import styled from '@emotion/styled';
import ShareButton from '/src/components/ShareButton';
import { StaticImage } from 'gatsby-plugin-image';

const StyledShareButton = styled(ShareButton)`
  background: url('/images/qq@3x.png') no-repeat center center #0A64FF;
  background-size: 14px 17px;
`;

export default ({ url, onClick, ...props }) => {
  const openShareWindow = (e) => {
    onClick(e);
    window.open(`http://connect.qq.com/widget/shareqq/index.html?url=${url}`, '_blank', 'toolbar=no,location=no,status=no,menubar=no,width=500,height=600');
  };
    return (
      <StyledShareButton onClick={openShareWindow} {...props} />
    );
}
