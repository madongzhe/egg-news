'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./article')(app);
  require('./subscribe')(app);
  require('./tbk')(app);
};
