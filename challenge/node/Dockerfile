FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
COPY *.js ./


RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]