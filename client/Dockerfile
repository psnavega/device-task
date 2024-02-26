FROM node:18.3.0-alpine3.14

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 5173

CMD [ "npm", "run", "dev"] 