exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  [
    ['ko', 'ITJ', 'a0561aa2'],
    ['ko', 'ITP', 'c8d22567'],
    ['ko', 'ETJ', '569f0735'],
    ['ko', 'ETP', '400193f4'],
    ['ko', 'IFJ', '5fc93bb6'],
    ['ko', 'IFP', '92f5c54e'],
    ['ko', 'EFJ', 'd2ffa229'],
    ['ko', 'EFP', '4d48b9f5'],
    ['en', 'ITJ', 'a0561aa2'],
    ['en', 'ITP', 'c8d22567'],
    ['en', 'ETJ', '569f0735'],
    ['en', 'ETP', '400193f4'],
    ['en', 'IFJ', '5fc93bb6'],
    ['en', 'IFP', '92f5c54e'],
    ['en', 'EFJ', 'd2ffa229'],
    ['en', 'EFP', '4d48b9f5'],
    ['ja', 'ITJ', 'a0561aa2'],
    ['ja', 'ITP', 'c8d22567'],
    ['ja', 'ETJ', '569f0735'],
    ['ja', 'ETP', '400193f4'],
    ['ja', 'IFJ', '5fc93bb6'],
    ['ja', 'IFP', '92f5c54e'],
    ['ja', 'EFJ', 'd2ffa229'],
    ['ja', 'EFP', '4d48b9f5'],
    ['zh', 'ITJ', 'a0561aa2'],
    ['zh', 'ITP', 'c8d22567'],
    ['zh', 'ETJ', '569f0735'],
    ['zh', 'ETP', '400193f4'],
    ['zh', 'IFJ', '5fc93bb6'],
    ['zh', 'IFP', '92f5c54e'],
    ['zh', 'EFJ', 'd2ffa229'],
    ['zh', 'EFP', '4d48b9f5'],
    ['th', 'ITJ', 'a0561aa2'],
    ['th', 'ITP', 'c8d22567'],
    ['th', 'ETJ', '569f0735'],
    ['th', 'ETP', '400193f4'],
    ['th', 'IFJ', '5fc93bb6'],
    ['th', 'IFP', '92f5c54e'],
    ['th', 'EFJ', 'd2ffa229'],
    ['th', 'EFP', '4d48b9f5']
  ].forEach(([ langKey, _, code ])=> {
    actions.createPage({
      path: `${langKey}/result/${code}`,
      component: require.resolve(`./src/components/ResultMain/index.js`),
      context: { langKey, code },
    });
  });
  /*
  data.allContentfulResult.nodes.forEach(node => {
    const langKey = node.node_locale.split('-')[0];
    actions.createPage({
      path: `${langKey}/result/${node.code}`,
      component: require.resolve(`./src/components/ResultMain/index.js`),
      context: { siteData, eventData, seoData, node, lang: langKey },
    });
  });
  */
}
