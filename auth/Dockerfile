FROM node:alpine

WORKDIR /app
COPY package.json ./
COPY ./environment/cloud/constants.ts ./src
RUN npm install
COPY . .

CMD ["npm", "run", "start:dev"]
