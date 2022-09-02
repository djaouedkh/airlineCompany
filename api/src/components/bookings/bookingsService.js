import { Bookings, Users, Cities, Flights } from "../../db/sequelize.js"
import { Op } from 'sequelize';

export default class BookingService {

    async get(id){
        // return await Bookings.findByPk(id, {include: ["user_of_booking"]})
        return await Bookings.findByPk(id, {
            include: [
                {
                    model: Users,
                    as: 'user_of_booking',
                }, 
                {
                    model: Flights,
                    as: 'flight_of_booking',
                }, 
                {
                    model: Cities,
                    as: 'city_of_booking',
                }
            ]
        })
    }

    async getAll(){
        return await Bookings.findAll({include: ["user_of_booking"], order: [['numberBooking', 'ASC']]})
    }

    async getAllBy(term){
        return await Bookings.findAndCountAll({ where: { username: { [Op.like]: `%${term}%` }}, order: [['numberBooking', 'ASC']]})
    }

    async post(data){
        return await Bookings.create(data)
    }

    async update(id, newData){
        return await Bookings.update(newData, { where: { idBooking: [id] }})
    }

    async delete(id){
        return await Bookings.destroy({ where: { idBooking: [id] }})
    }
}