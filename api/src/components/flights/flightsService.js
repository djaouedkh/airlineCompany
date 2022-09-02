import { Airplanes, Flights } from "../../db/sequelize.js"
import { Op } from 'sequelize';

export default class FlightService {

    async get(id){
        return await Flights.findByPk(id, {include: ["airplane_of_flight"]})
    }

    async getAll(){
        return await Flights.findAll({include: ["airplane_of_flight"], order: [['flightNumber', 'ASC']]})
    }

    async getAllBy(criteriaKey, criteriaValue){
        if (criteriaKey === "idAirplane") {
            return await Flights.findAndCountAll({
                include: {
                    model: Airplanes,
                    as: 'airplane_of_flight',
                    where: {
                        [criteriaKey]: criteriaValue
                    }
                }
            });
        }
        else{
            return await Flights.findAndCountAll({ where: { [criteriaKey]: { [Op.like]: `%${criteriaValue}%` }}, include: ["airplane_of_flight"], order: [['flightNumber', 'ASC']]})
        }
    }

    async post(data){
        return await Flights.create(data)
    }

    async update(id, newData){
        return await Flights.update(newData, { where: { idFlight: [id] }})
    }

    async delete(id){
        return await Flights.destroy({ where: { idFlight: [id] }})
    }
}