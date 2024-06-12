FROM node:latest

RUN apt update -y
RUN apt-get install -y wget
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb

WORKDIR /root/ServerPup
RUN npm i -g pm2
COPY package.json .
RUN npm install
COPY . .
CMD pm2-runtime index.js --name puppeteer
