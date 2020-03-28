const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        if(!ong) {
            return response.status(400).json({ error: 'No ONG found with this ID'});
        }

        return response.json(ong);
    },

    async removeOng(request, response){

        const ong_id = request.headers.authorization;  

        await connection('incidents').where('ong_id', ong_id).delete();

        await connection('ongs').where('id', ong_id).delete();

        return response.status(204).send();
    }
}