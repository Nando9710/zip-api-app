module.exports =  {
  "type": process.env.DATABASE_TYPE,
  "host": process.env.MYSQL_HOST,
  "port": process.env.MYSQL_PORT,
  "username": process.env.MYSQL_USERNAME,
  "password": process.env.MYSQL_ROOT_PASSWORD,
  "database": process.env.MYSQL_DATABASE,
  "synchronize": process.env.MYSQL_SYNCHRONIZE,
  "logging": false,
  "entities": [
    "dist/modules/**/*.entity{.ts,.js}"
  ],
  "migrations": [
    "dist/common/database/migrations/*{.ts,.js}"
  ],
  "subscribers": [
    "src/subscriber/**/*.{js,ts}"
  ],
  //  specify the directory with which all our migration, entity and subscription files will be created when we run their respective cli command
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/common/database/migrations",
    "subscribersDir": "src/subscriber"
  }
}