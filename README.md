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
window.__env.userLevels = {};
window.__env.userLevels.admin = /*Integer containing the required user level for admin status*/;
window.__env.userLevels.regular = /*Integer containing the required user level for regular status*/;
window.__env.userLevels.restricted = /*Integer containing the required user level for restricted status*/;
```


## Development

### Disable tracking

During development it is reasonable to disable the user tracking in the config file.

```JavaScript
window.__env.disableTracking = true;
```

### Development environment with Docker Compose

You can start all required o2r microservices (using latest images from [Docker Hub](https://hub.docker.com/r/o2rproject)) with just two commands using `docker-compose` (version `>= 1.6.0`).

There are several `docker-compose` configurations in the directory `test` of this repository starting a number of containers.

- `docker-compose-remote.yml` starts all microservices as well as the client as containers from Docker Hub. _This is probably want you want to simply run the platform._
- `docker-compose-remote-toolbox.yml` starts all microservices as well as the client as containers from Docker Hub and mounts a client configuration file suitable for typical settings when using Docker Toolbox.
- `docker-compose-db.yml` starts the required databases and configures them. While this could be integrated into the other configurations, it is a lot easier to make sure the DBs are up and running before starting the microservices.
  - `mongodb` MongoDB
  - `elasticsearch` Elasticsearch
  - `mongoadmin` An instance of admin-mongo at port `1234`
- `docker-compose.yml` starts all microservices as containers downloaded [from o2rproject on Docker Hub](https://hub.docker.com/r/o2rproject/) and mounts the client (the repository of this file) from the host into an nginx container. _The client must be build on the host!_
- `docker-compose-host-nginx.yml` is a variant of the above but the nginx must run on the host and is not run in a container.
- `docker-compose-local.yml` starts all microservices as containers that were build locally. Only useful for testing container-packaging of apps. The microservice image names are simply the name without leading `o2r-`, so `muncher`, `bouncer`, etc. The client is mounted from the host, see above.
- `docker-compose-local-platformcontainer.yml` the same as the previous configuration, but the client is also started in a container based on the local image named `platform`.

The configurations all use a common volume `o2r_test_storage` (with the global name `test_o2r_test_storage` because the name of the directory of this file is preprended by Docker), and a common network `o2rnet` (with the global name `test_o2rnet`).

The volume and network can be inspected for development purposes:

```bash
docker volume ls
docker volume inspect test_o2r_test_storage
docker network ls
docker network inspect test_o2rnet
```

You can remove the storage volumes by running `docker-compose down -v`.

#### Host preparation

Elasticsearch requires the ability to create many memory-mapped areas ([mmaps](https://en.wikipedia.org/wiki/Mmap)s) for fast access. The usual max map count check setting is [configured to low on many computers](https://www.elastic.co/guide/en/elasticsearch/reference/5.0/_maximum_map_count_check.html). You must configure `vm.max_map_count` on the host to be at least `262144`, e.g. on Linux via `sysctl`. You can find instructions for all hosts (including Docker Toolbox) in the [Elasticsearch docs](https://www.elastic.co/guide/en/elasticsearch/reference/5.0/docker.html#docker-cli-run-prod-mode).

#### Required settings

Some of the settings to run the platform cannot be published. These must be provided at runtime using envionment variables as is described in the OS-specific instructions below. Not providing one of these paramters results in untested behaviour.

The parameters are as follows:

- `OAUTH_CLIENT_ID` identifier for the platform with auth provider
- `OAUTH_CLIENT_SECRET` password for identification with the auth provider
- `OAUTH_URL_CALLBACK` the URL that the authentication service redirects the user to, important to complete the authentication (start with machine IP when using Docker Toolbox)
- `ZENODO_TOKEN` authentication token for [Zenodo](https://zenodo.org/), required for shipping to Zenodo (sandbox)

#### Database adminstration

An adminMongo instance is running at http://localhost:1234. In mongoAdmin please manually create a connection to host `db`, i.e. `mongodb://db:27017` to edit the database (click "Update" first if you edit the existing connection, then "Connect").

#### Linux

```bash
docker-compose --file test/docker-compose-db.yml up -d
# wait at least 8 seconds for configuration container to run.
OAUTH_CLIENT_ID=<...> OAUTH_CLIENT_SECRET=<...> OAUTH_URL_CALLBACK=<...> ZENODO_TOKEN=<...> docker-compose --file test/docker-compose.yml up
```

#### Windows with Docker for Windows

The environmental variables must be passed seperately on Windows, followed by the docker-compose commands:

```powershell
$env:OAUTH_CLIENT_ID = <...>
$env:OAUTH_CLIENT_SECRET = <...>
$env:OAUTH_URL_CALLBACK = <...>
$env:ZENODO_TOKEN = <...>
docker-compose --file test/docker-compose-db.yml up -d
docker-compose --file test/docker-compose-remote.yml up
```

The services are available at `http://localhost`.

#### Windows with Docker Toolbox

When using Compose with Docker Toolbox/Machine on Windows, [volume paths are no longer converted from by default](https://github.com/docker/compose/releases/tag/1.9.0), but we need this conversion to be able to mount the docker volume to the o2r microservices. To re-enable this conversion for `docker-compose >= 1.9.0` set the environment variable `COMPOSE_CONVERT_WINDOWS_PATHS=1`.

Also, the client's defaults (i.e. using `localhost`) does not work. We must mount a config file to point the API to the correct location, see `test/config-toolbox.js`, and use the prepared configuration file `docker-compose-remote-toolbox.yml`.

```bash
docker-compose --file test/docker-compose-db.yml up -d
COMPOSE_CONVERT_WINDOWS_PATHS=1 OAUTH_CLIENT_ID=<...> OAUTH_CLIENT_SECRET=<...> OAUTH_URL_CALLBACK=<...> ZENODO_TOKEN=<...> docker-compose --file test/docker-compose.yml up
```

The services are available at `http://<machine-ip>`.

#### Restart from scratch

You can remove all containers and images by o2r with the following two commands on Linux:

```bash
docker ps -a | grep o2r | awk '{print $1}' | xargs docker rm -f
docker images | grep o2r | awk '{print $3}' | xargs docker rmi --force
```

### Proxy for o2r microservices

If you run the o2r microservices locally as a developer, it is useful to run a local nginx to make all API endpoints available under one port (`80`), and use the same nginx to serve the application in this repo. A nginx configuration file to achieve this is `test/nginx.conf`.

```bash
#sed -i -e 's|http://o2r.uni-muenster.de/api/v1|http://localhost/api/v1|g' js/app.js
docker run --rm --name o2r-platform -p 80:80 -v $(pwd)/test/nginx.conf:/etc/nginx/nginx.conf -v $(pwd)/client:/etc/nginx/html $(pwd)/test:/etc/nginx/html/test nginx
```

If you run this in a Makefile, `$(CURDIR)` will come in handy to create the mount paths instead of using `$(pwd)`.

### Elasticsearch

If you update the metadata structure of `compendium` or `jobs` and you already have indexed these in elasticsearch, you have to drop the elasticsearch `o2r`-index via

```bash
curl -XDELETE 'http://172.17.0.3:9200/o2r'
```

Otherwise, new compendia will not be indexed anymore.

## Platform Version
0.9.0

## License

o2r-platform is licensed under Apache License, Version 2.0, see file LICENSE.
Copyright &copy; 2017 - o2r project.
