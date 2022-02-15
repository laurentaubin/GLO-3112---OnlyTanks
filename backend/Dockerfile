FROM node:16.5.0-alpine

ARG ENVIRONMENT

WORKDIR /app

COPY . .
EXPOSE 8080

RUN yarn

CMD ["yarn", "start" ]
