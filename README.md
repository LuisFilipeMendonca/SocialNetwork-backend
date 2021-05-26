# Social Network 
## An application to share posts and connect to people

## Motivation
Build this frontend application to train my skills with ReactJs and Redux with a bigger application. Also to see how to create a customer hook to handle pagination with infinite scroll.

## Features
- Register/Login/Update/Delete from user account
- Create/Read/Delete operations on posts
- Create/Read/Delete operations on comments
- Create/Delete operations on likes
- Pagination in posts and comments unsing infinite scroll
- Created toasts

## Installation

This application requires [Node.js](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) to run.

Download or clone the project on your machine, install the dependencies and start the server.

```sh
cd project_folder
npm install
```

## Usage
In order to use this application you will also need to run the [API](https://github.com/luisfilipemendonca/SocialNetwork-backend) on your machine.

### Development

```sh
cd project_folder
npm start
```

By default the application will run on [http://localhost:3000](http://localhost:3000).

The application is configured to use the API running on port 3001. If you change that backend port, change the .env file on the project root with the new port.
```sh
REACT_APP_BACKEND_PORT=3001
```
