CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

SET timezone = 'UTC';

CREATE SCHEMA IF NOT EXISTS home_library;

SET search_path TO home_library;

CREATE DATABASE home_library;
\c home_library; 