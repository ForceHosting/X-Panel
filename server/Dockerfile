FROM node:lts

ENV NODE_ENV production

FROM base as deps

FROM base

ENV PORT="25566"
ENV NODE_ENV production

WORKDIR /xpanel

RUN npm install

ENTRYPOINT [ "./start.sh" ]