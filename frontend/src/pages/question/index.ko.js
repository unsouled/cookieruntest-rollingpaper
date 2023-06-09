import React, { useState, useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import QuestionMain from '/src/components/QuestionMain';
import LocalizedMessageContext from '/src/contexts/LocalizedMessageContext';

export const query = graphql`
  query {
    strapiLocalizedMessage {
			localizations {
				data {
					id
					attributes {
						title
						subtitle
						description
						startText
						participantsText
						selectLanguageText
						copyright
						characterTestUrl
						villainTestUrl
						locale
					}
				}
			}
    }

    allStrapiQuestion(sort: {order: ASC}) {
      nodes {
        answers {
          localizations {
            data {
              attributes {
                text
                value
                locale
              }
            }
          }
        }
        question
        localizations {
          data {
            attributes {
              order
              question
              locale
            }
          }
        }
      }
    }
  }
`;

const QuestionPage = ({ data: { strapiLocalizedMessage = {}, allStrapiQuestion = [] }, pageContext: { langKey } }) => {
  const questions = allStrapiQuestion.nodes.map((questionNode) => {
    const answers = questionNode.answers.map((answerNode) => {
      const match = answerNode.localizations.data.filter(({ attributes: { locale } }) => locale === langKey)[0].attributes;
      return {
        text: match.text, 
        value: match.value
      }
    });
    const { order, question } = questionNode.localizations.data.filter(({ attributes: { locale } }) => locale === langKey)[0].attributes;
    return {
      order,
      question,
      answers
    };
  });
	const messages = strapiLocalizedMessage.localizations.data.filter(({ attributes: { locale } }) => locale === langKey)[0].attributes;
  return (
    <LocalizedMessageContext.Provider value={messages}>
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
