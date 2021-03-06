# Events module
[![Build Status](https://travis-ci.org/AEGEE/oms-events.svg?branch=dev)](https://travis-ci.org/AEGEE/oms-events)
[![Coverage Status](https://coveralls.io/repos/github/AEGEE/oms-events/badge.svg?branch=dev)](https://coveralls.io/github/AEGEE/oms-events?branch=dev)

## General

The event module shall implement everything related to basic events, giving a common ground for non-statutory events, statutory events and SUs. Find the API documentation on [Apiary](http://docs.omsevents.apiary.io/#). 

Also, any help is appreciated! Just contact Nico (AEGEE-Dresden, blacksph3re) and/or check the instructions in the [wiki](https://oms-project.atlassian.net/wiki/).

## Set up

### Installing

There are some things you have to do to get this service running.
* This service depends on [oms-core](https://github.com/AEGEE/oms-neo-core), get it up and running. I advise to use [homestead](https://github.com/laravel/homestead) as a virtualisation
* Further dependencies (included in homestead): 
  * nodejs including npm
  * mongodb
* Git clone this repo and cd into it
* `npm install` to install all necessary dependencies
* If you want, edit /lib/config/config.json to your needs.
* Set up static serving with nginx (if you are using another web server, good luck.)
```shell
sudo ln -s your/path/to/oms-events/nginx.conf /etc/nginx/sites-enables/omsevents
sudo systemctl reload nginx.service
```

Now you will need to connect the microservice to the core.
* Edit lib/config/config.json and put the secret that you obtained from the core.
* Start the server with `node lib/server.js`
* Query the running server on `curl localhost:8083/api/registerMicroservice` to fire up registration. *(if you fucked up the nginx config you can also query `localhost:8082`)*
* Enable it in the core backend and refresh the page.

### Get it running


To get it running, just type 
```
node lib/server.js
```
and you should have a working instance. If you also want to be able to read the console output, run
`sudo npm install bunyan -g` to install bunyan logger and start the server with
```
node lib/server.js | bunyan --color --output short
```



## LICENSE

Copyright 2015-2016 Fabrizio Bellicano (AEGEE-Europe) and contributors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

<http://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.