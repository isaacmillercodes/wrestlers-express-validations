(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const wrestlerRoutes = require('../routes/wrestlers');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/wrestlers', wrestlerRoutes);
  };

})(module.exports);
