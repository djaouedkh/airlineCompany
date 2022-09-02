import { Airplanes, Flights } from "../../db/sequelize.js"
import { Op } from 'sequelize';

export default class AirplaneService {

    async get(id){
        return await Airplanes.findByPk(id)
    }

    async getAll(){
        return await Airplanes.findAll({order: [['airplaneNumber', 'ASC']]})
    }

    async getAllBy(criteriaKey, criteriaValue){
        if (criteriaKey === 'datesBooking') {
            return await Airplanes.findAndCountAll({
                attributes: ['idAirplane'],
                include: {
                    model: Flights,
                    as: 'airplane_of_flight',
                    where: {
                        [Op.or]: [
                            {departureDate: {[Op.in]: [criteriaValue.departureDate]}},
                            {arrivalDate: {[Op.in]: [criteriaValue.departureDate]}},
                            {arrivalDate: {[Op.in]: [criteriaValue.arrivalDate]}},
                            {arrivalDate: {[Op.in]: [criteriaValue.arrivalDate]}},
                        ]
                    }
                }
            })
            .then((data) => {
                let allIdsUnavailable = data.rows.map((airplane) => airplane.idAirplane);
                return Airplanes.findAndCountAll({
                    attributes: ['idAirplane'],
                    where: {
                        idAirplane: {
                            [Op.notIn]: allIdsUnavailable
                        }
                    }
                })
            })
        }
        return await Airplanes.findAndCountAll({ where: { [criteriaKey]: { [Op.like]: `%${criteriaValue}%` }}, include: ["airplane_of_flight"], order: [['airplaneNumber', 'ASC']]})
    }

    async post(data){
        return await Airplanes.create(data)
    }

    async update(id, newData){
        return await Airplanes.update(newData, { where: { idAirplane: [id] }})
    }

    async delete(id){
        return await Airplanes.destroy({ where: { idAirplane: [id] }})
    }
}