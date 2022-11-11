import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('communication', (t) => {
    t.increments('id');
    t.integer('traveler_id').unsigned().notNullable();
    t
        .foreign('traveler_id')
        .references('id')
        .inTable('traveler')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    t.integer('current_user_id').unsigned().notNullable();
    t
        .foreign('current_user_id')
        .references('id')
        .inTable('user')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    t.json('travelers_communication_info')
    t.string('name')
    t.string('description')
    t.string('details')
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('communication');
}