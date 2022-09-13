# Challenge-full-stack-web-chat

- [Full-stack-challenge](#astran-challenge)
  - [About](#about)
- [Running the project](#running-the-project)
  - [Backend](#backend)
  - [Frontend](#frontend)

## About

A FullStack challenge to create a web chat.
<br>

The project's Backend was made using [Node.js](https://nodejs.org/en/), [Socket.IO](https://socket.io/) and [Express.js](https://expressjs.com/). The frontend was made with [React.js](https://reactjs.org/) and [Socket.IO](https://socket.io/).

The chat allows two or more users to communicate in real time, and in case the user is an administrator, it also allows deleting and saving deleted messages on their personal computer.

Both frontend and backend have README explaining its use.

# Running the project

Both projects use yarn as the package manager.

```bash
# Install yarn
$ npm install --global yarn
```

## Backend

First navigate to `api` folder then run the docker script.

```bash
# change directory
$ cd api

# build project
$ yarn run docker
```

It should be running on `https://localhost:3001`
<br>

## Frontend

To start the application, navigate to `web` folder and run the dev script.

```bash
# on project root folder
$ cd web

# install dependencies
$ yarn

# start script
$ yarn run dev
```
It should be running on `https://localhost:3000`
<br>