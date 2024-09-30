# Zip REST API APP

## Install NestJS CLI

Run `npm install -g @nestjs/cli` to install NestJS CLI globally.

## Install dependencies

Checkout to branch `production`. Run `pnpm install` to install all dependencies.

## Prepare MySQL database with docker

Checkout to branch `production`. Run `docker-compose up -d` to start MySQL database.

## Seed database

Run `pnpm seed` to seed the first user in the database.

## Run app locally with nestjs

Checkout to branch `production`. Run `pnpm run start` for a dev server in `http://localhost:3000/`.