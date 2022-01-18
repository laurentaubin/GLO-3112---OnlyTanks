FROM node:alpine

ARG ENVIRONMENT

WORKDIR /app

COPY . .
EXPOSE 8080

RUN yarn

CMD ["yarn", "start" ]
