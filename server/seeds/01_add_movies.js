/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 export async function seed(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE movies CASCADE')
  await knex('movies').del()
  await knex('movies').insert([
    {title: 'Twister', description: 'People try to prevent large swirling dust clouds from ripping apart everything.'},
    {title: 'Dark Knight', description: 'Rich bat uses mechanical knowledge to terrorize funny man.'}
  ]);
}
