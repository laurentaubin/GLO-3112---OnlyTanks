<h1 align="center">
  <img src="https://raw.githubusercontent.com/laurentaubin/web2-temp/master/.github/images/Tankstagram-Logo.png" width="115px"/><br/>
  Tankstagram
</h1>
<p align="center">Share your tank <b>pictures</b> around the world, <b>follow</b> other tank enthousiasts and <b>much more</b> with Tankstagram.</p>

## 📋 Setup TODOs

- Write CI/CD and deploy on aws
- Add logging

## 🧰 Development Stack

### 🎨 Frontend

Tankstagram's frontend is built using [NextJs](https://nextjs.org/) paired with [Typescript](https://www.typescriptlang.org/). We are using [Jest](https://jestjs.io/) for functional testing and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for testing our components. Finally, we make use of [Tailwind CSS](https://tailwindcss.com/) when it comes to styling.

### 👾 Backend

Tankstagram's backend is built using [NodeJs](https://nodejs.org/en/) paired with Typescript. The web API portion of the app is built using [ExpressJs](https://expressjs.com/). Similarly to the frontend, we are using Jest for our backend testing.

### 💾 Database

All of Tankstagram's data is stored in a [MongoDB](https://www.mongodb.com/) database, which is accessed in the backend code using the [Mongoose](https://mongoosejs.com/) ORM.

### 📓 Logging

TODO

## 👨🏼‍💻 Development process

### 🔄 CI/CD

Our CI/CD processes are run using [GitHub Actions](https://github.com/features/actions) and can be found in the [.github/workflows](./.github/workflows) directory.

### ☁️ Deployments

TODO

## 👨‍🔬 Local development

### 🐳 Using docker

With [Docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/) installed,
first build the app with `docker-compose build`, then run it with `docker-compose up`. Additionally, you can do both at the same time with `docker-compose up --build`.

### 💻 Running the components directly

To manually run both the frontend and backend of the app, refer to each project's README found in their respective directories ([frontend](frontend), [backend](backend)).

### 🌐 Access the app

After running the app with Docker, the frontend will be served at `http://localhost:3000` and the backend at `http://localhost:8080`.

## ⭐️ Contributors

- [Laurent Aubin](https://github.com/laurentaubin)
- [Francis Boulianne](https://github.com/francisboulianne)
- [Toma Gagné](https://github.com/tomagagne)
- [Maxime Miville-Deschênes]()
- [Julien Suppiger]()
- [Philippe Vincent](https://github.com/Philrobots)
