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
    'people-type',
    'people-type-image',
    'question', 
    'result',
    'result-image',
    'banner-image',
  ],
  singleTypes: [
    'event-image',
    'localized-message',
    'logo-image',
    'og-image',
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
    title: `Cookie Run Test`,
    description: ``,
    author: 'DEVSISTERS',
    languages: ['ko', 'en', 'th', 'zh', 'ja'],
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
    copyright:  '© 2022 DEVSISTERS Corp. All Rights Reserved.'
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
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-plugin-google-gtag', 
      options: {
        trackingIds: [
          'GTM-KC9B25Q'
        ]
      },
    },
    'gatsby-plugin-sitemap', 
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        'icon': 'src/images/img-icon-cro.png'
      }
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {        
        langKeyDefault: 'ko',
        useLangKeyLayout: false
      },
    },
  ]
};
