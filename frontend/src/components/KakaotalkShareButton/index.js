import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import makeAsyncScriptLoader from 'react-async-script';
import ShareButton from '/src/components/ShareButton';

const StyledShareButton = styled(ShareButton)`
  background: url('/images/kakaotalk@3x.png') no-repeat center center #FEE500;
  background-size: 18px 18px;
`;

const scriptUrl = 'https://developers.kakao.com/sdk/js/kakao.min.js';
const KakaotalkShareButton = ({ onClick, isScriptLoaded, isScriptLoadSucceed, url, templateId, templateArgs, children, ...rest }) => {
  useEffect(() => {
    return () => {
      window.Kakao.cleanup();
    }
  }, []);
  return (
    <StyledShareButton style={{ border: 0, verticalAlign: 'top', padding: 0 }} onClick={(e) => {
      console.log(window.Kakao);
      console.log(process.env.GATSBY_KAKAO_KEY);
      window.Kakao.Link.sendScrap({
        requestUrl: url,
        templateId,
        templateArgs
      });
      onClick(e);
    }}>
      {children}
    </StyledShareButton>
  );
}

const Wrapper = makeAsyncScriptLoader(scriptUrl)(KakaotalkShareButton);

export default (props) => {
  return (
    <Wrapper asyncScriptOnLoad={() => {
      window.Kakao.init(process.env.GATSBY_KAKAO_KEY);
    }} />
  );
}
