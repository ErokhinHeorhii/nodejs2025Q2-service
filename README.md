# Home Library Service

A REST API service for managing a home library of music tracks, albums, artists, and user favorites.

## Description

This service provides endpoints for managing:
- Users
- Tracks
- Albums
- Artists
- Favorites

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```
PORT=4000
```

## API Documentation

The OpenAPI specification is available in the `doc` folder.

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Endpoints

### Users
- GET /users - Get all users
- GET /users/:id - Get user by id
- POST /users - Create user
- PUT /users/:id - Update user
- DELETE /users/:id - Delete user

### Tracks
- GET /tracks - Get all tracks
- GET /tracks/:id - Get track by id
- POST /tracks - Create track
- PUT /tracks/:id - Update track
- DELETE /tracks/:id - Delete track

### Albums
- GET /albums - Get all albums
- GET /albums/:id - Get album by id
- POST /albums - Create album
- PUT /albums/:id - Update album
- DELETE /albums/:id - Delete album

### Artists
- GET /artists - Get all artists
- GET /artists/:id - Get artist by id
- POST /artists - Create artist
- PUT /artists/:id - Update artist
- DELETE /artists/:id - Delete artist

### Favorites
- GET /favs - Get all favorites
- POST /favs/track/:id - Add track to favorites
- POST /favs/album/:id - Add album to favorites
- POST /favs/artist/:id - Add artist to favorites
- DELETE /favs/track/:id - Remove track from favorites
- DELETE /favs/album/:id - Remove album from favorites
- DELETE /favs/artist/:id - Remove artist from favorites

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
