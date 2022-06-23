/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export function up(knex) {
  return knex.schema.createTable('movies', table => {
    table.increments('id')
    table.string('title', 255).unique().notNullable().comment('Unique, nonull, no default set')
    table.string('description', 255).notNullable().comment('Nonull, no default set')
    table.integer('likes').defaultTo(0).notNullable().comment('Nonull, defaults to 0')
    table.boolean('favorite').defaultTo(false).notNullable().comment('Nonull, defaults to false') // untested
    table.timestamps(false, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists('movies')
}
