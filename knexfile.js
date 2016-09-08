module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgresql://localhost/wrestlers_db',
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  }
};
