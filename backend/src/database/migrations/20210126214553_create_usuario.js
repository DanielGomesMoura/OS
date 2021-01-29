
exports.up = function(knex) {
    return knex.schema.createTable('usuario', function (table){
        table.string('id').primary();
        table.text('name').notNullable();
        table.string('sector').notNullable();
        table.string('email').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('usuario');
};
