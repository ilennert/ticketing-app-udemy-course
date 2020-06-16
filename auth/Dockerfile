FROM node:alpine

WORKDIR /app
COPY package.json ./
# Copy cloud mongo db connect info for cloud build
COPY ./environment/cloud/constants.ts ./src
RUN npm install
COPY . .

CMD ["npm", "run", "start:dev"]
