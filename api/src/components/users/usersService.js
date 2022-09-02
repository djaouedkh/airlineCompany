import { Users } from "../../db/sequelize.js"
import { Op } from 'sequelize';

export default class UserService {

    async getUser(idUser){
        return await Users.findByPk(idUser)
    }

    async getUserBy(criteriaKey, criteriaValue){
        return await Users.findOne({ where: { [criteriaKey]: criteriaValue } })
    }

    async getAllUsers(){
        return await Users.findAll({
            attributes: {
                exclude: ['uuid', 'password']
            },
            order: [['username', 'ASC']]})
    }

    async getAllUsersBy(terms){
        Object.entries(terms).map(term => {
            console.log(term[0]);
        })
        // return await Users.findAndCountAll({ where: { username: { [Op.like]: `%${terms.username}%` }}, order: [['username', 'ASC']]})
        return await Users.findAndCountAll({ 
            where: { 
                [Op.and]: [
                    Object.entries(terms).map(term => {
                        if (term[0] === 'username') {
                            return {[term[0]]: {[Op.like]: `%${term[1]}%`}}
                        }
                        else{
                            return {[term[0]]: term[1]}
                        }
                    })
                ]
            }, 
            order: [['username', 'ASC']]})
    }

    async postUser(dataUser){
        return await Users.create(dataUser)
    }

    async updateUser(idUser, newUserData){
        return await Users.update(newUserData, { where: { idUser: [idUser] }})
    }

    async deleteUser(idUser){
        return await Users.destroy({ where: { idUser: [idUser] }})
    }

}