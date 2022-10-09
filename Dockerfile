# base image
FROM node:alpine

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src
COPY .env.example /usr/src/.env

# install dependencies
RUN export NODE_OPTIONS=--openssl-legacy-provider

RUN npm install --legacy-peer-deps

# start app
RUN npm run build
EXPOSE 3000
CMD npm run start
