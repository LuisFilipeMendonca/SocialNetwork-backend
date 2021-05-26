# Social Network - Backend
## An application to share posts and connect to people

## Motivation
This is the backend for the Social Network application. It was built using ExpressJs and SQL with Sequelize ORM. It was built to train my skills with this technologies in a bigger application.

## Features
- Register/Login/Update/Delete from user account
- Create/Read/Delete operations on posts
- Create/Read/Delete operations on comments
- Create/Delete operations on likes
- Pagination in posts and comments

## Installation

This application requires [Node.js](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) to run.

Download or clone the project on your machine, install the dependencies and start the server.

```sh
cd project_folder
npm install
```

## Usage
In order to use this api you need to create in the root of the project a .env file with the following configuration.

```sh
PORT=PORT_APP_RUN (By default 3001)
DB_HOST=YOUR_DB_HOST
DB=YOUR_DB_NAME
DB_USERNAME=YOUR_DB_USERNAME
DB_PASSWORD=YOUR_DB_PASSWORD
DB_PORT=YOUR_DB_PORT
DB_DIALECT=mysql
TOKEN_SECRET=hsahi6378aHKHHOGAS678a6sg7G8
```

### Development

```sh
cd project_folder
npm start
```

By default the application will run on [http://localhost:3001](http://localhost:3001).
