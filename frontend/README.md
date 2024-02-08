# About

This application is my pet project using ReactJS for the first time.
The goal is to learn how to use general approaches of React and Redux-Toolkit-Query in developing web application using React hooks, context, React Router, forms, modal windows, etc. To gain an expirience in http CRUD operations and an user authentication approach on the backend side I built a JSON server. To style components I used Tailwind CSS.
## App Description

The application is styled for several media devices. Users can work with app in anonymous or authenticated mode.

* The application screen contains navigation menu and data, depending on the open page.Depending on a media device, the menu can be top or bottom. It contains links to a list of articles, a list of authors, and a login page. If a user logged in, they will see a button to create a new article and a drop down menu, containing additional menu options such as links to user profile page, calendar, subscriptions, and log out button. Currently *Calendar* and *Subscriptions page* are empty pages to practice in private routing.
* A *Home page* contains a list of articles.Articles in the list that can be filtered, sorted, searched, and paginated (simple pagination). If a user logged in, they can create, delete, and edit articles.
* An *Authors page* contains a list of authors.The authors in the list that can be filtered, sorted, searched, and paginated (Load-more pagination). If a user logged in, they can create, delete, and edit articles.
* A *Login page* contains an email address and a password field. Currently there is mock data available for a quick login:The email address is "Sincere@april.biz" and the password is "0000".
If a user does not have an account, they can register following a sign up link. A register page will open. Next, the user needs to fill in a username, an email and a password.
Once a user logged in, they will be redirected to the previous page, and the register and the login pages are not available to visit until the user logs out.
* An *Author's page* contains a list of their articles that can be filtered, sorted, searched, and paginated (simple pagination).
* An *Article page* contains its author data, the article content, and a list of comments.

## Dev data

## Installation

* `git clone git@github.com:HannaZaitsava/articles-app.git`
* `cd react-app-first/backend`
* `npm install`
* `cd react-app-first/frontend`
* `npm install`
* `npm run startdev` - starts backend and frontend concurrently
* visit http://localhost:3000/

In order to run backend and frontend separately follow next steps:

* Start backend:

  * `cd react-app-first/backend`
  * `npm run start`

* Start frontend:

  * `cd react-app-first/frontend`
  * `npm run start`
