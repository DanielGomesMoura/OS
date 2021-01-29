
exports.up = function(knex) {
    return knex.schema.createTable('chamado', function (table){
        table.increments('id'); 
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('equipment').notNullable();
        table.string('serial_number').notNullable();
        table.string('opening_time').notNullable();
        table.string('start_time');
        table.string('close_time');
        table.string('solution');
        table.string('usuario_id').notNullable();
         
        table.foreign('usuario_id').references('id').inTable('usuario');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('chamado'); 
};
