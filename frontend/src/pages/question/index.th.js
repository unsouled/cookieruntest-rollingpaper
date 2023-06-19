import React from 'react';
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
            analyzingText
            analyzingTextRich
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
                textRich
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
              questionRich
              locale
            }
          }
        }
      }
    }
    strapiBannerImage {
      smallEn {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      smallKo {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      smallJa {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      smallTh {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      smallZh {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      smallZhHans {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      bigEn {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      bigKo {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      bigJa {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      bigTh {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      bigZh {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      bigZhHans {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`;

const QuestionPage = ({ data: { strapiLocalizedMessage = {}, allStrapiQuestion = [], strapiBannerImage = {} }, pageContext: { langKey } }) => {
  const fieldName = `small${langKey !== 'zh-hans' ? langKey.charAt(0).toUpperCase() + langKey.slice(1) : 'ZhHans'}`;
  const banner = strapiBannerImage[fieldName];

  const questions = allStrapiQuestion.nodes.map((questionNode) => {
    const answers = questionNode.answers.map((answerNode) => {
      const match = answerNode.localizations.data.filter(({ attributes: { locale } }) => locale === langKey)[0].attributes;
      return {
        text: match.textRich, 
        value: match.value
      }
    });
    const { order, questionRich } = questionNode.localizations.data.filter(({ attributes: { locale } }) => locale === langKey)[0].attributes;
    return {
      order,
      question: questionRich,
      answers
    };
  });
	const messages = strapiLocalizedMessage.localizations.data.filter(({ attributes: { locale } }) => locale === langKey)[0].attributes;
  return (
    <LocalizedMessageContext.Provider value={messages}>
      <QuestionMain 
        lang={langKey} 
        questions={questions}
        banner={banner}
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
