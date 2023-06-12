/**
 * @type {import('gatsby').GatsbyConfig}
 */
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

console.log(process.env);

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: [
    'answer', 
    'question', 
    'result',
    'cookie',
  ],
  singleTypes: [
    'localized-message'
  ],
  remoteFileHeaders: {
    /**
     * Customized request headers
     * For http request with a image or other files need authorization
     * For expamle: Fetch a CDN file which has a security config when gatsby building needs
     */
    // Referer: 'https://your-site-domain/',
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
};

module.exports = {
  siteMetadata: {
    title: `Cookierun Rollingpaper`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },
    'gatsby-plugin-emotion', 
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        // The unique name for each instance
        name: `pages`,
        // Path to the directory
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag', 
      options: {
        trackingIds: [
          'G-FWE2DSY6M0',
          'GTM-PG4XXFP'
        ]
      },
    },
    'gatsby-plugin-sitemap', 
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        'icon': 'src/images/icon.png'
      }
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {        
        langKeyDefault: 'ko',
        useLangKeyLayout: false
      },
    }
  ]
};
