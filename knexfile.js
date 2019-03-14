// Update with your config settings.

module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: '127.0.0.1',
        database: 'postgres',
        user: 'postgres',
        password: 'test'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'notes'
      }
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './test/test.db'
    },
    useNullAsDefault: true,
    seeds: {
      directory: './seeds'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'testnotes'
    }
  }

};
