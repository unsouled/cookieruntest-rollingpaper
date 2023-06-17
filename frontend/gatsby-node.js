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
              eventDescriptionRich
              eventHashtagsRich
              couponGiftReceivedRich
              couponSentRich
              couponGameName
              couponLink
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
    }
  `);
  supportedLocales.forEach(langKey => {
    resultCode.forEach(code => {
      const hashedCode = hash(code); 
      console.log(hashedCode);
      const messages = data.strapiLocalizedMessage.localizations.data.filter(({ attributes: { locale } }) => locale === langKey)[0].attributes;
      const eventImage = data.strapiEventImage;
      const resultImage = data.allStrapiResultImage.nodes.filter(({ code }) => code === hashedCode);

      const resultImageData = resultImage.length > 0 ? resultImage[0][langKey !== 'zh-Hans' ? langKey : 'zhHans'] : null;
      
      actions.createPage({
        path: `${langKey}/result/${hashedCode}`,
        component: require.resolve(`./src/components/ResultMain/index.js`),
        context: { langKey, code: hashedCode, localizedMessages: messages, eventImage, resultImage: resultImageData },
      });
    });
  });


}
