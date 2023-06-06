import React, { useState, useContext } from 'react';
import { navigate } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '/src/components/Layout';
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

const IndexMain = ({ showModal, lang = 'en' }) => {
  const localizedMessages = useContext(LocalizedMessageContext) || {};
  const handleStart = () => {
    navigate(`/${lang}/question`);
  };

  return (
    <Layout>
      <main>
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
        <button onClick={handleStart}>
          {localizedMessages['startText']}
        </button>
        <button>
          링크 복사하기
        </button>
      </main>
    </Layout>
  )
}

export default IndexMain;
