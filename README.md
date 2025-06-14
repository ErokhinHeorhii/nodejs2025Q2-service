# Home Library Service

## Description

Home Library Service is a REST API service for managing a home library of music tracks, albums, artists, and user favorites. The service is built using NestJS framework and uses PostgreSQL as a database with TypeORM for data management.

## Prerequisites

- Node.js (version 22.14.0 or higher)
- Docker and Docker Compose
- Docker Hub account

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd home-library-service
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```
PORT=4000
NODE_ENV=development
```

## Running the application

Build and run the application using Docker Compose:
```bash
docker-compose up --build
```

The application will be available at `http://localhost:4000`.

## API Documentation

Once the application is running, you can access the API documentation at:
```
http://localhost:4000/doc
```

## Docker Configuration

The project includes the following Docker-related files:

- `.dockerignore` - Specifies files and directories to be excluded from Docker builds
- `Dockerfile` - Configuration for building the application image
- `Dockerfile.postgres` - Configuration for building the PostgreSQL database image
- `docker-compose.yml` - Configuration for running the multi-container application

### Docker Images

The application uses two Docker images:
1. Node.js application image (based on node:20-alpine)
2. PostgreSQL database image (based on postgres:15)

### Docker Network

The containers communicate through a custom network defined in `docker-compose.yml`.

## Database

The application uses PostgreSQL as its database with the following tables:
- Users
- Artists
- Albums
- Tracks
- Favorites

TypeORM is used as the ORM for database operations.

## Testing

To run the tests (make sure Docker containers are running):
```bash
npm test
```

## License

MIT
