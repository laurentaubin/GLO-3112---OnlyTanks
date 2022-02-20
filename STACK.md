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
