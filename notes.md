
deployment

packages
    1. helmet - middleware -
    2. compression - compress http response we send to client

install heroku cli
heroku -v
heroku login
NOTE: if not working, if you in proxy server
>> export HTTP_PROXY=http://proxy.server.com:8080

 add below to package json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
  },
  "engines": {
    "node": "12.13.0" <!--  node version -->
  }

to create heroku app on server
>> heroku create APP_NAME

git push heroku master (heroku-repo name, master - branch name)
 
heroku logs

goto web > more > console 
type "bash"


set env var on server(heroku)
>> heroku config:set vidly_jwtPrivateKey=keyToset

set node env to production
>> heroku config:set NODE_ENV=production  

list set of env vars
>> heroku config

heroku scales with dinos(ex: pods)
env vars will share to all dionos
