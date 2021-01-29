const crypto = require('crypto');
const connection = require('../database/db');

module.exports = {
    async index (request,response){
        const users = await connection('usuario').select('*');
    
        return response.json(users);
    }, 

    async create(request,response){
        const {name, sector, email} = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

  await  connection('usuario').insert({
        id,
        name,
        sector,
        email,
    })

    return response.json({id});
    }
};