const { response } = require('express');
const connection = require('../database/db');

module.exports = {
    async index (request,response){
        const {page = 1} = request.query;

        const [count] = await connection('chamado').count();
    
        const chamado = await connection('chamado')
        .join('usuario','usuario.id','=','chamado.usuario_id')
        .limit(5)
        .offset((page-1)*5)
        .select(['chamado.title',
        'chamado.description',
        'chamado.equipment',
        'chamado.serial_number',
        'chamado.opening_time',
        'usuario.name',
        'usuario.email',
        'usuario.sector']);
    
        response.header('X-Total-Count', count['count']);
        return response.json(chamado);
    }, 


    async create(request,response){
        const {title, description, equipment} = request.body;
        var diaAtual = new Date();
        var dia = diaAtual.getDate();
        var ano = diaAtual.getFullYear();
        var hora = diaAtual.getHours();
        var minuto = diaAtual.getMinutes();
        var segundo = diaAtual.getSeconds();

        const serial_number = (ano+''+hora+''+minuto+''+segundo);
        const usuario_id = request.headers.authorization;
        const opening_time = (hora+":"+minuto+":"+segundo);
        const [id] = await connection('chamado').insert({
        title,
        description,
        equipment,
        serial_number,
        opening_time,
        usuario_id,

    });

    return response.json({ id });
    },

    async delete (request,response){
        const {id} = request.params;
        const usuario_id = request.headers.authorization;

        const chamados = await connection('chamado')
        .where('id',id)
        .select('usuario_id')
        .first();

        if(chamados.usuario_id !== usuario_id){
            return response.status(401).json({error: 'operation nor permited'});
        }
     await connection('chamado').where('id',id).delete();
     return response.status(204).send();
    }
};