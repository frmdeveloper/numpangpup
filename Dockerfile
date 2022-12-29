FROM node:latest

RUN apt update -y
RUN apt-get install -y --no-install-recommends chromium

WORKDIR /root/ServerPup
RUN npm i -g pm2
COPY package.json .
RUN npm install
COPY . .
RUN echo "cd /root/ServerPup && pm2-runtime index.js --name puppeteer" >> /1.sh
CMD  /1.sh