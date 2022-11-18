FROM node:19

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . ./

EXPOSE 5000

CMD [ "npm", "start" ]