const connection = require('../database/db');

module.exports={
    async create(request,response){
        const {id} = request.body;

        const usuario = await connection('usuario')
        .where('id',id)
        .select('name')
        .first();
        
        if(!usuario){
        return response.status(400).json({error:'No Ong found with this ID'});
        }

        return response.json(usuario);
    }
}