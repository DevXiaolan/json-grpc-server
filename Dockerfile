FROM node:13.5.0-slim

ADD package-lock.json /app/

ADD package.json /app/

WORKDIR /app

RUN npm install

ADD . /app

CMD ["npm", "start"]