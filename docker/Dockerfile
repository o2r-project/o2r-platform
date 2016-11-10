# (C) Copyright 2016 The o2r project. https://o2r.info
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
FROM nginx:stable-alpine
MAINTAINER o2r-project, https://o2r.info

RUN apk add --no-cache \
    nodejs \
    git \
  && npm install -g bower \
  && echo '{ "allow_root": true }' > /root/.bowerrc
  
WORKDIR /etc/nginx/html

COPY client .
COPY bower.json bower.json
COPY docker/browserconfig.xml browserconfig.xml
COPY docker/nginx.conf /etc/nginx/nginx.conf
#COPY docker/config.js app/config/config.js

RUN bower install

RUN rm bower.json \
  && npm uninstall -g bower \
  && apk del \
    git \
    nodejs

COPY docker/nginx.conf /etc/nginx/nginx.conf

# docker build --tag platform --file docker/Dockerfile .
