FROM node:18.16.1-alpine

WORKDIR /app

RUN mkdir -p /app

COPY package.json /app/

RUN yarn cache clean \
  rm node_modules/ \
  yarn install --frozen-lockfile

COPY . .

EXPOSE 3009