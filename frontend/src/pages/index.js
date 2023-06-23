import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import queryString from "query-string";

const getRedirectLanguage = () => {
  if (typeof navigator === `undefined`) {
    return 'en';
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
    navigate(`/${urlLang}`, { state: { mid: query.mid } });
  }, []);

  return null;
}

export default IndexPage;
