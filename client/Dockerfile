### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
COPY ./src/environments/cloud/constants.ts ./src/app
RUN node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build --prod
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY --from=build /usr/src/app/dist/client /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
