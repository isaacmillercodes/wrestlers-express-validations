'use strict';

exports.up = (knex) => {
  return knex.schema.createTable('wrestlers', (table) => {
    table.increments();
    table.string('name').unique().notNullable();
    table.string('finishing_move').notNullable();
    table.string('catch_phrase');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('wrestlers');
};
