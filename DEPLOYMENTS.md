# Deploy a new version

## Frontend
### Prod
The `master` branch is automatically deployed with the [frontend-cd](./.github/workflows/frontend-cd.yml) action. It is currently not possible to manually deploy to the Prod environment.

### Lab

It is possible to manually deploy any branch to the lab environment using the [frontend-deploy-lab](./.github/workflows/frontend-deploy-lab.yml) action. To do so, navigate to the `Actions` tab and select the [Frontend Deploy Lab Action](https://github.com/GLO3112-classrooms/ugram-h2022-team-03/actions/workflows/frontend-deploy-lab.yml). From there, you should be able to click on `Run workflow` on the right-hand side. Choose a branch and click on the green `Run workflow` button to start the deployment. After a few minutes, if the workflow succeeds, the branch has successfully been deployed to the Lab environment.

![image](https://user-images.githubusercontent.com/44675437/157511135-5d443da5-d31a-4906-a2e5-ee53669db449.png)


## Backend

### Prod
The `master` branch is automatically deployed with the [backend-cd](./.github/workflows/backend-cd.yml) action. It is currently not possible to manually deploy to the Prod environment.

### Lab

It is possible to manually deploy any branch to the lab environment using the [backend-deploy-lab](./.github/workflows/backend-deploy-lab.yml) action. To do so, navigate to the `Actions` tab and select the [Backend Deploy Lab Action](https://github.com/GLO3112-classrooms/ugram-h2022-team-03/actions/workflows/backend-deploy-lab.yml). From there, you should be able to click on `Run workflow` on the right-hand side. Choose a branch and click on the green `Run workflow` button to start the deployment. After a few minutes, if the workflow succeeds, the branch has successfully been deployed to the Lab environment.

![image](https://user-images.githubusercontent.com/44675437/157511204-2c61594e-99dd-4cbc-b599-331d16c9fc48.png)
