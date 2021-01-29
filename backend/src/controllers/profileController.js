const connection = require('../database/db');
module.exports = {
    async index(request, response){
        const usuario_id = request.headers.authorization;

        const chamado = await connection('chamado')
        .where('usuario_id',usuario_id)
        .select('*');

        return response.json(chamado); 
    }
}