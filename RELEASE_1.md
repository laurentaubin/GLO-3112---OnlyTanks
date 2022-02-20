## Features

| Feature                  | Description                                                                                                                     | Completeness |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| User profile             | Every user has their own profile with their profile picture, username, full name, email, phone number and joined date displayed | ✅            |
| Edit user profile        | A user can edit their own profile and update their name, email or phone number                                                  | ✅            |
| List all users           | Display all current users on a page with a preview of their profile                                                             | ✅            |
| Create post              | Allow users to create posts with a picture, a caption, optional hashtags and tagged users                                       | ✅            |
| Display posts on profile | A user's posts are included when going to their profile                                                                         | ✅            |
| Edit post                | Allow users to edit their own posts by updating the caption, hashtags or tagged users                                           | ✅            |
| Delete post              | Allow users to delete their own post                                                                                            | ✅            |
| Main feed                | Display all of the other users' posts in a feed                                                                                 | ✅            |
| Post details             | Allow users to click on a post from either the main feed or a user's profile and see a detailed view of said post               | ✅            |

## Navigating the app

In this section, we'll explain how to navigate the app and where to find every feature listed above

### Authentication

#### Creating an account

The first thing you'll need to do is create an account. Upon landing on the app, you'll see a login form:

![image](https://user-images.githubusercontent.com/44675437/154533185-bd879dd1-33d3-4df6-91da-86b8c813c6cd.png)

You can access the sign up form by clicking on the `sign up` button. From there, you can enter your information and create an account:

![image](https://user-images.githubusercontent.com/44675437/154533602-859e10c6-4979-454e-a94e-c094304ae5cb.png)

After the sign up process, you should see OnlyTanks's homepage with an empty feed.

#### Logging out

You can log out by clicking on the `Log Out` button located in the nav bar

#### Logging in

Going back to the login form, if you have an existing account, you can simply enter your username and click `Log In`. For the first release, we did not implement any validation when signing in. So anyone could sign in as anyone.

### User interaction

#### User profiles
To access your own profile, click on the `Profile` item in the nav bar. From there, you should be able your basic user info and your posts, if you have any.
<img width="1434" alt="image" src="https://user-images.githubusercontent.com/46379340/154857315-f5859653-8805-4784-ad97-2321c37b60e9.png">

You can click on any post in the grid to see a more detailed view of the post.

To access another user profile, click on `Search` in the nav bar. It will bring you to the search page, where all users are listed. For the moment, it is not possible to search for a specific user, you have to scroll through the entire list until you find the one you want. Clicking on a user will bring you to their profile page. Another way to access another user account is by clicking on their name or their profile picture in the header of a post.

#### Editing your profile information

To edit your information, go to your profile. Then, click on the edit button next to your name. A modal will pop up where you will be able to edit your info. 

<img width="1033" alt="image" src="https://user-images.githubusercontent.com/46379340/154857558-2e1f1ce3-2aeb-4942-ad5e-5c1c72d62de2.png">

#### Searching all users

As mentioned in the `User profiles` section, you can access the list of all users by clicking on `Search` in the nav bar. Click on an user card to see their profile.

<img width="1375" alt="image" src="https://user-images.githubusercontent.com/46379340/154857620-bc4796e6-d370-4c41-8359-c8bb0237ffc9.png">

#### Seeing posts on the feed
At first, the main feed will be empty. To see some posts in the feed, you need to create new posts. At the moment, the main feed display all the posts from all the users, including yours. Posts are displayed in reverse chronological order, from the most recent to the oldest. To create a new post, refer to the next section. 

<img width="811" alt="image" src="https://user-images.githubusercontent.com/46379340/154857839-a10d56c5-d04d-4d1e-ba56-0202f0bb82dd.png">

### Create and manage your posts

#### Creating a post

To create a post, click on the `New Post` button in the nav bar. It will bring you to the post creation page. From there, select a file from your device and enter the information you want. The caption, hastags and tags are optionals. 

<img width="1630" alt="image" src="https://user-images.githubusercontent.com/46379340/154857985-790de524-44a6-4e4f-afde-1218eefbcf87.png">

#### Edit the post

You can edit your post from your post preview in the main feed or the post page (post page is accessible from your profile or by clicking on `See post` from the post preview options). 

You can edit the tags, the caption and the hashtags.

<img width="847" alt="image" src="https://user-images.githubusercontent.com/46379340/154858150-f5200487-0378-4c0b-b423-01330f00e457.png">

#### Delete the post

You can delete your post only from the post detailed page. Click on the kebab menu button in the upper right and select the `Delete` option. On success, you will be redirected to the main feed and the post should have been deleted from your profile.

<img width="819" alt="image" src="https://user-images.githubusercontent.com/46379340/154858482-382fa849-e8b8-428b-9528-1e6ffcf0ac56.png">


## Unimplemented features

All throughout the app, you will find partial or unimplemented features. We decided to include them in this release because they all made sense either style-wise or because they are going to be included in a further relase and are closely related to an existing feature. Here is a list of said unimplemented features

| Feature                | Location                                                                               | Behavior                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Suggestions sidebar    | All throughout the app                                                                 | The suggested profiles are hardcoded and clicking on them doesn't do anything                   |
| Messages page          | `/messages`                                                                            | The page is under construction                                                                  |
| Notifications page     | `/notifications`                                                                       | The page is under construction                                                                  |
| Privacy page           | `/about/privacy` or by clicking on the `Privacy` link in the sidebar                   | The page is under construction                                                                  |
| Terms of Service page  | `/about/terms-of-service` or by clicking on the `Terms of Service` link in the sidebar | The page is under construction                                                                  |
| Searching for Users    | `/searchs/users`                                                                       | The search is not implemented and the page will display all users who currently have an account |
| Searching for Posts    | `/searchs/posts`                                                                       | The search is not implemented and the page will display no posts                                |
| Searching for Hashtags | `/searchs/hashtags`                                                                    | The search is not implemented and the page will display no posts                                |
