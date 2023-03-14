FROM node:18.12-alpine

WORKDIR /app

RUN addgroup -S application && adduser -S application -G application -s /bin/bash application && \
    apk add --update --no-cache tzdata \
    libcap \
    bash \
    curl \
    busybox-extras && \
    npm i -g corepack && \
    npm install -g @angular/cli@15.2.2 && \
    setcap CAP_NET_BIND_SERVICE=+eip /usr/local/bin/node \
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ENV TZ=Europe/Moscow

EXPOSE 80

COPY ./script/docker-entrypoint-dev.sh /usr/local/bin
RUN chmod 700 /usr/local/bin/docker-entrypoint-dev.sh

ENTRYPOINT ["docker-entrypoint-dev.sh"]
