/**
 * routeExist
 *
 * Check whether the given route name exist in the routeTemplates directory
 */

/* eslint strict: ["off"] */

'use strict';

// const fs = require('fs');
// const path = require('path');
const routeTemplates = require('../../src/ui/common/routes/routeTemplates');

function routeExist(routeName) {
  const isRouteExist = Object.keys(routeTemplates).filter(route => routeName === route).length;
  return isRouteExist;
}

module.exports = routeExist;
