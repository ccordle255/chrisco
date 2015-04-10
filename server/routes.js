/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));

  app.route('/portfolio/r2pg/')
    .get(function(req, res) {
      res.sendfile('portfolio/r2pg/SmashBots/robot_frame.html');
    });

  app.route('/portfolio/r2pg/*')
    .get(function(req, res) {
      var subPath = req.path.split('/portfolio/r2pg/')[1];
      res.sendfile('portfolio/r2pg/SmashBots/' + subPath);
    });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|portfolio|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
