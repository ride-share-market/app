FROM rudijs/rsm-iojs:0.0.1
MAINTAINER Ride Share Market "systemsadmin@ridesharemarket.com"

# NPM package cache
ENV NPM_REFRESHED_AT 2015-05-06.1
COPY package.json /tmp/package.json
RUN \
    cd /tmp && \
    npm install --production && \
    npm install -g pm2 && \
    npm cache clean

# Application
ENV APP_REFRESHED_AT 2015-05-06.1
ENV APP_DIR /srv/ride-share-market-app
RUN \
    mkdir ${APP_DIR} && \
    cp -a /tmp/node_modules/ ${APP_DIR} && \
    mkdir ${APP_DIR}/log && \
    mkdir ${APP_DIR}/pids
COPY bower.json ${APP_DIR}/bower.json
COPY config/ ${APP_DIR}/config
COPY dist/ ${APP_DIR}/dist
COPY httpd/ ${APP_DIR}/httpd
COPY server.js ${APP_DIR}/server.js
COPY package.json ${APP_DIR}/package.json
COPY pm2.json ${APP_DIR}/pm2.json
COPY docker-start.sh ${APP_DIR}/docker-start.sh

# Application User and Permissions
RUN \
    useradd -c 'RSM Data' -u 2000 -m -d /home/rsm-data -s /bin/bash rsm-data && \
    chown -R rsm-data.rsm-data ${APP_DIR}

#tmp
#RUN echo 'rsm-data ALL=(ALL) NOPASSWD:ALL' > /etc/sudoers.d/rsm-data

COPY config/logrotate.conf /etc/logrotate.d/rsm-app
RUN chmod 644 /etc/logrotate.d/rsm-app

#tmp
RUN cp /etc/cron.daily/logrotate /etc/cron.hourly/logrotate

USER rsm-data

# Export the APP_DIR as a data volume under the app user account.
# Other containers use this volume's data (nginx, logstash).
VOLUME ${APP_DIR}

USER root

# Application Start
WORKDIR ${APP_DIR}

CMD ["./docker-start.sh"]
