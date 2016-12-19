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

### Development environment with docker-compose

You can start all required o2r microservices (using latest images from [Docker Hub](https://hub.docker.com/r/o2rproject)) with just two commands using `docker-compose` (version `>= 1.6.0`).

There are several `docker-compose` configurations in the directory `test` of this repository starting a number of containers.

- `docker-compose-db.yml` starts the required databases and configures them. While this could be integrated into the other configurations, it is a lot easier to make sure the DBs are up and running before starting the microservices.
  - `mongodb` MongoDB
  - `elasticsearch` Elasticsearch
  - `mongoadmin` An instance of admin-mongo at port `1234`
- `docker-compose.yml` starts all microservices as containers downloaded [from o2rproject on Docker Hub](https://hub.docker.com/r/o2rproject/) and mounts the client (the repository of this file) from the host into an nginx container. _The client must be build on the host!_
- `docker-compose-local.yml` starts all microservices as containers that were build locally. Only useful for testing container-packaging of apps. The microservice image names are simply the name without leading `o2r-`, so `muncher`, `bouncer`, etc. The client is mounted from the host, see above.
- `docker-compose-local-platformcontainer.yml` the same as the previous configuration, but the client is also started in a container based on the local image named `platform`.
- `docker-compose-remote.yml` starts all microservices as well as the client as containers from Docker Hub.

The configurations all use a common volume `o2r_test_storage` (with the global name `test_o2r_test_storage` because the name of the directory of this file is preprended by Docker), and a common network `o2rnet` (with the global name `test_o2rnet`).

The volume and network can be inspected for development purposes:

```bash
docker volume ls
docker volume inspect test_o2r_test_storage
docker network ls
docker network inspect test_o2rnet
```

#### Host preparation

Elasticsearch requires the ability to create many memory-mapped areas ([mmaps](https://en.wikipedia.org/wiki/Mmap)s) for fast access. The usual max map count check setting is [configured to low on many computers](https://www.elastic.co/guide/en/elasticsearch/reference/5.0/_maximum_map_count_check.html). You must configure `vm.max_map_count` on the host to be at least `262144`, e.g. on Linux via `sysctl`. You can find instructions for all hosts (including Docker Toolbox) in the [Elasticsearch docs](https://www.elastic.co/guide/en/elasticsearch/reference/5.0/docker.html#docker-cli-run-prod-mode).

#### Linux

```bash
docker-compose --file test/docker-compose-db.yml up -d
# wait at least 8 seconds for configuration container to run.
OAUTH_CLIENT_ID=<...> OAUTH_CLIENT_SECRET=<...> OAUTH_URL_CALLBACK=<...> docker-compose --file test/docker-compose.yml up
# using locally build images (different naming convention)
# OAUTH_CLIENT_ID=<...> OAUTH_CLIENT_SECRET=<...> OAUTH_URL_CALLBACK=<...> docker-compose --file test/docker-compose-local.yml up
```

#### Windows

The environmental variables must be passed seperately on Windows, followed by the docker-compose command:

```powershell
$env:OAUTH_CLIENT_ID = <...>
$env:OAUTH_CLIENT_SECRET = <...>
$env:OAUTH_URL_CALLBACK = <...>
docker-compose --file test/docker-compose-db.yml up -d
```

The services are available at http://localhost (or on Windows/with docker-machine at http://<machine-ip>/). An adminMongo instance is running at http://localhost:1234. In mongoAdming please manually create a connection to host `db`, i.e. `mongodb://db:27017` to edit the database (click "Update" first if you edit the existing connection, then "Connect").

_Hint:_ You can remove the storage volumes by running `docker-compose down -v`

### adminMongo

adminMongo can also be run standalone (see `docker-compose-db.yml`). If you run the o2r microservicese locally, the connection path has to be changed to `mongodb://db:27017`.

### Proxy for o2r microservices

If you run the o2r microservices locally, it is useful to run a local nginx to make all API endpoints available under one port (`80`), and use the same nginx to serve the application in this repo. A nginx configuration file to achieve this is `test/nginx.conf`.

```bash
#sed -i -e 's|http://o2r.uni-muenster.de/api/v1|http://localhost/api/v1|g' js/app.js
docker run --rm --name o2r-platform -p 80:80 -v $(pwd)/test/nginx.conf:/etc/nginx/nginx.conf -v $(pwd)/client:/etc/nginx/html $(pwd)/test:/etc/nginx/html/test nginx
```

If you run this in a Makefile, `$(CURDIR)` will come in handy to create the mount paths instead of using `$(pwd)`.

## License

o2r-platform is licensed under Apache License, Version 2.0, see file LICENSE.
Copyright &copy; 2016 - o2r project.
