// Update with your config settings.

module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_URL,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        ssl: true
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'migrations'
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
    }
  }

};
