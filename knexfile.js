// Update with your config settings.
let herokuinfo = require('./herokuinfo')

module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: herokuinfo.host,
        database: herokuinfo.database,
        user: herokuinfo.user,
        password: herokuinfo.password,
        ssl: true
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
