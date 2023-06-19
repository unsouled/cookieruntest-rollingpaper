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

const IndexPage = ({ data: { strapiLocalizedMessage = {}, strapiBannerImage = {} }, pageContext: { langKey } }) => {
  const [counter, setCounter] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);

  const fieldName = `small${langKey !== 'zh-hans' ? langKey.charAt(0).toUpperCase() + langKey.slice(1) : 'ZhHans'}`;
  const banner = strapiBannerImage[fieldName];

	const messages = strapiLocalizedMessage.localizations.data.filter(({ attributes: { locale } }) => locale === langKey)[0].attributes;
  console.log(messages);
  console.log(strapiBannerImage);
  console.log(fieldName);

  return (
    <LocalizedMessageContext.Provider value={messages}>
      <IndexMain showModal={() => setModalVisible(true)} lang={langKey} banner={banner} />
      <LanguageModal isOpen={modalVisible} onRequestClose={closeModal} lang={langKey} />
    </LocalizedMessageContext.Provider>
  );
}

export default IndexPage;

export const Head = ({ pageContext: { langKey } }) => (
  <>
    <html lang={langKey} />
    <title>Cookierun</title>
    <body className={`lang-${langKey} index`} />
  </>
);
