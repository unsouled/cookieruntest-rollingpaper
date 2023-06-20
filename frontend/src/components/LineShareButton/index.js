import React from 'react';
import styled from '@emotion/styled';
import ShareButton from '/src/components/ShareButton';

const StyledShareButton = styled(ShareButton)`
  background: url('/images/line@3x.png') no-repeat center center #4CC764;
  background-size: 20px 20px;
`;

export default ({ url, onClick, ...props }) => {
  const openShareWindow = (e) => {
    onClick(e);
    window.open(`https://social-plugins.line.me/lineit/share?url=${url}`, '_blank', 'toolbar=no,location=no,status=no,menubar=no,width=500,height=600');
  };

  return (
    <StyledShareButton onClick={openShareWindow} {...props} />
  );
}
