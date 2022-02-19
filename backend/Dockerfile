FROM node:16.5.0-alpine

ARG ENVIRONMENT

WORKDIR /app

COPY . .

RUN yarn

RUN yarn build

CMD ["yarn", "start" ]
