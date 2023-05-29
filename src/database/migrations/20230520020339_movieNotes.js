exports.up = knex => knex.schema.createTable('movieNotes', table => {
  table.increments('id').primary();
  table.string('title').notNullable();
  table.string('description');
  table.integer('rating').notNullable();
  table.integer('user_id').references('id').inTable('users').onDelete("CASCADE");
  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.fn.now());
}) ;

exports.down = knex => knex.schema.dropTable('movieNotes');