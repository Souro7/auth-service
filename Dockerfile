FROM node:11

WORKDIR /usr/auth-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]