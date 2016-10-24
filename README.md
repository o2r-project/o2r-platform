# The o2r-platform

_Leveraging reproducible research_

## Libraries

- AngularJS
- Bootstrap

## Dependencies

- [bower](https://bower.io/)

## Install

```bash
bower install
```

## Configure

Create a copy of the file `client/app/config/configSample.js` and name it `client/app/config/config.js`. You must configure the required application settings in this file, which is not part of the version control:

```JavaScript
    window.__env.server = /*String containing server address*/;
    window.__env.api = /*String containing base api*/;
    window.__env.sizeRestriction = /*integer*/;
    window.__env.disableTracking = /*true/false, default is false*/;
    window.__env.enableDebug = /*true/false, default is false*/;
    window.__env.piwik = /*String containing piwik server adress*/;
```


## Development

### Disable tracking

During development it is reasonable to disable the user tracking in the config file.

```JavaScript
    window.__env.disableTracking = true;
```

### docker-compose

Start all required o2r microservices with just one command using `docker-compose`:

```bash

OAUTH_CLIENT_ID=<...> OAUTH_CLIENT_SECRET=<...> OAUTH_URL_CALLBACK=<...> docker-compose up
```

The services are available at http://localhost (or on Windows/with docker-machine at http://<machine-ip>/), and a adminMongo instance is running at http://localhost:1234. Create a connection to host `db`, i.e. `mongodb://db:27017` to edit the database.

You can remove the storage volume by running `docker-compose down -v`

### adminMongo

adminMongo can be reached via `localhost:1234`. If you run the o2r microservicese locally, the connection path has to be changed to 


```
mongodb://db:27017
```

### Proxy for o2r microservices

If you run the o2r microservices locally, it is useful to run a local nginx to make all API endpoints available under one port (`80`), and use the same nginx to serve the application in this repo. A nginx configuration file to achieve this is `test/nginx.conf`.

```bash
#sed -i -e 's|http://o2r.uni-muenster.de/api/v1|http://localhost/api/v1|g' js/app.js
docker run --rm --name o2r-platform -p 80:80 -v $(pwd)/test/nginx.conf:/etc/nginx/nginx.conf -v $(pwd):/etc/nginx/html nginx
```

If you run this in a Makefile, `$(CURDIR)` will come in handy to create the mount paths instead of using `$(pwd)`.

## License

o2r-platform is licensed under Apache License, Version 2.0, see file LICENSE.
Copyright &copy; 2016 - o2r project.
