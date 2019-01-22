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
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
