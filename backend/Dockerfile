FROM node:16.5.0-alpine

ARG ENVIRONMENT

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .
RUN yarn build

EXPOSE 8080
CMD ["yarn", "start"]
