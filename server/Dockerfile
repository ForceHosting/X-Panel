# ----------------------------------
# Pterodactyl Core Dockerfile
# Environment: NodeJS
# Minimum Panel Version: 1.11.2
# ----------------------------------


FROM node:lts-alpine

RUN adduser --disabled-password --home /home/container container

USER container
ENV USER=container HOME=/home/container NODE_ENV=production

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

EXPOSE 25566

CMD ["/bin/bash", "/entrypoint.sh"]