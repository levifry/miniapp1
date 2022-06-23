import knex from 'knex';
import { development } from "./knexfile.js";

const database = knex(development);

export default database;
