import React, { useState, useContext } from 'react';
import { navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
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
  margin: 0 -1rem;
  height: 70px;
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
  flex: 1;
  transform: rotate(-6.87deg);
  font-size: 20px;
  font-weight: 700;
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
  background: url('/images/img-bg-main@3x.png') no-repeat;
  background-size: 310px 470px;
  border-radius: 6px;
  width: 310px;
  height: 470px;
  /*max-width: 440px;*/
  margin: 0 auto;
  display: flex;
  padding: 15px;
  flex-direction: column;
  box-shadow: 0px 5px 10px rgba(243, 190, 58, 0.2);
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
`;

const StartButton = styled(Button)`
  background: linear-gradient(270deg, #FDCB27 0%, #FDCB27 100%);
  font-size: 25px;
  padding: 16px 0;
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
      <div css={{ display: 'flex', maxWidth: '320px', margin: '0 auto' }}>
        <div css={{ width: '100px', justifyContent: 'flex', padding: '20px 0' }}>
          <StaticImage 
            width={25}
            height={25}
            src="../../images/img-icon-cro.png" 
            srcSet="../../images/img-icon-cro@3x.png 3x, ../../images/img-icon-cro@2x.png 2x" 
            alt=""
            placeholder="none"
          />
        </div>
        <div css={{ flex:1 }}>
        </div>
        <div css={{ width: '100px', justifyContent: 'flex-end', display: 'flex', padding: '20px 0' }}>
          <span onClick={showModal} css={{ textAlign: 'left', fontSize: '20px', width: '84px', display: 'inline-block', fontWeight: 700 }}>
            {languagesByLocale[lang]}
          </span>
          <span css={{ fontSize: '20px', lineHeight: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <StaticImage 
              src="../../images/polygon@3x.png" width={10} height={8} 
              placeholder="none"
            />
          </span>
        </div>
      </div>
      <Main>
        <div css={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <StaticImage 
            css={{ position: 'absolute', top: 75, left: '-35px' }}
            width={99}
            height={117}
            src="../../images/img-cookie-1.png" 
            srcSet="../../images/img-cookie-1@3x.png 3x, ../../images/img-cookie-1@2x.png 2x" 
            alt=""
            placeholder="none"
          />
          <StaticImage 
            css={{ position: 'absolute', top: 155, right: '-35px' }}
            width={83}
            height={86}
            src="../../images/img-cookie-2.png" 
            srcSet="../../images/img-cookie-2@3x.png 3x, ../../images/img-cookie-2@2x.png 2x" 
            alt=""
            placeholder="none"
          />

          <Description>
            {localizedMessages['description']}
          </Description>
          <Title>
            {localizedMessages['title']}
          </Title>
          <ParticipantsText>
            {localizedMessages['participantsText']}
          </ParticipantsText>
        </div>
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
