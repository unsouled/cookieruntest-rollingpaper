const hash = (b) => {
  for (var a=0,c=b.length;c--;) {
    a+=b.charCodeAt(c);
    a+=a<<10;
    a^=a>>6;
    a+=a<<3;
    a^=a>>11;
  }
  return ((a+(a<<15)&4294967295)>>>0).toString(16);
};

const supportedLocales = [
  'ko', 'en', 'ja', 'th', 'zh', 'zh-Hans'
];
const resultCode = [
  'ITJ',
  'ITP',
  'ETJ',
  'ETP',
  'IFJ',
  'IFP',
  'EFJ',
  'EFP'
];

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { data } = await graphql(`
    query {
      strapiLocalizedMessage {
        localizations {
          data {
            attributes {
              locale
              alertInvalid
              alertAlreadyReceived
              eventCopyText
              eventDescription
              eventDuration
              eventEndAt
              eventHashtags
              eventName
              eventNotices
              eventParticipationDescription
              eventPrize1Name
              eventParticipationText
              eventPrize1Sub
              eventPrize1Winners
              eventPrize2Name
              eventPrize2Winners
              eventPrize3Winners
              eventPrize3Name
              eventStartAt
              resultBestMatch
              resultDescription
              resultDownloadSticker
              resultShare
              resultRetest
              resultTitle
              resultTryCharacterTest
              resultTryVillainTest
              resultWorstMatch
              couponGiftReceived
              couponLinkToGame
              couponInputId
              couponMyInfo
              couponReceiveGift
              couponSent
              couponShowResult
              couponTryLater
              participantsDisclaimer
              eventDescriptionRich
              eventHashtagsRich
              couponGiftReceivedRich
              couponSentRich
              couponGameName
              couponLink
              metaResultTitle
              metaDescriptionEvent
              metaDescription
            }
          }
        }
      }
      strapiEventImage {
        ja {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 320,
                height: 320
              )
            }
          }
        }
        ko {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 320,
                height: 320
              )
            }
          }
        }
        en {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 320,
                height: 320
              )
            }
          }
        }
        th {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 320,
                height: 320
              )
            }
          }
        }
        zh {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 320,
                height: 320
              )
            }
          }
        }
        zhHans {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 320,
                height: 320
              )
            }
          }
        }
      }

      allStrapiResult {
        nodes {
          code
          name
          localizations {
            data {
              attributes {
                locale
                name
              }
            }
          }
          bestMatch {
            localizations {
              data {
                attributes {
                  code
                  nameRich
                  locale
                }
              }
            }
          }
          worstMatch {
            localizations {
              data {
                attributes {
                  code
                  nameRich
                  locale
                }
              }
            }
          }
        }
      }

      allStrapiResultImage {
        nodes {
          code
          ko {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 320,
                  height: 450
                )
              }
            }
          }
          en {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 320,
                  height: 450
                )
              }
            }
          }
          ja {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 320,
                  height: 450
                )
              }
            }
          }
          th {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 320,
                  height: 450
                )
              }
            }
          }
          zh {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 320,
                  height: 450
                )
              }
            }
          }
          zhHans {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 320,
                  height: 450
                )
              }
            }
          }
        }
      }

      allStrapiPeopleTypeImage {
        nodes {
          code
          bgImage {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
      strapiBannerImage {
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
  `);
  supportedLocales.forEach(langKey => {
    resultCode.forEach(code => {
      const hashedCode = hash(code); 
      const messages = data.strapiLocalizedMessage.localizations.data.filter(({ attributes: { locale } }) => locale === langKey)[0].attributes;
      const eventImage = data.strapiEventImage;
      const ogImage = data.strapiOgImage;
      const resultImage = data.allStrapiResultImage.nodes.filter(({ code }) => code === hashedCode);

      const result = data.allStrapiResult.nodes.filter(({ code }) => code === hashedCode);

      const resultImageData = resultImage.length > 0 ? resultImage[0][langKey !== 'zh-Hans' ? langKey : 'zhHans'] : null;
      const resultData = result.length > 0 ? result[0] : null;

      const peopleTypeImages = data.allStrapiPeopleTypeImage.nodes
      const fieldName = `big${langKey !== 'zh-Hans' ? langKey.charAt(0).toUpperCase() + langKey.slice(1) : 'ZhHans'}`;
      const banner = data.strapiBannerImage[fieldName];

      actions.createPage({
        path: `${langKey}/result/${hashedCode}`,
        component: require.resolve(`./src/components/ResultMain/index.js`),
        context: { langKey, code: hashedCode, localizedMessages: messages, eventImage, resultImage: resultImageData, result: resultData, peopleTypeImages, banner, ogImage },
      });
    });
  });
}
