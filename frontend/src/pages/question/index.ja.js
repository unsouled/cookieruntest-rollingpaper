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
            metaTitle
            metaDescriptionEvent
            metaDescription
            dot
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
    strapiOgImage {
      en {
        formats {
          large {
            url
          }
        }
      }
      ko {
        formats {
          large {
            url
          }
        }
      }
      ja {
        formats {
          large {
            url
          }
        }
      }
      th {
        formats {
          large {
            url
          }
        }
      }
      zh {
        formats {
          large {
            url
          }
        }
      }
      zhHans {
        formats {
          large {
            url
          }
        }
      }
    }
  }
`;

const QuestionPage = ({ data: { strapiLocalizedMessage = {}, allStrapiQuestion = [], strapiBannerImage = {} }, pageContext: { langKey }, location }) => {
  const fieldName = `small${langKey !== 'zh-Hans' ? langKey.charAt(0).toUpperCase() + langKey.slice(1) : 'ZhHans'}`;
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
        mid={location?.state?.mid}
      />
    </LocalizedMessageContext.Provider>
  );
}

export const Head = ({ data: { strapiLocalizedMessage = {}, strapiOgImage = {} }, pageContext: { langKey } }) => {
	const messages = strapiLocalizedMessage.localizations.data.filter(({ attributes: { locale } }) => locale === langKey)[0].attributes;
  const fieldName = `${langKey !== 'zh-Hans' ? langKey : 'zhHans'}`;
  const ogImage = strapiOgImage[fieldName].formats.large.url;
  return (
    <>
      <html lang={langKey} className="question" css={{ height: '100% !important' }} />
      <meta name="description" content={messages['metaDescriptionEvent']} />
      <meta name="og:url" content={process.env.GATSBY_HOST} />
      <meta name="og:title" content={messages['metaTitle']} />
      <meta name="og:image" content={ogImage} />
      <meta name="og:type" content="website" />
      <meta name="twitter:title" content={messages['metaTitle']} />
      <meta name="twitter:description" content={messages['metaDescriptionEvent']} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:src" content={ogImage} />
      <title>{messages['metaTitle']}</title>
      <body className={`lang-${langKey} question`} />
    </>
  );
}

export default QuestionPage;
