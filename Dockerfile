FROM node:alpine

WORKDIR /root/pup
ADD . /root/pup
RUN echo "https://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories
RUN apk add chromium
RUN npm i -g pm2
RUN npm install
CMD pm2-runtime index.js --name pup
