## Accessing the app

To access the app, refer to the [Components section of our README](./README.md#-components). Follow the URL to the `Prod` environment. Additionnaly, make sure you are accessing the app via `HTTP` as `HTTPS` is not implemented and would result in some unexpected errors.

### Deployments

The app is deployed automatically on every push to the `master` branch. Refer to [DEPLOYMENTS.md](./DEPLOYMENTS.md) for more information.

## Features

Below is a list of completed features for the second release. Since we had some spare time, we went ahead and started implementing some release 3 features (identified below).

| Feature                                 | Description                                                                                           | Completeness |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------ |
| Log in with Google OAuth                | Use Google OAuth to handle all log ins in the app                                                     | ✅           |
| Redirect to sign up                     | When logging in, if the user doesn't already have an account, they are redirected to the sign up menu | ✅           |
| Log out                                 | Allow users to log out of the app                                                                     | ✅           |
| Delete account                          | Delete their own accounts, including all their posts                                                  | ✅           |
| Search other users                      | Allow users to search for other users by username                                                     | ✅           |
| Search posts by caption                 | Allow users to search for posts by their captions                                                     | ✅           |
| Search posts by tags                    | Allow users to search for posts containing given tags                                                 | ✅           |
| Frontend monitoring                     | Every API call and error is logged using Sentry                                                       | ✅           |
| Backend monitoring                      | Every API call and error is logged using CloudWatch                                                   | ✅           |
| **Release 3 features**                  |                                                                                                       |              |
| Like posts                              | Allow users like posts                                                                                | ✅           |
| Display users who liked a post          | Display a list of all users who liked a given post                                                    | ✅           |
| Notify users when their posts are liked | Send a notification in real time to a post author when the post is liked                              |⏳ 
        |

## Navigating the app

In this section, we'll explain how to navigate the app and where to find every feature listed above

### Authentication

#### Creating an account

The first thing you'll need to do is create an account. Upon landing on the app, you'll see a `Log in with Google` button. Clicking on it will bring up the Google Login menu. If this is the first time logging in with a Google account, you should be redirected to the sign up menu upon completing the Google authentication.

Some fields will be autocompleted based on your Google account, but they can always be changed (except for the Email address field).

After the sign up process, you should see OnlyTanks's homepage with its feed.

#### Logging out

You can log out by clicking on the `Log Out` button located in the nav bar

#### Logging in

Going back to the login form, you can click once again on the `Log in with Google` button. If you complete the Google authentication process with the same account you used previously, you should be logged in automatically.

### Search

#### Searching for profiles

To access the search page, click on the `Search` button or navigate to `/search/users`. You should see a tab menu to navigate between the search menus as well as a search bar. To search for users, simply enter a username in the search bar. The search results will appear when you either stop typing or press `Enter`.

Search results are matched based on prefixes, meaning entering `dragon` in the search bar would return accounts with usernames like `dragonbleu123` or `dragonxxslash` but not accounts with usernames like `grosdragon456`. Additionally, the search query is case insensitive, so entering `DrAgON` would be the same as entering `dragon`.

#### Searching for posts

##### Search by caption

To search posts by caption, simply click on the `Posts` tab in the search menu or navigate to `/search/posts`. The behaviour is similar to the username search: enter a query in the search bar and the search results will appear when you either stop typing or press `Enter`.

Search results are matched based on if the whole query is present in a post's caption, meaning searching for `sunny day` would return posts with captions like `What a sunny day !` and `Sunny day = good day`. However, the query has to be exactly as is in a post's caption in order for it to be returned. So searching for `sunny day` would not return a post with a caption of `Today was a sunny and beautiful day`.

##### Search by tags

To search posts by tags, simply click on the `Hashtags` tab in the search menu or navigate to `/search/hashtags`. To add a tag to your query, start typing and press `Enter` when done typing the tag. Posts with the given tag should then appear on the screen. Is it also possible to add multiple tags to the query. Doing so would return posts containing all tags entered in the search bar.

##### Frontend monitoring
Sentry is used for the frontend monitoring. Every API calls and errors are being logged. As you can see on the image, basic API calls are logged by display the called URL and the HTTP method used. Errors are logged by logging the entire error and context.

IMPORTANT: Some ad blockers can block Sentry's API calls. If you see blocked Sentry's calls in your network tab, disable your adblock and reload the app (https://github.com/getsentry/sentry-javascript/issues/2916) 

<img width="1773" alt="image" src="https://user-images.githubusercontent.com/46379340/159184015-177578c4-c22b-4bd0-b28d-0c8f22b8eda4.png">

##### Backend monitoring
CloudWatch is used for the backend monitoring. Every API calls made to the backend is logged. There is a logger at every endpoint of the application, and in every `catch` if there is an error.


## Unimplemented features

All throughout the app, you will find partial or unimplemented features. We decided to include them in this release because they all made sense either style-wise or because they are going to be included in a further relase and are closely related to an existing feature. Here is a list of said unimplemented features

| Feature               | Location                                                                               | Behavior                                                                      |
| --------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Suggestions sidebar   | All throughout the app                                                                 | The suggested profiles are hardcoded and clicking on them doesn't do anything |
| Messages page         | `/messages`                                                                            | The page is under construction                                                |
| Notifications page    | `/notifications`                                                                       | The page is under construction                                                |
| Privacy page          | `/about/privacy` or by clicking on the `Privacy` link in the sidebar                   | The page is under construction                                                |
| Terms of Service page | `/about/terms-of-service` or by clicking on the `Terms of Service` link in the sidebar | The page is under construction                                                |
| Contact page          | `/about/contact` or by clicking on the `Contact` link in the sidebar                   | The page is under construction                                                |
