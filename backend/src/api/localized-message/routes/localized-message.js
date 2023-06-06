'use strict';

/**
 * localized-message router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::localized-message.localized-message');
