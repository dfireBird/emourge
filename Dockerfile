FROM node:alpine

WORKDIR /usr/bot

COPY package.json .
RUN yarn

COPY . .

CMD yarn start
