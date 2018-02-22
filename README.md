# The o2r platform

_Leveraging reproducible research_ by providing a powerful user interface for the [o2r Web API](http://o2r.info/o2r-web-api/).

## Libraries

- AngularJS
- Bootstrap

## Dependencies

- [bower](https://bower.io/)

## Install

```bash
bower install
```

## Run only platform project in a container

```bash
docker build --tag platform .

docker run -d -p 80:80 platform
```

## Configure

Create a copy of the file `client/app/config/configSample.js` and name it `client/app/config/config.js`.
You can configure the required application settings in this file `../config.js`:

```JavaScript
window.__env.server = /*String containing server address*/;
window.__env.api = /*String containing base api*/;
window.__env.sizeRestriction = /*integer*/;
window.__env.disableTracking = /*true/false, default is true*/;
window.__env.enableDebug = /*true/false, default is false*/;
window.__env.piwik = /*String containing Piwik server address*/;
window.__env.userLevels = {};
window.__env.userLevels.admin = /*Integer containing the required user level for admin status*/;
window.__env.userLevels.regular = /*Integer containing the required user level for regular status*/;
window.__env.userLevels.restricted = /*Integer containing the required user level for restricted status*/;
```

## Development environment with Docker Compose

You can start all required o2r microservices (using latest images from [Docker Hub](https://hub.docker.com/r/o2rproject)) with just two commands using `docker-compose` (version `1.9.0+`) and Docker (version `1.13.0+`).

First, **read the instructions on "Basics" and "Prerequisites" to prepare your host machine in the [`reference-implementation`](https://github.com/o2r-project/reference-implementation) project**.

This project contains one `docker-compose` configuration (file `docker-compose.yml`) to run all microservices & databases, and mount the client application directly from the source directory `client`.
If you see an error related to the MongoDB in the first "up", abort and restart.

_The client must be build on the host!_

**Running the platform**

The services can be started using `docker-compose` on the following platforms

* Unix based systems
* Windows with Docker for Windows
* Windows with Docker Toolbox

 by running:

```bash
docker-compose up
```

## Configuration (optional)

The platform provides two options to pass on environment variables to configure authorization, remote repositories and the slack monitoring bot:

1. The `.env` file contains default values to configure the platform to work with the offline OAuth server o2r-guestlister. Note that quotation marks are not parsed but instead treated as part of the variable value. For more information on how the `.env` file works, see the docker-compose [documentation](https://docs.docker.com/compose/env-file/).

2. Environment variables defined in the shell have priority over the values set in the `.env` file. Setting the variables in the shell allows to override the default configuration, for example to use [ORCID](https://members.orcid.org/api/oauth2) as the OAuth server:

```bash
OAUTH_CLIENT_ID=<...> OAUTH_CLIENT_SECRET=<...> OAUTH_URL_CALLBACK=<...> SHIPPER_REPO_TOKENS=<...> docker-compose up
```

Strings containing quotation marks (e.g. `SHIPPER_REPO_TOKENS`) have to be escaped.

The environment parameters are as follows:

- `OAUTH_CLIENT_ID` identifier for the platform with auth provider
- `OAUTH_CLIENT_SECRET` password for identification with the auth provider
- `OAUTH_URL_CALLBACK` the URL that the authentication service redirects the user to, important to complete the authentication, probably `http://localhost/api/v1/auth/login` (includes with machine IP when using Docker Toolbox)
- `SHIPPER_REPO_TOKENS` a JSON object, that holds the authentication tokens for shipping to remote repositories such as [Zenodo](https://zenodo.org/) (optional). Must have the form `{"zenodo": "$ZENODO_TOKEN", "zenodo_sandbox": "$ZENODO_SANDBOX_TOKEN", "download": "" }`. Replace `$ZENODO_TOKEN` etc. with your personal access token.
- `SLACK_BOT_TOKEN` and `SLACK_VERIFICATION_TOKEN`, required for monitoring with Slack (optional)

To configure the platform to use ORCID instead of the o2r-guestlister, see the [ORCID section](https://github.com/o2r-project/reference-implementation#orcid-optional) in the reference implementation.

### Windows with Docker for Windows

When using the shell to provide environmental variables, these must be passed separately on Windows, followed by the docker-compose commands:

```powershell
$env:OAUTH_CLIENT_ID = <...>
$env:OAUTH_CLIENT_SECRET = <...>
$env:OAUTH_URL_CALLBACK = <...>
$env:ZENODO_TOKEN = <...>
docker-compose up
```

The services are available at `http://localhost`.

### Windows with Docker Toolbox

When using docker-compose with Docker Toolbox/Machine on Windows, [volume paths are no longer converted from by default](https://github.com/docker/compose/releases/tag/1.9.0), but we need this conversion to be able to mount the docker volume to the o2r microservices.
To re-enable this conversion for `docker-compose >= 1.9.0` set the environment variable `COMPOSE_CONVERT_WINDOWS_PATHS=1`.

Also, the client's defaults (i.e. using `localhost`) does not work.
Therefore must mount a config file to point the API to the correct location (see also [Configure](#configure)), by uncommenting the line in `docker-compose.yml`, which mounts the file `test/config-toolbox.js` to the webserver at the right location (`service: nginx`).

After running docker-compose as described above, the services are available at `http://<machine-ip>`.

### Restart from scratch

You can remove all containers and images by o2r with the following two commands on Linux:

```bash
docker ps -a | grep o2r | awk '{print $1}' | xargs docker rm -f
docker images | grep o2r | awk '{print $3}' | xargs docker rmi --force
```

### Use non-default version of o2r-meta and containerit

Two core steps for compendium creation are provided by the standalone tools [o2r-meta]() and [containerit]().
These tools are used in a containerized version and the specific tool can be selected via an environment variable for both `muncher` and `loader` in the compose configuration (see comments in the file).

For _metadata extraction and brokering_, see the respective [`loader` configuration property `LOADER_META_TOOL_CONTAINER`](https://github.com/o2r-project/o2r-loader/#configuration) and [`muncher` configuration property `MUNCHER_META_TOOL_CONTAINER`](https://github.com/o2r-project/o2r-muncher/#configuration).
For testing metadata tools under development setting the property to `o2rproject/o2r-meta:dev` could be useful.

For _container manifest creation_, see the [`muncher` configuration property `MUNCHER_CONTAINERIT_IMAGE`](https://github.com/o2r-project/o2r-muncher/#configuration).

### Note

(Re-)starting containers manually might cause problems with the platform due to newly assigned IP-adresses. To avoid this problem, __restart the platform container__ after (re-)starting other containers manually. 

## User levels

The o2r microservices require users to have specific [user level](http://o2r.info/o2r-web-api/user/#user-levels) to be allowed certain tasks.
By default, users may create compendia, but if you want to develop features for editors or admins, you can adjust a user's level in the admin view (.

## Proxy for o2r microservices

If you run the o2r microservices locally as a developer (e.g. by manually starting each microservice via `npm start`), it is useful to run a local nginx to make all API endpoints available under one port (`80`), and use the same nginx to serve the application in this repo.
A nginx configuration file to achieve this is **`dev/nginx-microservices.conf`**.

```bash
docker run --rm --name o2r-platform --network="host" -p 80:80 -v $(pwd)/dev/nginx-microservices.conf:/etc/nginx/nginx.conf:ro -v $(pwd)/client:/usr/share/nginx/html:ro -v $(pwd)/dev:/etc/nginx/html/dev:ro nginx:stable-alpine

# bash inside the container for debugging IPs:
docker exec -it o2r-platform /bin/bash
# get the host machine IP from inside the container (use this if the default 172.17.0.1 does not work):
ip addr show docker0 | grep -Po 'inet \K[\d.]+'
```

Note: If you want to run this in a Makefile, `$(CURDIR)` will come in handy to create the mount paths instead of using `$(pwd)`.

## WebSocket testing

The compose configuration also makes a simple test page for WebSockets available at http://localhost/dev/socket.html (based on file `dev/socket.html`).

## Platform Version

1.0.0

## License

o2r-platform is licensed under Apache License, Version 2.0, see file LICENSE.
Copyright &copy; 2017 - o2r project.
