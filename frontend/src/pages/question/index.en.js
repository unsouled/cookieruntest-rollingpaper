import React, { useState, useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import QuestionMain from '/src/components/QuestionMain';
import LocalizedMessageContext from '/src/contexts/localizedMessageContext';

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

    allStrapiQuestion(sort: {order: ASC}, filter: {locale: {eq: $langKey}}) {
      nodes {
        answers {
          text
          value
        }
        order
        question
      }
    }
  }
`;

const QuestionPage = ({ data: { strapiLocalizedMessage = {}, allStrapiQuestion }, pageContext: { langKey } }) => {
  const questions = allStrapiQuestion.nodes;
  return (
    <LocalizedMessageContext.Provider value={strapiLocalizedMessage}>
      <QuestionMain 
        lang={langKey} 
        questions={questions}
      />
    </LocalizedMessageContext.Provider>
  );
}

export const Head = ({ pageContext: { langKey } }) => (
  <>
    <html lang={langKey} />
    <title>Cookierun</title>
    <body className={`lang-${langKey}`} />
  </>
);

export default QuestionPage;
