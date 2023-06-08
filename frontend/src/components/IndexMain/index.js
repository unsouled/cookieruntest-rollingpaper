import React, { useState, useContext } from 'react';
import { navigate } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '/src/components/Layout';
import Button from '/src/components/Button';
import LocalizedMessageContext from '/src/contexts/localizedMessageContext';

const languagesByLocale = {
  'ko': '한국어',
  'en': 'English',
  'zh': '繁體中文',
  'th': 'ภาษาไทย',
  'ja': '日本語',
};

const Banner = () => (
  <div>
    배너
  </div>
);

const Title = styled.div`
`;

const Description = styled.div`
`;

const CustomLayout = styled(Layout)`
  background: linear-gradient(180deg, #FCEAAB 0%, #FFE071 100%) !important;
`;

const Main = styled.main`
  background: #fff;
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
  console.log(localizedMessages);
  const handleStart = () => {
    navigate(`/${lang}/question`);
  };

  return (
    <CustomLayout>
      <Main>
        <Banner />
        <div css={{ width: '100px', justifyContent: 'flex-end', display: 'flex' }}>
          <span onClick={showModal} css={{ textAlign: 'left', fontSize: '20px', width: '84px', display: 'inline-block' }}>
            {languagesByLocale[lang]}
          </span>
          <span css={{ fontSize: '20px', lineHeight: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          </span>
        </div>

        <Title>
          {localizedMessages['title']}
        </Title>
        <Description>
          {localizedMessages['description']}
        </Description>
        <Buttons>
          <StartButton onClick={handleStart}>
            {localizedMessages['startText']}
          </StartButton>
          <CopyButton>
            링크 복사하기
          </CopyButton>
        </Buttons>
      </Main>
    </CustomLayout>
  );
}

export default IndexMain;
