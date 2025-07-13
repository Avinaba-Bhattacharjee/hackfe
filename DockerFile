FROM node:24.4-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8081

CMD ["npm", "start"]