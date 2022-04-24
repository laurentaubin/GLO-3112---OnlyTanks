## Accessing the app

To access the app, refer to the [Components section of our README](./README.md#-components). Follow the URL to the `Prod` environment. Additionnaly, make sure you are accessing the app via `HTTP` as `HTTPS` is not implemented and would result in some unexpected errors.

### Deployments

The app is deployed automatically on every push to the `master` branch. Refer to [DEPLOYMENTS.md](./DEPLOYMENTS.md) for more information.

## Features

Below is a list of completed features for the second release. Since we had some spare time, we went ahead and started implementing some release 3 features (identified below).

| Feature                                 | Description                                                                                                  | Completeness |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------| ------------ |
| React to a post                         | Allow users to like posts                                                                                    | ✅           |
| Comment post                            | Allow users to comment on posts                                                                              | ✅           |
| View likes and comments                 | Allow users to view likes and comments on posts                                                              | ✅           |
| Receive notifications                   | Users receive real time notifications when someone likes or comments their posts                             | ✅           |
| Resize images                           | Images are resized on upload and are sent back to the frontend in different format depending of the need     | ✅           |
| Generate analytics                      | Using Google Analytics, the application generates analytics on users behavior                                | ✅           |
| Monitoring                              | Using AWS Beanstalk, the backend is being monitored                                                          | ✅           |
| Security                                | The application is protected against DDoS attacks and SQL injection                                          | ✅           |
| Frontend logging                        | Every API call and error is logged using Sentry                                                              | ✅           |
| Backend logging                         | Every API call and error is logged using CloudWatch                                                          | ✅           |
| Dynamic documentation                   | Generate API documentation                                                                                   | ❌           |
| **Advanced Feature**                    |                                                                                                              |              |
| Upload image from Google Photos         | Allow users to upload images from Google Photos                                                              | ✅           |
| Recommend popular accounts              | Users are recommends the most popular account                                                                | ✅           |

## Navigating the app

In this section, we'll explain how to navigate the app and where to find every feature listed above

### Basic features

#### React to a post

To react to a post, you only need to click on the heart icon under a post. This will like the post. 
The heart will be red if it is liked by you. You can like a post and reload to page and see that the like is still there.
You can click on it to unlike the post.

#### Comment post

You can add a comment on any post. To do so, enter a comment in the input field under a post press enter or click the paper plane icon to submit the comment. 

#### View likes and comments

If a post has at least one like, the number of likes should appear under the heart icon. To see who likes the post,
click on the number of likes. A modal will pop up and display all the users that liked the post. 

The last two comments are always shown under a post. To see all the comments, click on "View X comments".
You will be redirected to the post page, where you will be able to scroll through all the comments.

#### Receive notifications

You receive notifications in real time when someone likes or comments one of your post in the form of a card popping up on your screen. You can also view your all of your notifications in the "Notifications" tab in the navigation bar.

#### Resize images          
On upload, the images are resized in three formats before being stored. The three different formats are normal, preview and thumbnail. 
The width for the normal format is 400 pixels, 200 for preview and 100 for thumbnail.
For all three formats, the aspect ratio is maintained, so the height is resized based on the original width/height ratio of the image.

On fetch, depending on the context, images are sent to the frontend in a specific format.
- In the main feed or when going directly on a post page, the images are fetched in the normal format.
- When on a user profile, the images are fetched in the preview format.
- For user profile image shown when searching for users, consulting likes/comments, etc., images are fetched in the thumbnail format.

#### Generate analytics     

Google Analytics is used to generate analytics. A log event is generated before all the important user actions. 
For example, the user event "SIGN_UP" is generated a user submit a sign up request. Logged events are:
- CREATE_POST = "CreatePost",
- SEARCH_USER = "SearchUser",
- SEARCH_POST_BY_CAPTION = "SearchPostByCaption",
- SEARCH_POST_BY_HASHTAGS = "SearchPostByHashtags",
- SELECT_IMAGE_FROM_GOOGLE_IMAGE = "SelectImageFromGoogleImage",
- DELETE_POST = "DeletePost",
- COMMENT_POST = "CommentPost",
- LIKE_POST = "LikePost",
- SEE_POST_LIKES = "SeePostLikes",
- UNLIKE_POST = "UnlikePost",
- NAVIGATE_TO_POST_PAGE = "NavigateToPostPage",
- SIGN_UP = "SignUp",
- LOGIN_WITH_GOOGLE = "LoginWithGoogle"

#### Monitoring
The backend environment is automatically being monitored because we are deploying our backend with AWS EB. We can access the data through the "Monitoring" section of our deployment. The data looks like this:

![image](https://user-images.githubusercontent.com/46379340/164948289-1558b686-25d0-4ef3-9b5c-8ce7c016f32d.png)

#### Security
To protect the app against DDoS and overload, we implemented a write limiter. The write limiter is used at each endpoints to limit the number of calls a user can make within a certain period of time.

The application is protected against database injection, since we are using Mongoose as an ORM which protects us against most database attacks.

##### Frontend logging
Sentry is used for the frontend logging. Every API calls and errors are being logged. As you can see on the image, basic API calls are logged by display the called URL and the HTTP method used. Errors are logged by logging the entire error and context.

IMPORTANT: Some ad blockers can block Sentry's API calls. If you see blocked Sentry's calls in your network tab, disable your adblock and reload the app (https://github.com/getsentry/sentry-javascript/issues/2916)

<img width="1773" alt="image" src="https://user-images.githubusercontent.com/46379340/159184015-177578c4-c22b-4bd0-b28d-0c8f22b8eda4.png">

##### Backend logging
CloudWatch is used for the backend monitoring. Every API calls made to the backend is logged. There is a logger at every endpoint of the application, and in every `catch` if there is an error.


### Advanced Feature      
#### Upload image from Google Photos
IMPORTANT: To be able to integrate Google Photos in a production app, the application needs to be reviewed by Google. We did not go through this process, therefore only selected test users can use this feature.

If you are not a test user, an error message should appear. If you are a test user, Google will display a warning that the application is not verified. You can still proceed by clicking on "Continue" and give access to your Google Photos library to the application by clicking on "Continue" again.

The corrector's gmail account was added as a test user. If you encounter a problem, please contact a team member (toma.gagne.1@ulaval.ca) to figure out what the problem is. If the corrector's email is the right one, you should not have any problem.

![image](https://user-images.githubusercontent.com/46379340/164948329-3e238037-927e-4952-860c-602f0ab64a0d.png)

Once the application is allowed to access your Google Photos library, you will be redirect back to the application and a modal with all the photos of your library should be displayed. Select a photo by clicking on it and then press "Select" to upload the image. Then, you will be able to do the normal upload actions.

#### Recommend popular accounts
Recommended accounts are shown when you are on a medium or larger screen on the right.

<img width="471" alt="image" src="https://user-images.githubusercontent.com/46379340/164948321-aba15587-bb07-4237-9086-ad9cfd7f0bee.png">

The popular profiles are selected based on the total number of likes the users have received on their posts. The total number of likes is displayed under their name, followed by a small tank icon. 
  
The total number of likes is updated when a user receive a like or when someone unlikes a post. However, the recommendations are not updated in real time. To see the effect of a like/unlike, reload the application by refreshing the page.


## Unimplemented features

All throughout the app, you will find partial or unimplemented features. We decided to include them in this release because they all made sense either style-wise or because they are going to be included in a further release and are closely related to an existing feature. Here is a list of said unimplemented features

| Feature               | Location                                                                               | Behavior                                                                      |
| --------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Messages page         | `/messages`                                                                            | The page is under construction                                                |
| Privacy page          | `/about/privacy` or by clicking on the `Privacy` link in the sidebar                   | The page is under construction                                                |
| Terms of Service page | `/about/terms-of-service` or by clicking on the `Terms of Service` link in the sidebar | The page is under construction                                                |
| Contact page          | `/about/contact` or by clicking on the `Contact` link in the sidebar                   | The page is under construction                                                |
