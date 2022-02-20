<h1 align="center">
  <img src=".github/images/Onlytanks-Logo.png" width="400px"/><br/>
</h1>
<p align="center"> 
  <p>Share your tank <b>pictures</b> around the world, <b>follow</b> other tank enthousiasts and <b>much more</b> with OnlyTanks. </p>
  <p> https://d2w3pepxe2h8ho.cloudfront.net/ </p> 
</p>

## 📋 Setup TODOs

- Add logging

## 🧰 Development Stack

### 🎨 Frontend

OnlyTanks's frontend is built using [NextJs](https://nextjs.org/) paired with [Typescript](https://www.typescriptlang.org/). We are using [Jest](https://jestjs.io/) for functional testing and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for testing our components. Finally, we make use of [Tailwind CSS](https://tailwindcss.com/) when it comes to styling.

### 👾 Backend

OnlyTanks's backend is built using [NodeJs](https://nodejs.org/en/) paired with Typescript. The web API portion of the app is built using [ExpressJs](https://expressjs.com/). Similarly to the frontend, we are using Jest for our backend testing.

### 💾 Database

All of OnlyTanks's data is stored in a [MongoDB](https://www.mongodb.com/) database, which is accessed in the backend code using the [Mongoose](https://mongoosejs.com/) ORM. The database is hosted on [MongoDB Atlas](https://www.mongodb.com/atlas/database).

### 📓 Logging

We plan to use [Winston](https://github.com/winstonjs/winston) paired with [Sentry](https://sentry.io/welcome/) to access the logs. This part is not completely decided yet, it is subject to change.

## 👨🏼‍💻 Development process

### 🔄 CI/CD

Our CI/CD processes are run using [GitHub Actions](https://github.com/features/actions) and can be found in the [.github/workflows](./.github/workflows) directory.

### ☁️ Deployments

Deployments follow the methods demonstrated in the course. The frontend is deployed on Amazon S3 as a static website and the backend is deployed on Amazon Elastic Beanstalk.

## 👨‍🔬 Local development

### 💻 Running the components manually

To manually run both the frontend and backend of the app, refer to each project's README found in their respective directories ([frontend](frontend), [backend](backend)).

### 🐳 Using docker

A dev Docker setup is available using `docker-compose.dev.yaml` and the projects' `Dockerfile.dev`.

With [Docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/) installed:


```bash
#install frontend dependencies
cd frontend
yarn 

#install backend dependencies
cd backend
yarn 

# build the app
docker-compose -f docker-compose.dev.yaml build

# run it
docker-compose -f docker-compose.dev.yaml up -d
```

Additionally, you can do both at the same time with `docker-compose -f docker-compose.dev.yaml up --build -d `.

For the production docker, only building and running `docker-compose.yml` is necessary.

### 🌐 Access the app

After running the app with Docker, the frontend will be served at `http://localhost:3000` and the backend at `http://localhost:8080`.

## ⭐️ Contributors

- [Laurent Aubin](https://github.com/laurentaubin)
- [Francis Boulianne](https://github.com/francisboulianne)
- [Toma Gagné](https://github.com/tomagagne)
- [Maxime Miville-Deschênes](https://github.com/maximemvd)
- [Julien Suppiger](https://github.com/JulSupp)
- [Philippe Vincent](https://github.com/Philrobots)
