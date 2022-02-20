# OnlyTanks Backend

## ⚡️ Quick start

Make sure you have [Node](https://nodejs.org/en/download/), [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable) and [Docker](https://www.docker.com/) installed.

Make sure the dependencies are correctly installed

```bash
yarn
```

First, run the database using Docker:

```bash
# Pull the mongo image
docker pull mongo

# Run it in a container
docker run --name onlytanks-mongo-dev -p 27017:27017 -d mongo
```

Then, to run the backend locally run

```bash
yarn dev
```

Additionally, you can create a production build with

```bash
# Build the app
yarn build

# Run the build
yarn start
```

For docker, refer to the [project's global README](../README.md#-using-docker)

If you run the app manually, the backend will be served at `http://localhost:8888`. If you choose to go the Docker way, it will be avalaible at `http://localhost:8080`.
