FROM node:latest

RUN apt update -y
RUN apt-get install -y --no-install-recommends chromium

WORKDIR /ServerPup
RUN npm i -g pm2
COPY package.json .
RUN npm install
COPY . .
CMD node .