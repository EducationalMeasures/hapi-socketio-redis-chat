var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({
  host: '0.0.0.0',
  port: Number(process.env.PORT),
});

server.register([require('inert'), require('hapi-error')], function() {
  server.route([
    { method: 'GET', path: '/', handler: { file: 'index.html' } },

    { method: 'GET', path: '/client.js', handler: { file: './lib/client.js' } },
    { method: 'GET', path: '/favicon.ico', handler: { file: './vendor/favicon.ico' } },
    { method: 'GET', path: '/cookies.min.js', handler: { file: './vendor/cookies.min.js' } },
    { method: 'GET', path: '/jquery-1.11.3.js', handler: { file: './vendor/jquery-1.11.3.js' } },
    { method: 'GET', path: '/socket.io-1.3.5.js', handler: { file: './vendor/socket.io-1.3.5.js' } },
    {
      method: 'GET',
      path: '/load',
      handler: require('./lib/load_messages').load,
    },
    {
      method: 'GET',
      path: '/elm',
      handler: {
        file: './elm/index.html',
      },
    },
    {
      method: 'GET',
      path: '/js/app.js',
      handler: {
        file: './elm/js/app.js',
      },
    },
    {
      method: 'GET',
      path: '/js/javascript.js',
      handler: {
        file: './elm/js/javascript.js',
      },
    },
  ]);

  server.start(function() {
    require('./lib/chat').init(server.listener, function() {
      // console.log('REDISCLOUD_URL:', process.env.REDISCLOUD_URL);
      console.log(
        'Feeling Chatty?',
        'listening on: http://127.0.0.1:' + process.env.PORT
      );
    });
  });
});

module.exports = server;
