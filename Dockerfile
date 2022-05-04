FROM node:17

RUN apt update -y
RUN apt-get install -y --no-install-recommends chromium

WORKDIR /root/ServerPup
COPY package.json .
RUN npm install
COPY . .
CMD node index.js