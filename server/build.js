import knex from 'knex'

const config = {
client: 'postgresql',
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "miniapp1pwd",
  },
};

const instance = knex({ client: config.client, connection: config.connection });

instance.raw('CREATE DATABASE miniapp1').then(function () {
  instance.destroy();
});