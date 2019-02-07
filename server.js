var Hapi = require('hapi');
var server = new Hapi.Server();

var portSetting = Number(process.env.PORT) || '8080';

var redisSetting = process.env.REDIS_URL;

console.log('env redis config:', redisSetting);

server.connection({
  host: '0.0.0.0',
  port: portSetting,
});
setTimeout(function () {
  server.register([require('inert'), require('hapi-error')], function () {
    server.route([{
        method: 'GET',
        path: '/',
        handler: {
          file: 'index.html'
        }
      },
      {
        method: 'GET',
        path: '/style.css',
        handler: {
          file: './style.css'
        }
      },
      {
        method: 'GET',
        path: '/client.js',
        handler: {
          file: './lib/client.js'
        }
      },
      {
        method: 'GET',
        path: '/favicon.ico',
        handler: {
          file: './vendor/favicon.ico'
        }
      },
      {
        method: 'GET',
        path: '/cookies.min.js',
        handler: {
          file: './vendor/cookies.min.js'
        }
      },
      {
        method: 'GET',
        path: '/jquery-1.11.3.js',
        handler: {
          file: './vendor/jquery-1.11.3.js'
        }
      },
      {
        method: 'GET',
        path: '/socket.io-1.3.5.js',
        handler: {
          file: './vendor/socket.io-1.3.5.js'
        }
      },
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

    server.start(function () {
      require('./lib/chat').init(server.listener, function () {
        console.log('REDISCLOUD_URL:', process.env.REDISCLOUD_URL);
        console.log('REDIS_URL:', process.env.REDIS_URL);
        console.log(
          'Feeling Chatty?',
          'listening on: http://0.0.0.0:' + portSetting
        );
      });
    });
  });
}, 30000);
module.exports = server;
