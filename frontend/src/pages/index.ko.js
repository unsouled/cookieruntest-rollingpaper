import React, { useState } from 'react';
import { graphql, navigate } from 'gatsby';
import styled from '@emotion/styled';
import IndexMain from '/src/components/IndexMain';
import LanguageModal from '/src/components/LanguageModal';
import LocalizedMessageContext from '/src/contexts/LocalizedMessageContext';

import { useContext } from 'react';

import Modal from 'react-modal';
Modal.setAppElement('#___gatsby');

export const query = graphql`
  query {
    strapiLocalizedMessage {
			localizations {
				data {
					id
					attributes {
            alertCopied
						title
						titleRich
						description
						description1
						description2
						participantsText
						startText
            copyLinkText
						selectLanguageText
						copyright
						locale
            metaTitle
            metaDescriptionEvent
            metaDescription
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

const IndexPage = ({ data: { strapiLocalizedMessage = {}, strapiBannerImage = {} }, pageContext: { langKey }, location }) => {
  const [counter, setCounter] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);

  const fieldName = `small${langKey !== 'zh-Hans' ? langKey.charAt(0).toUpperCase() + langKey.slice(1) : 'ZhHans'}`;
  const banner = strapiBannerImage[fieldName];

	const messages = strapiLocalizedMessage.localizations.data.filter(({ attributes: { locale } }) => locale === langKey)[0].attributes;

  return (
    <LocalizedMessageContext.Provider value={messages}>
      <IndexMain showModal={() => setModalVisible(true)} lang={langKey} banner={banner}
        mid={location?.state?.mid}
      />
      <LanguageModal isOpen={modalVisible} onRequestClose={closeModal} lang={langKey} mid={location?.state?.mid} />
    </LocalizedMessageContext.Provider>
  );
}

export default IndexPage;

export const Head = ({ data: { strapiLocalizedMessage = {}, strapiOgImage = {} }, pageContext: { langKey } }) => {
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
