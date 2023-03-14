FROM openjdk:17.0.1-jdk

ARG TZ=Europe/Moscow
ARG USER_ID=1000
ARG GROUP_ID=1000

RUN ln -snf /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo ${TZ} > /etc/timezone

RUN groupadd --system --gid ${GROUP_ID} application \
    && useradd --system --gid application --uid ${USER_ID} --shell /bin/bash --create-home application \
    && chown --recursive application:application /home/application

COPY bin /home/application/bin

RUN chown -R application:application /home/application/bin

USER application
WORKDIR /home/application

ENTRYPOINT ["sh", "./bin/start.sh"]
