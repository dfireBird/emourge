FROM node:alpine

RUN apk add git

WORKDIR /usr/bot

COPY package.json .
RUN yarn

COPY . .

CMD yarn start
