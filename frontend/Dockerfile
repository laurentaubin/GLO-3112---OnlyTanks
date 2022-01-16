# Test
FROM node:16-alpine as test-target
ENV NODE_ENV=development
ENV PATH $PATH:/app/node_modules/.bin

ENV NEXT_PUBLIC_ENVIRONMENT=docker

WORKDIR /app

COPY package*.json ./

# CI and release builds should use npm ci to fully respect the lockfile.
# Local development may use npm install for opportunistic package updates.
RUN npm install

COPY . .

# Build
FROM test-target as build-target
ENV NODE_ENV=production

ENV NEXT_PUBLIC_ENVIRONMENT=docker

# Use build tools, installed as development packages, to produce a release build.
RUN npm run build

# Reduce installed packages to production-only.
RUN npm prune --production

# Archive
FROM node:16-alpine as archive-target
ENV NODE_ENV=production
ENV PATH $PATH:/app/node_modules/.bin

ENV NEXT_PUBLIC_ENVIRONMENT=docker

WORKDIR /app

# Include only the release build and production packages.
COPY --from=build-target /app/node_modules node_modules
COPY --from=build-target /app/.next .next

CMD ["next", "start"]