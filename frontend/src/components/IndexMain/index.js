import React, { useState, useContext } from 'react';
import { navigate } from 'gatsby';
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from '@emotion/styled';
import Layout from '/src/components/Layout';
import Button from '/src/components/Button';
import LocalizedMessageContext from '/src/contexts/LocalizedMessageContext';

const sf = function(s, args) {
  let formatted = s;
  for (const arg in args) {
    formatted = formatted.replace("{" + arg + "}", args[arg]);
  }
  return formatted;
};

const languagesByLocale = {
  'ko': '한국어',
  'en': 'English',
  'zh-Hans': '简体中文',
  'zh': '繁體中文',
  'th': 'ภาษาไทย',
  'ja': '日本語',
};

const Banner = styled.div`
  margin: 0 -8px;
`;

const Title = styled.div`
  width: 260px;
  margin: 90px auto 0;
  text-align: center;
  font-style: normal;
  font-weight: 900;
  font-size: 35px;
  line-height: 46px;
  white-space: pre-wrap;
`;

const Description = styled.div`
  position: absolute;
  margin-top: 20px;
  line-height: 26px;
  left: 15px;
  flex: 1;
  transform: rotate(-6.87deg);
  font-size: 20px;
  font-weight: 700;
  width: 230px;
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
  justify-content: center;
  text-align: center;
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

const IndexMain = ({ showModal, banner, lang = 'en' }) => {
  const localizedMessages = useContext(LocalizedMessageContext) || {};
  const handleStart = () => {
    navigate(`/${lang}/question`);
  };

  const bannerImageData = getImage(banner?.localFile);

  return (
    <CustomLayout>
      <Banner>
        <GatsbyImage image={bannerImageData} width="100%" height="100%" />
      </Banner>
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
            css={{ position: 'absolute', top: 95, left: '-35px' }}
            width={99}
            height={117}
            src="../../images/img-cookie-1.png" 
            srcSet="../../images/img-cookie-1@3x.png 3x, ../../images/img-cookie-1@2x.png 2x" 
            alt=""
            placeholder="none"
          />
          <StaticImage 
            css={{ position: 'absolute', top: 195, right: '-35px' }}
            width={83}
            height={86}
            src="../../images/img-cookie-2.png" 
            srcSet="../../images/img-cookie-2@3x.png 3x, ../../images/img-cookie-2@2x.png 2x" 
            alt=""
            placeholder="none"
          />

          <Description>
            <div>{localizedMessages['description1']}</div>
            <div style={{ textAlign: 'left' }}>
             <StaticImage 
                style={{ left: -10, top: -8, marginTop: 20, marginRight: 0, transform: 'rotate(8.29deg)' }}
                width={77}
                height={14}
                src="../../images/img-xxx.png" 
                srcSet="../../images/img-xxx@3x.png 3x, ../../images/img-xxx@2x.png 2x" 
                alt=""
                placeholder="none"
              />
              {localizedMessages['description2']}
              <StaticImage 
                style={{ left: 6, top: -14 }}
                width={41}
                height={37}
                src="../../images/img-heart.png" 
                srcSet="../../images/img-heart@3x.png 3x, ../../images/img-heart@2x.png 2x" 
                alt=""
                placeholder="none"
              />

            </div>
          </Description>
          <Title>
            {localizedMessages['titleRich']}
          </Title>
        </div>
        <Buttons>
          <ParticipantsText>
            {sf(localizedMessages['participantsText'], { participants: new Intl.NumberFormat(lang, { maximumSignificantDigits: 3 }).format(0) })}
          </ParticipantsText>
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
