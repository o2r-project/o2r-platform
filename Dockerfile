# (C) Copyright 2017 o2r project
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
FROM nginx:stable-alpine as builder

RUN apk add --no-cache \
    npm \
    git \
  && npm install -g bower \
  && echo '{ "allow_root": true }' > /root/.bowerrc

WORKDIR /etc/nginx/html
COPY client .
COPY bower.json bower.json
RUN bower install \
  && rm bower.json


FROM nginx:stable-alpine
WORKDIR /etc/nginx/html
COPY --from=builder /etc/nginx/html/ /etc/nginx/html

COPY docker/browserconfig.xml browserconfig.xml
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Metadata params provided with docker build command
ARG VERSION=dev
ARG VCS_URL
ARG VCS_REF
ARG BUILD_DATE

# Metadata http://label-schema.org/rc1/
LABEL maintainer="o2r-project <https://o2r.info>" \
  org.label-schema.vendor="o2r project" \
  org.label-schema.url="https://o2r.info" \
  org.label-schema.name="o2r platform" \
  org.label-schema.description="compendium creation and inspection user interface" \    
  org.label-schema.version=$VERSION \
  org.label-schema.vcs-url=$VCS_URL \
  org.label-schema.vcs-ref=$VCS_REF \
  org.label-schema.build-date=$BUILD_DATE \
  org.label-schema.docker.schema-version="rc1"
