import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import queryString from "query-string";

const getRedirectLanguage = () => {
  if (typeof navigator === `undefined`) {
    return 'en';
  }
  if (navigator.language === 'zh-CN' || navigator.language === 'zh-Hans') {
    return 'zh-Hans';
  }
  const lang = navigator && navigator.language && navigator.language.split('-')[0];

  switch (lang) {
    case 'ja':
      return 'ja';
    case 'ko':
      return 'ko';
    case 'zh':
      return 'zh';
    case 'th':
      return 'th';
    default:
      return 'en';
  }
};

const IndexPage = () => {
  useEffect(() => {
    const query = (typeof window !== undefined) ? queryString.parse(window.location.search) : {};
    const urlLang = getRedirectLanguage();
    navigate(`/${urlLang}`, { state: { mid: query.mid }, replace: true });
  }, []);

  return null;
}

export const Head = ({ data: { strapiLocalizedMessage = {}, strapiOgImage = {} } }) => {
  const langKey = 'en';
	const messages = strapiLocalizedMessage.localizations.data.filter(({ attributes: { locale } }) => locale === langKey)[0].attributes;
  const fieldName = `${langKey !== 'zh-Hans' ? langKey : 'zhHans'}`;
  const ogImage = strapiOgImage[fieldName].formats.large.url;
  return (
    <>
      <html lang={langKey} />
      <meta name="description" content={messages['metaDescriptionEvent']} />
      <meta name="og:url" content={process.env.GATSBY_HOST} />
      <meta name="og:title" content={messages['metaTitle']} />
      <meta name="og:image" content={ogImage} />
      <meta name="og:image:width" content="1000" />
      <meta name="og:image:height" content="525" />
      <meta name="og:type" content="website" />
      <meta name="twitter:title" content={messages['metaTitle']} />
      <meta name="twitter:description" content={messages['metaDescriptionEvent']} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:src" content={ogImage} />
      <title>{messages['metaTitle']}</title>
      <body className={`lang-${langKey} index`} />
    </>
  );
}

export default IndexPage;
