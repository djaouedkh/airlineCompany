import { Cities } from "../../db/sequelize.js"
import { Op } from 'sequelize';

export default class CityService {

    async get(id){
        return await Cities.findByPk(id)
    }

    async getAll(){
        return await Cities.findAll({order: [['name', 'ASC']]})
    }

    async getAllBy(term){
        return await Cities.findAndCountAll({ where: { postalCode: { [Op.like]: `%${term}%` }}, order: [['postalCode', 'ASC']]})
    }

    async post(data){
        return await Cities.create(data)
    }

    async update(id, newData){
        return await Cities.update(newData, { where: { idCity: [id] }})
    }

    async delete(id){
        return await Cities.destroy({ where: { idCity: [id] }})
    }
}