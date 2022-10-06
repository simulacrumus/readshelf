<!-- Author: Emrah Kinay -->
<a name="readme-top"></a>
<br />
<div align="center">
  <a href="https://readshelf-web.herokuapp.com/">
    <img src="https://readshelf-web.herokuapp.com/logo128.png" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">Read Shelf</h3>
  <p align="center">Find Your Next Favorite Read</p>
</div>

## About The Project

ReadShelf helps you organize your readings, find new books, save books to your wishlist, leave reviews and read other users' reviews. ReadShelf's simplistic and easy-to-use design provides a great user experience.

ReadSheld is a MERN Stack project. I have developed ReadShelf from scratch to improve my React.js and NodeJS skills. There are still some issues and I will continue to contribute to the project.

Plese visit the deployed version of the project on Heroku [https://readshelf-web.herokuapp.com](https://readshelf-web.herokuapp.com).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Features

* User authentication via JSON Web Token
* Google OAuth2 Authorization
* Email Verification, Resetting Password via Email, etc.
* API Security (JWT, Blocking Query Injection, Request Limiting, File Upload Limiting)
* Responsove Web Design

### Built With

* React.js
* NodeJS
* Express.js
* MongoDB Atlas
* REST API
* Redux
* SendGrid
* Google Books
* Google OAuth2
* Material UI

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

Please follow the instructions below to get started with the Read Shelf project.

### Prerequisites
* NodeJS ```v14.16.1``` or newer version
* npm ``` npm install npm@latest -g```

### Installation
_ReadShelf project uses_ **Google Books** _for searchinng and displaying books,_ **Google OAuth2** _for authentication,_ **New York Times Bestseller** _lists for popular books,_ **MongoDB Atlas** _for storing data and_ **SendGrid** _for sending emails_

* Get Google Books API Key at [https://cloud.google.com](https://cloud.google.com)
* Get Google OAuth API Key at [https://developers.google.com/identity/protocols/oauth2](https://developers.google.com/identity/protocols/oauth2)
* Get New York Times API Key at [https://developer.nytimes.com/apis](https://developer.nytimes.com/apis)
* Get Mongo Atlas URI at [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
* Get SendGrid API Key at [https://sendgrid.com](https://sendgrid.com)
* Clone the repo
   ```sh
   git clone https://github.com/simulacrumus/readshelf.git
   ```
* Install NPM packages
   ```sh
   npm install
   cd client
   npm install
   ```
* Enter your keys in `.env` file
   ```conf
    MONGO_ATLAS_URI=<YOUR MONGO OR MONGO ATLAS URI URI>
    JWT_SECRET=<YOUR JSON WEB TOKEN SECRET STRING>
    GOOGLE_BOOKS_API_KEY=<YOUR GOOGLE BOOKS API KEY>
    GOOGLE_CLIENT_ID=<YOUR GOOGLE CLIENT ID>
    GOOGLE_CLIENT_SECRET=<YOUR GOOGLE CLIENT SECRET>
    SENDGRID_API_KEY=<YOUR SENDGRID API KEY>
    SENDGRID_SENDER_EMAIL_ADDRESS=<YOUR SENDGRID SENDER EMAIL ADDRESS>
    GOOGLE_ANALYTICS_MEASUREMENT_ID=<YOUR GOOGLE ANALYTICS MEASUREMENT ID>
    NYTIMES_API_KEY=<YOUR NEW YOUR TIMES API KEY>
    NYTIMES_API_SECRET=<YOUR NEW YORK TIMES API SECRET>
   ```
* Run Node.js Server
    ```sh
   npm start
   ```
* Run React App
    ```sh
   cd client
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Emrah Kinay - [@emrahkinay](https://www.linkedin.com/in/emrahkinay/)

Project Link: [https://github.com/simulacrumus/readshelf](https://github.com/simulacrumus/readshelf)

Heroku Link: [https://readshelf-web.herokuapp.com](https://readshelf-web.herokuapp.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>