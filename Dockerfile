FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install

EXPOSE 5555

CMD ["npm", "start"]
