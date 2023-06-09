import React, { useState, useContext } from 'react';
import { navigate } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '/src/components/Layout';
import KakaotalkShareButton from '/src/components/KakaotalkShareButton';
import LineShareButton from '/src/components/LineShareButton';
import FacebookShareButton from '/src/components/FacebookShareButton';
import TwitterShareButton from '/src/components/TwitterShareButton';
import LinkShareButton from '/src/components/LinkShareButton';
import Button from '/src/components/Button';
import CouponModal from '/src/components/CouponModal';
import LocalizedMessageContext from '/src/contexts/LocalizedMessageContext';

const StyledButton = styled(Button)`
  height: 50px;
  margin: 7px 0;
  background: #FDCB27;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

const RollingPaper = styled.div`
`;

const RollingPaperTitle = styled.div`
  text-align: center;
  font-size: 26px;
  font-weight: 700;
  margin: 28px 0 58px 0;
`;

const RollingPaperImage = styled.div`
  background: #6B3F17;
  height: 450px;
`;

const RollingPaperDescription = styled.div`
  color: #6C4126;
  text-align: right;
  font-size: 14px;
  margin-bottom: 4px;
`;

const PartnerCookies = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  text-align: center;
  margin: 20px 0;
`;

const BestCookie = styled.div`
  flex: 1;
  color: #9FD33A;
  div {
    margin-top: 10px;
    background: #fff;
    height: 160px;
  }
`;

const WorstCookie = styled.div`
  flex: 1;
  color: #E06522;
  div {
    margin-top: 10px;
    background: #fff;
    height: 160px;
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  button {
    background: #DCC9BA;
  }
`;

const EventBanner = styled.div`
  height: 790px;
  background: #fff;
`;

const CommunityEventBanner = styled.div`
  height: 320px;
  background: #6B3F17;
  margin-bottom: 15px;
`;

const TestLink = styled.div`
`;

const Copyright = styled.div`
  color: #DCC9BA;
  text-align: center;
  font-size: 12px;
  margin: 5px 0 20px 0;
`;

const Banner = styled.div`
  background: #6B3F17;
  height: 400px;
  margin: 0 -1rem;
`;

const ResultShare = styled.div`
  text-align: center;
  margin: 10px auto;
`;

const ResultMain = ({ lang }) => {
  const localizedMessages = useContext(LocalizedMessageContext) || {};
  const [modalOpen, setModalOpen] = useState(true);
  const restart = () => {
    navigate(`/${lang}`);
  }
  const showModal = () => {
    setModalOpen(true);
  };
  const hideModal = () => {
    setModalOpen(false);
  };

  return (
    <Layout>
      <CouponModal isOpen={modalOpen} onRequestClose={hideModal} />
      <Main>
        <Banner />
        <RollingPaper>
          <RollingPaperTitle>
            {localizedMessages['resultTitle']}
          </RollingPaperTitle>
          <RollingPaperDescription>
            {localizedMessages['resultDescription']}
          </RollingPaperDescription>
          <RollingPaperImage>
          </RollingPaperImage>
        </RollingPaper>

        <PartnerCookies>
          <BestCookie>
            {localizedMessages['resultBestMatch']}
            <div></div>
          </BestCookie>
          <WorstCookie>
            {localizedMessages['resultWorstMatch']}
            <div></div>
          </WorstCookie>
        </PartnerCookies>

        <ResultShare>
          <div>{localizedMessages['resultShare']}</div>
          <KakaotalkShareButton />
          <LineShareButton />
          <TwitterShareButton />
          <FacebookShareButton />
          <LinkShareButton />
        </ResultShare>

        <EventBanner />

        <CommunityEventBanner />

        <StyledButton onClick={restart}>
          {localizedMessages['resultRetest']}
        </StyledButton>
        <StyledButton>
          {localizedMessages['resultDownloadSticker']}
        </StyledButton>
        <Links>
          <StyledButton onClick={() => {
            window.location.href = 'https://villain.cookieruntest.com';
          }}>
            {localizedMessages['resultTryVillainTest']}
          </StyledButton>

          <StyledButton onClick={() => {
            window.location.href = 'https://cookieruntest.com';
          }}>
            {localizedMessages['resultTryCharacterTest']}
          </StyledButton>
        </Links>
        <Copyright>
          Copyright 2023 Devsisters. All rights reserved
        </Copyright>
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
