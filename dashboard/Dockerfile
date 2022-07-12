# build environment
FROM node:lts-alpine as builder
#FROM node:14.4.0-alpine3.11 as build


WORKDIR /app
COPY package.json yarn.lock ./


RUN yarn
COPY . ./
RUN yarn build


### STAGE 2: Setup ###
FROM nginx:1.20.2-alpine
#FROM nginx:1.14.1-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
