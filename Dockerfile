FROM node:latest

RUN apt update -y
RUN apt-get install -y --no-install-recommends chromium

WORKDIR /root/ServerPup
RUN npm i -g pm2
COPY package.json .
RUN npm install
COPY . .
EXPOSE 80 8888 8080 443 5130 5131 5132 5133 5134 5135 3306
CMD pm2-runtime index.js --name puppeteer