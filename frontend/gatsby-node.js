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
      actions.createPage({
        path: `${langKey}/result/${hashedCode}`,
        component: require.resolve(`./src/components/ResultMain/index.js`),
        context: { langKey, code: hashedCode, localizedMessages: messages },
      });
      console.log(`${langKey}/result/${hashedCode}`);
    });
  });


}
