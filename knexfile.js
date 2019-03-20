// Update with your config settings.

module.exports = {
    production: {
      client: 'pg',
      connection: {
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE,
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
