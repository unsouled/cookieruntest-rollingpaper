'use strict';

/**
 * og-image service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::og-image.og-image');
