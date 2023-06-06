import React from 'react';
import { navigate } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '/src/components/Layout';
import KakaotalkShareButton from '/src/components/KakaotalkShareButton';
import LineShareButton from '/src/components/LineShareButton';
import FacebookShareButton from '/src/components/FacebookShareButton';
import TwitterShareButton from '/src/components/TwitterShareButton';
import LinkShareButton from '/src/components/LinkShareButton';
import Button from '/src/components/Button';

/*
export const query = graphql`
  query ($langKey: String) {
    strapiLocalizedMessage(locale: {eq: $langKey}) {
      id
      logoImage {
        id
      }
      copyright
      characterTestUrl
      description
      participantsText
      selectLanguageText
      startText
      subtitle
      title
      villainTestUrl
    }


  }
`;
*/

const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

const RollingPaper = styled.div`
`;

const CookieName = styled.div`
`;

const PartnerCookies = styled.div`
  display: flex;
  flex-direction: row;
`;

const BestCookie = styled.div`
`;

const WorstCookie = styled.div`
`;

const Links = styled.div`
`;

const TestLink = styled.div`
`;

const Banner = () => (
  <div>
    Banner
  </div>
);

const CommunityEventBanner = () => (
  <div>
    Banner
  </div>
);

const ResultShare = styled.div`
`;

const ResultMain = ({ lang }) => {
  const restart = () => {
    navigate(`/${lang}`);
  }
  return (
    <Layout>
      <Main>
        <Banner />
        <RollingPaper>
          롤링 페이퍼 도착!
          <CookieName>
            TO. oo맛 쿠키
          </CookieName>
        </RollingPaper>
        <PartnerCookies>
          <BestCookie></BestCookie>
          <WorstCookie></WorstCookie>
        </PartnerCookies>
        <ResultShare>
          <KakaotalkShareButton />
          <LineShareButton />
          <TwitterShareButton />
          <FacebookShareButton />
          <LinkShareButton />
        </ResultShare>
        <Button onClick={restart}>
          테스트 다시하기
        </Button>
        <CommunityEventBanner />
        <Links>
          <TestLink>
            빌런 테스트
          </TestLink>
          <TestLink>
            어떤 쿠키?
          </TestLink>
        </Links>
      </Main>
    </Layout>
  );
}


const ResultPage = ({ pageContext: { langKey, code } }) => {
  return (
    <ResultMain lang={langKey} />
  );
}

export const Head = ({ pageContext: { langKey } }) => (
  <>
    <html lang={langKey} />
    <title>Cookierun</title>
    <body className={`lang-${langKey}`} />
  </>
);

export default ResultPage;
