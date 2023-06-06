import React, { useEffect } from 'react';
import makeAsyncScriptLoader from 'react-async-script';

const scriptUrl = 'https://developers.kakao.com/sdk/js/kakao.min.js';
const KakaotalkShareButton = ({ onClick, isScriptLoaded, isScriptLoadSucceed, url, templateId, templateArgs, children, ...rest }) => {
  return (
    <button style={{ border: 0, verticalAlign: 'top', background: 'transparent', margin: 0, padding: 0 }} onClick={(e) => {
      window.Kakao.Link.sendScrap({
        requestUrl: url,
        templateId,
        templateArgs
      });
      onClick(e);
    }}>
      {children}
    </button>
  );
}

const Wrapper = makeAsyncScriptLoader(scriptUrl)(KakaotalkShareButton);

export default (props) => {
  useEffect(() => {
    return () => {
      window.Kakao.cleanup();
    }
  });
  return (
    <Wrapper asyncScriptOnLoad={() => {
        window.Kakao.init(process.env.GATSBY_KAKAO_KEY);
    }} />
  );
}
