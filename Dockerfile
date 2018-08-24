FROM node:latest

LABEL maintainer="r3mis4@yahoo.com"

RUN mkdir -p /usr/src/homa
COPY homa.js /usr/src/homa
COPY package.json /usr/src/homa
WORKDIR /usr/src/homa
RUN npm i
CMD [ "node", "homa.js" ]
EXPOSE 3000