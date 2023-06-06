'use strict';

/**
 * localized-message service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::localized-message.localized-message');
