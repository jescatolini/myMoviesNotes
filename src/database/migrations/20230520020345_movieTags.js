exports.up = knex => knex.schema.createTable('movieTags', table => {
  table.increments('id').primary();
  table.integer('user_id').references('id').inTable('users').onDelete("CASCADE");
  table.integer('note_id').references('id').inTable('movieNotes').onDelete("CASCADE");
  table.text('name').notNullable();
}) ;

exports.down = knex => knex.schema.dropTable('movieTags');