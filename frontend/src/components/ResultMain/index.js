import React, { useCallback, useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { navigate } from 'gatsby';
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from '@emotion/styled';
import Layout from '/src/components/Layout';
import KakaotalkShareButton from '/src/components/KakaotalkShareButton';
import LineShareButton from '/src/components/LineShareButton';
import FacebookShareButton from '/src/components/FacebookShareButton';
import TwitterShareButton from '/src/components/TwitterShareButton';
import LinkShareButton from '/src/components/LinkShareButton';
import WechatShareButton from '/src/components/WechatShareButton';
import WeiboShareButton from '/src/components/WeiboShareButton';
import QQShareButton from '/src/components/QQShareButton';
import Button from '/src/components/Button';
import CouponModal from '/src/components/CouponModal';
import LocalizedMessageContext from '/src/contexts/LocalizedMessageContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import parseISO from 'date-fns/parseISO';
import isBefore from 'date-fns/isBefore';

const sf = function(s, args) {
  if (!s) {
    return '';
  }
  let formatted = s;
  for (const arg in args) {
    formatted = formatted.replace("{" + arg + "}", args[arg]);
  }
  return formatted;
};

const StyledButton = styled(Button)`
  height: 50px;
  margin: 7px 0;
  background: #FDCB27;
`;

const StyledLink = styled.a`
  height: 50px;
  margin: 7px 0;
  background: #FDCB27;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 320px;
  margin: 0 auto;
`;

const RollingPaper = styled.div`
`;

const RollingPaperTitle = styled.div`
  text-align: center;
  font-size: 26px;
  font-weight: 700;
  margin: 25px 0 8px 0;
`;

const RollingPaperImage = styled.div`
  width: 320px;
  height: 450px;
  margin: 0 auto;
`;

const RollingPaperDescription = styled.div`
  color: #6C4126;
  text-align: right;
  font-size: 14px;
  margin-bottom: 4px;
`;

const PartnerCookies = styled.div`
  display: flex;
  width: 320px;
  flex-direction: row;
  text-align: center;
  margin: 20px auto;
`;

const BestCookie = styled.div`
  color: #9FD33A;
  font-weight: 700;
  margin-right: 10px;
`;

const WorstCookie = styled.div`
  color: #E06522;
  font-weight: 700;
`;

const PeopleImage = styled.div`
  width: 155px;
  height: 165px;
  margin-top: 10px;
  border-radius: 5px;

  div {
    border-radius: 5px;
  }
  img {
    border-radius: 5px;
  }
`;

const PeopleName = styled.div`
  letter-spacing: -1px;
  font-size 16px;
  color: #1C1C1E;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 155px;
  height: 165px;
  border-radius: 5px;
  white-space: pre-wrap;
  position: relative;
  top: -165px;
  margin-bottom: -165px;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  button {
    background: #DCC9BA;
  }
`;

const EventArea = styled.div({
  width: '320px',
  margin: '10px auto 0',
  'h1': { 
    margin: '0 0 0 0',
    color: '#fff', 
    textAlign: 'center',
    fontSize: '18px',
    position: 'relative',
    display: 'flex',
    margin: '0 auto',
    top: '-24px',
    justifyContent: 'center',
    background: 'url("/images/img-result-bg-event-title@2x.png") no-repeat',
    backgroundSize: 'cover',
    width: '178px',
    height: '45px',
    alignItems: 'center',
    'span': {
      transform: 'rotate(-3deg)',
      padding: '10px 16px',
    }
  },
  'h2': { color: '#000', margin: '-10px 0 26px 0', textAlign: 'center', textShadow: '0px 3px 0px rgba(255, 255, 255, 1)', whiteSpace: 'pre-wrap', fontSize: '26px', lineHeight: '32px', wordWrap: 'pre-wrap' }
});

const EventAreaTitle = styled.div`
  width: 320px;
  height: 130px;
  background: url("/images/img-result-event-bg@2x.png");
  background-size: cover;
`;

const HashtagsText = styled.span`
  display: flex;
  font-size: 13px;
  line-height: 18px;
  align-items: center;
  margin-left: 10px;
  flex: 1;
  color: #141414;
  white-space: pre-wrap;
  letter-spacing: -1px
`;

const CommunityEventBanner = styled.div`
  width: 320px;
  height: 320px;
  background: #6B3F17;
  margin: 0 auto 15px;
  border-radius: 0 0 5px 5px;
  img {
    border-radius: 0 0 5px 5px;
  }
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
width: 100%;
  background: #6B3F17;
  margin: 0;
`;

const ResultShare = styled.div`
  text-align: center;
  margin: 10px auto 20px;
  font-weight: 700;
  font-size: 20px;
`;

function numberFormat(num) {
  if (!num) {
    return '0';
  }
  if(num > 999 && num < 1000000){
    return (num/1000).toFixed(1) + 'K';
  }else if(num > 1000000){
    return (num/1000000).toFixed(1) + 'M';
  }else if(num < 999){
    return num;
  }
}

const ResultMain = React.memo(({ lang, code, messages: localizedMessages, eventImage, result, resultImage, peopleTypeImages, ogImage, banner, logoImage, fromQuestion, mid }) => {
  const [shareCounter, setShareCounter] = useState(0);
  const [eventVisible, setEventVisible] = useState(false);
  const topRef = useRef();

  const fetchCounter = async () => {
    try {
      const { data } = await axios.get(`${process.env.GATSBY_API_HOST}/counter/share`);
      setShareCounter(data);
    } catch (error) {
      console.error(error);
    }
  }

  const restart = () => navigate(`/${lang}`);
  useEffect(() => {
    fetchCounter();
    setEventVisible(lang !== 'zh-Hans' && isBefore(new Date(), parseISO(localizedMessages['eventEndAt'])));
  }, [fetchCounter, setEventVisible]);

  const langKey = lang !== 'zh-Hans' ? lang : 'zhHans';
  const eventImageData = getImage(eventImage[langKey].localFile);
  const resultImageData = getImage(resultImage.localFile);
  console.log(resultImageData);
  const bestMatch  = result.bestMatch.localizations.data.filter(
    ( { attributes: { locale } }) => locale === lang
  )[0].attributes;
  const bestMatchName = bestMatch.nameRich;
  const bestMatchImage = getImage(peopleTypeImages.filter((image) => image.code === bestMatch.code)[0]?.bgImage.localFile);
  const bannerImageData = getImage(banner?.localFile);
  const logoImageData = getImage(logoImage?.localFile);

  const worstMatch= result.worstMatch.localizations.data.filter(
    ( { attributes: { locale } }) => locale === lang
  )[0].attributes;
  const worstMatchName = worstMatch.nameRich;
  const worstMatchImage = getImage(peopleTypeImages.filter((image) => image.code === worstMatch.code)[0]?.bgImage.localFile);

  const shareUrl = `${process.env.GATSBY_HOST}/${lang}/result/${code}`;

  return (
    <Layout>
      <Banner onClick={() => window.location.href='https://ckie.run/test '}>
        <GatsbyImage 
          alt=""
          image={bannerImageData} 
          width="100%" 
          height="100%"
        />
      </Banner>

      <Main>
      <RollingPaper ref={el => (topRef.current = el)}>
      <RollingPaperTitle>
            {localizedMessages['resultTitle']}
          </RollingPaperTitle>
          <RollingPaperDescription>
            {localizedMessages['resultDescription']}
          </RollingPaperDescription>
          <RollingPaperImage>
            <GatsbyImage image={resultImageData} 
              width={320}
              height={450}
              alt=""
            />
          </RollingPaperImage>
        </RollingPaper>

        <PartnerCookies>
          <BestCookie>
            {localizedMessages['resultBestMatch']}
            <PeopleImage>
              <GatsbyImage 
                image={bestMatchImage} 
                alt="" 
                width={155}
                height={165}
              />
            </PeopleImage>
            <PeopleName>
              {bestMatchName}
            </PeopleName>
          </BestCookie>

          <WorstCookie>
            {localizedMessages['resultWorstMatch']}
            <PeopleImage>
              <GatsbyImage 
                image={worstMatchImage}
                alt="" 
                width={155}
                height={165}
              />
            </PeopleImage>
            <PeopleName>
              {worstMatchName}
            </PeopleName>
          </WorstCookie>
        </PartnerCookies>

        <ResultShare>
          <div>{localizedMessages['resultShare']}</div>

          <div css={{ textAlign: 'center' }}>
            <span css={{
              minWidth: '78px',
              padding: '2px 10px',
              fontSize: '12px',
              background: '#fff',
              lineHeight: '14px',
              color: '#141414',
              borderRadius: '22px',
              display: 'inline-block',
              fontWeight: 800
            }}>
              {numberFormat(shareCounter)}
            </span>
          </div>

          <ShareTools 
            code={code}
            lang={lang} 
            result={result}
            url={shareUrl} 
            localizedMessages={localizedMessages}
            ogImage={ogImage}
            onShare={(count) => setShareCounter(count)}
          />
        </ResultShare>

        {eventVisible && (
          <EventArea>
            <EventAreaTitle>
              <h1>
                <span>{localizedMessages['eventName']}</span>
                <StaticImage
                  src="../../images/img-bg-arrow@2x.png"
                  style={{ position: 'absolute', right: -60, top: -8 }}
                  width={29}
                  height={66}
                  placeholder="none"
                />
              </h1>
              <h2>{localizedMessages['eventDescriptionRich']}</h2>
            </EventAreaTitle>
            <div css={{
              background: '#FFFFFF',
              padding: '0 15px 20px',
              margin: '-14px 0 0 0',
              color: '#141414',
            }}>
            <div css={{ color: '#fff', margin: '14px 0', background: 'url("/images/img-bg-event-duration.png") no-repeat', backgroundSize: 'cover',  fontSize: '14px', padding: '2px 5px', fontWeight: 700, textAlign: 'center', position: 'relative', top: '-12px' }}>
              <StaticImage
                src="../../images/img-star@2x.png"
                width={35}
                height={36}
                placeholder="none"
                style={{ position: 'absolute',left: -14, top: -25 }}
              />
                {localizedMessages['eventDuration']} {localizedMessages['eventStartAtText']} ~ {localizedMessages['eventEndAtText']}
              </div>
              <div css={{ marginTop: '0px', borderBottom: '1px solid #F3F3F3', padding: '8px 0 16px 0', display: 'flex' }}>
                <div css={{ flex: 1, flexDirection: 'column', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span css={{ marginBottom: '8px', fontWeight: 700, fontSize: '17px', textAlign: 'center', display: 'inline-block', minWidth: '42px', padding: '0 15px', background: '#9FD33A', borderRadius: '5px', color: '#fff' }}>
                    {localizedMessages['eventPrize1Winners']}
                  </span>
                  <div css={{ fontWeight: 700, fontSize: '20px', whiteSpace: 'pre', paddingTop: '4px' }}>
                    <div css={{ lineHeight: '20px', whiteSpace: 'pre-wrap' }}>
                      <div css={{ fontSize: '22px', lineHeidht: '21px' }}>
                        {localizedMessages['eventPrize1Name']}
                      </div>
                      <span css={{ fontWeight: 400, fontSize: '14px', color: '#a6a6a6' }}>
                        {localizedMessages['eventPrize1Sub']}
                      </span>
                    </div>
                  </div>
                </div>
                <div css={{ flex: 1, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <StaticImage 
                    src="../../images/img-event-reward-1@2x.png"
                    width={108} height={87} 
                    placeholder="none"
                  />
                </div>
              </div>
              <div css={{ borderBottom: '1px solid #F3F3F3', padding: '16px 0', display: 'flex' }}>
                <div css={{ flex: 1, flexDirection: 'column', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span css={{ marginBottom: '8px',fontWeight: 700, fontSize: '17px', textAlign: 'center', display: 'inline-block', minWidth: '42px', padding: '0 15px', background: '#FFDA5F', borderRadius: '5px', color: '#fff' }}>
                    {localizedMessages['eventPrize2Winners']}
                  </span>
                  <p css={{ fontWeight: 700, fontSize: '15px', lineHeight: '20px', whiteSpace: 'pre-wrap' }}>
                    {localizedMessages['eventPrize2Name']}
                  </p>
                </div>
                <div css={{ flex: 1, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {(lang === 'ja' || lang === 'zh') && (
                    <StaticImage 
                      src="../../images/img-event-reward-2-apple@2x.png"
                      width={100} height={104} 
                      placeholder="none"
                    />
                  )}
                  {lang === 'th' && (
                    <StaticImage 
                      src="../../images/img-event-reward-2-true@2x.png"
                      width={100} height={98} 
                      placeholder="none"
                    />
                  )}
                  {(lang === 'en' || lang === 'ko' || lang === 'zh-Hans') && (
                    <StaticImage 
                      src="../../images/img-event-reward-2@2x.png"
                      width={100} height={100} 
                      placeholder="none"
                    />
                  )}
                </div>
              </div>
              <div css={{ padding: '16px 0', display: 'flex' }}>
                <div css={{ flex: 1, flexDirection: 'column', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span css={{ marginBottom: '8px',fontWeight: 700, fontSize: '17px', textAlign: 'center', display: 'inline-block', minWidth: '42px', padding: '0 15px', background: '#FFDA5F', borderRadius: '5px', color: '#fff' }}>
                    {localizedMessages['eventPrize3Winners']}
                  </span>
                  <p css={{ fontWeight: 700, fontSize: '15px', lineHeight: '20px', whiteSpace: 'pre-wrap' }}>
                    {localizedMessages['eventPrize3Name']}
                  </p>
                </div>
                <div css={{ flex: 1, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <StaticImage 
                    src="../../images/img-event-reward-3@2x.png"
                    width={104} height={65} 
                    placeholder="none"
                  />
                </div>
              </div>
              <div css={{ color: '#C8C8C8', textAlign: 'center', fontSize: '11px', fontWeight: 400, lineHeight: '16px', paddingBottom: '8px', whiteSpace: 'pre-wrap' }}>
                {localizedMessages['participantsDisclaimer']}
              </div>
              <div css={{ fontWeight: 700, textAlign: 'center', fontSize: '18px', marginTop: '10px', padding: '5px 0' }}>
                <div>
                  <span style={{
                    background: 'rgba(253, 203, 39, 0.8)',
                    color: 'transparent',
                    borderRadius: '5px',
                    marginTop: '-20px',
                    padding: '0 4px',
                    display: 'inline-block',
                    height: 18,
                    lineHeight: 0
                  }}>{localizedMessages['eventParticipationText']}</span>
                </div>
                <div style={{ marginTop: '-28px' }}>
                  {localizedMessages['eventParticipationText']}
                </div>
              </div>
              <p className="participation-description" css={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '22px', fontWeight: 400, textAlign: 'center' }}>
                {localizedMessages['eventParticipationDescription']}
              </p>
              <div css={{
                display: 'flex',
                margin: '12px 0',
                height: '50px',
                width: '100%',
              }}>
                <div css={{
                  display: 'flex',
                  flex: 1,
                  borderRadius: '15px 5px 5px 15px',
                  background: '#F3F1EC',
                }}>
                  <HashtagsText className="hashtags">
                    {localizedMessages['eventHashtagsRich']}
                  </HashtagsText>
                </div>

                <CopyToClipboard text={localizedMessages['eventHashtags']} onCopy={() => {
                  alert(localizedMessages['alertCopied']);
                }}>
                  <Button style={{ background: 'url("/images/img-button-bg-copy@2x.png") no-repeat center right / 82px 50px', fontSize: '16px', backgroundSize: '82px 50px', borderRadius: '5px 15px 15px 5px', margin: 0, width: 85, textAlign: 'center', letterSpacing: -1 }}>
                    {localizedMessages['eventCopyText']}
                  </Button>
                </CopyToClipboard>
              </div>
              <ReactMarkdown className="notices">
                {localizedMessages['eventNotices']}
              </ReactMarkdown>
            </div>
          </EventArea>
        )}

        {eventVisible && (
          <CommunityEventBanner>
            <GatsbyImage image={eventImageData} 
              alt="" 
              width={320}
              height={320}
            />
          </CommunityEventBanner>
        )}

        <StyledButton onClick={restart}>
          {localizedMessages['resultRetest']}
        </StyledButton>

        <StyledButton onClick={() => {
          window.open("https://www.dropbox.com/scl/fo/8gaamviknlzahv66kh5hc/h?dl=0&rlkey=olbtfvcu4eamxdci77y54hbo5", '_blank');
        }}>
          {localizedMessages['resultDownloadSticker']}
        </StyledButton>

        <Links>
          <StyledButton onClick={() => {
            window.open('https://villain.cookieruntest.com', '_blank');
          }}>
            {localizedMessages['resultTryVillainTest']}
          </StyledButton>

          <StyledButton onClick={() => {
            window.open('https://www.cookieruntest.com', '_blank');
          }}>
            {localizedMessages['resultTryCharacterTest']}
          </StyledButton>
        </Links>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 24 }}>
          <GatsbyImage 
            image={getImage(logoImageData)} 
            loading="eager"
            placeholder="none"
            alt="" 
            css={{
              width: 115,
              margin: '0 auto', 
            }}
          />
        </div>

        <Copyright>
          Copyright 2023 Devsisters. All rights reserved
        </Copyright>
      </Main>
    </Layout>
  );
});

const ShareTools = ({ lang, result, code, url, onShare, localizedMessages, ogImage }) => {
  const increaseShareCount = async (tool) => {
    try {
      const { data } = await axios.put(`${process.env.GATSBY_API_HOST}/counter/share/${tool}`);
      onShare(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fieldName = `${lang !== 'zh-Hans' ? lang : 'zhHans'}`;
  const ogImageUrl = ogImage[fieldName].formats.large.url;
  const kakaotalk = 
    <KakaotalkShareButton url={url}  templateId={95239} templateArgs={{
        'TITLE': sf(localizedMessages['metaResultTitle'], { name: result['name'] }),
        'DESCRIPTION': localizedMessages['metaDescriptionEvent'],
        'THU': ogImageUrl,
        'PATH': `${lang}/result/${code}`
      }}
      onClick={() => increaseShareCount('kakaotalk')} 
    />;
  const line = <LineShareButton url={url} onClick={() => increaseShareCount('line')} />;
  const twitter = <TwitterShareButton url={url} onClick={() => increaseShareCount('twitter')} />;
  const fb = <FacebookShareButton url={url} onClick={() => increaseShareCount('fb')} />;
  const copy = <LinkShareButton url={url} onCopy={() => {
    alert(localizedMessages['alertCopied']);
    increaseShareCount('copy');
  }} />;
  const wechat = <WechatShareButton url={url} onClick={() => increaseShareCount('wechat')} />;
  const qq = <QQShareButton url={url} onClick={() => increaseShareCount('qq')} />;
  const weibo = <WeiboShareButton url={url} onClick={() => increaseShareCount('weibo')} />;
  
  let tools;
  if (lang === 'ko') {
    tools = [kakaotalk, twitter, fb, copy];
  } else if (lang === 'zh') {
    tools = [line, fb, copy];
  } else if (lang === 'zh-Hans') {
    tools = [wechat, qq, weibo, copy];
  } else if (lang === 'th') {
    tools = [line, fb, copy];
  } else if (lang === 'ja') {
    tools = [line, twitter, fb, copy];
  } else {
    tools = [twitter, fb, copy];
  }
 
  return <>{tools}</>
}

const ResultPage = ({ pageContext: { langKey, code, localizedMessages, eventImage, result, ogImage, resultImage, peopleTypeImages, banner, logoImage, smallBanner }, location }) => {
  const modalOpened = useRef(false);
  const fromQuestion = !!location?.state?.fromQuestion;
  const [showSmallBanner, setShowSmallBanner] = useState(false);
  const mid = location?.state?.mid;
  const showModal = () => setModalOpen(true);
  const hideModal = () => setModalOpen(false);
  const [modalOpen, setModalOpen] = useState(false);
  const smallBannerImageData = getImage(smallBanner?.localFile);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset >= 480) {
        setShowSmallBanner(true);
      } else {
        setShowSmallBanner(false);
      }
      if (window.pageYOffset >= 240 && !modalOpened.current && fromQuestion) {
        //setModalOpened(true);
        modalOpened.current = true;
        showModal();
      }
    };
    if (typeof window !== 'undefined') {
      window.history.replaceState(location.pathname, null);
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, []);

  return (
    <>
      {showSmallBanner && (
        <div 
          css={{ position: 'fixed', top: 0, minHeight: 70, zIndex: 1000, width: '100%', margin: '0 auto', left: 0, right: 0  }}
          onClick={() => {
            window.location.href='https://ckie.run/test';
          }}
        >
          <div 
            css={{ margin: '0 auto', left: 0, right: 0, maxWidth: 430 }} 
          >
            <GatsbyImage 
              alt=""
              image={smallBannerImageData} 
              width="100%" 
              height="100%"
            />
          </div>
        </div>
      )}
			<CouponModal 
				isOpen={modalOpen} 
				onRequestClose={hideModal} 
				messages={localizedMessages}
        mid={mid}
        rewardId={result.rewardId}
			/>
      <ResultMain 
        lang={langKey} 
        code={code}
        messages={localizedMessages} 
        eventImage={eventImage} 
        result={result} 
        resultImage={resultImage} 
        peopleTypeImages={peopleTypeImages}
        banner={banner}
        logoImage={logoImage}
        ogImage={ogImage}
      />
    </>
  );
}

export const Head = ({ pageContext: { localizedMessages, code, result, ogImage, langKey } }) => {
  const fieldName = `${langKey !== 'zh-Hans' ? langKey : 'zhHans'}`;
  const ogImageUrl = ogImage[fieldName].formats.large.url;

  const name = result.localizations.data.filter(({ attributes: { locale }}) => locale === langKey)[0].attributes.name;
  const title = sf(localizedMessages['metaResultTitle'], { name: name });
  return (
    <>
      <html lang={langKey} />
      <title>{title}</title>
      <meta name="description" content={localizedMessages['metaDescriptionEvent']} />
      <meta name="og:type" content="website" />
      <meta name="og:url" content={`${process.env.GATSBY_HOST}/${langKey}/result/${code}`} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={localizedMessages['metaDescriptionEvent']} />
      <meta name="og:image" content={ogImageUrl} />
      <meta name="og:image:width" content="1000" />
      <meta name="og:image:height" content="525" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={localizedMessages['metaDescriptionEvent']} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:src" content={ogImageUrl} />
      <meta name="twitter:image:width" content="1000" />
      <meta name="twitter:image:height" content="525" />
      <body className={`lang-${langKey} result`} />
    </>
  );
}

export default ResultPage;
