import React, { useState, useContext } from 'react';
import { navigate } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '/src/components/Layout';
import Button from '/src/components/Button';
import LocalizedMessageContext from '/src/contexts/LocalizedMessageContext';

const languagesByLocale = {
  'ko': '한국어',
  'en': 'English',
  'zh-Hans': '简体中文',
  'zh': '繁體中文',
  'th': 'ภาษาไทย',
  'ja': '日本語',
};

const Banner = styled.div`
  background: #6B3F17;
  height: 70px;
  margin: 0 -1rem;
`;

const Title = styled.div`
  width: 260px;
  margin: 0 auto;
  text-align: center;
  font-style: normal;
  font-weight: 900;
  font-size: 35px;
  margin-top: 20px;
  margin-bottom: 48px;
`;

const Description = styled.div`
`;


const ParticipantsText = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  color: #6C4126;
  text-align: center;
`;

const CustomLayout = styled(Layout)`
  background: linear-gradient(180deg, #FCEAAB 0%, #FFE071 100%) !important;
`;

const Main = styled.main`
  background: #fff;
  padding: 15px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
`;

const StartButton = styled(Button)`
  background: linear-gradient(270deg, #FDCB27 0%, #FDCB27 100%);
  font-size: 25px;
  padding: 24px 0;
  font-weight: 700;
  margin: 6px 0;
`;

const CopyButton = styled(Button)`
  background: #DCC9BA;
  font-size: 18px;
  padding: 14px 0;
  font-weight: 700;
  margin: 6px 0;
`;

const IndexMain = ({ showModal, lang = 'en' }) => {
  const localizedMessages = useContext(LocalizedMessageContext) || {};
  const handleStart = () => {
    navigate(`/${lang}/question`);
  };

  return (
    <CustomLayout>
      <Banner />
      <div css={{ display: 'flex' }}>
        <div css={{ flex:1 }}>
        </div>
        <div css={{ width: '100px', justifyContent: 'flex-end', display: 'flex', padding: '20px 0' }}>
          <span onClick={showModal} css={{ textAlign: 'left', fontSize: '20px', width: '84px', display: 'inline-block' }}>
            {languagesByLocale[lang]}
          </span>
          <span css={{ fontSize: '20px', lineHeight: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          </span>
        </div>
      </div>
      <Main>
        <Description>
          {localizedMessages['description']}
        </Description>
        <Title>
          {localizedMessages['title']}
        </Title>
        <ParticipantsText>
          {localizedMessages['participantsText']}
        </ParticipantsText>
        <Buttons>
          <StartButton onClick={handleStart}>
            {localizedMessages['startText']}
          </StartButton>
          <CopyButton>
            {localizedMessages['copyLinkText']}
          </CopyButton>
        </Buttons>
      </Main>
    </CustomLayout>
  );
}

export default IndexMain;
