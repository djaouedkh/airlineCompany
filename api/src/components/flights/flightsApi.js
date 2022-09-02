import Service from './flightsService.js';
import { ValidationError, UniqueConstraintError } from 'sequelize';

export default class FlightApi {

    constructor(){
        this.service = new Service();
    }

    /**
     * @api {get} /flights/:id Request flight information
     * @apiName get
     * @apiGroup Flight
     *
     * @apiParam {Number} id Flight's unique ID.
     *
     * @apiHeader {String} authorization x-api-key <API_KEY>.
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "x-api-key": "1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X"
     *     }
     *
     * @apiError {json} apikey incorrecte
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {"error":"Bad Request"}
     *
     * @apiError {json} Flight Not Found
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Flight Not Found."
     *     }
     *
     * @apiSuccess {json} data Flight.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "flightNumber": 1,
     *       "departureDate": "john",
     *       "departureTime": "Doe",
     *       "arrivalDate": 25,
     *       "arrivalTime": "38 rue ....",
     *       "priceOfSeatFirstClass": 100,
     *       "priceOfSeatSecondClass": 50,
     *       "from": 1, => FK -> idCity
     *       "destination": 5, => FK -> idCity
     *       "idAirplane": 1,
     *     }
     */
    async get(req, res){
        await this.service.get(req.params.id)
        .then((data) => {
            if (data != null) {
                const message = "Le vol à bien été trouvé."
                res.json({ message, data })
            }
            else{
                const message = "Le vol n'existe pas."
                res.json({ message, data })
            }
        })
        .catch((error) => {
            const message = 'Le vol n\'a pas pu etre récupérée. Réessayez dans quelques instants.';
            res.status(500).json({message, data: error.message});
        })
    }

    /**
     * @api {get} /flights/ Request flights informations
     * @api {get} /flights?flightNumber=1 Request flights informations
     * @api {get} /flights?idAirplane=1 Request flights informations
     * @apiName getAll
     * @apiGroup Flights
     *
     * @apiHeader {String} authorization x-api-key <API_KEY>.
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "x-api-key": "1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X"
     *     }
     *
     * @apiError {json} apikey incorrecte
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {"error":"Bad Request"}
     *
     * @apiError {json} Flights Not Found
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Flights Not Found."
     *     }
     *
     * @apiSuccess {json} data Flights.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "flightNumber": 1,
     *       "departureDate": "john",
     *       "departureTime": "Doe",
     *       "arrivalDate": 25,
     *       "arrivalTime": "38 rue ....",
     *       "priceOfSeatFirstClass": 100,
     *       "priceOfSeatSecondClass": 50,
     *       "from": 1, => FK -> idCity
     *       "destination": 5, => FK -> idCity
     *       "idAirplane": 1,
     *     } ...
     */
    async getAll(req, res){
        const query = req.query;
        if (query.flightNumber || query.idAirplane) {
            // const flightNumber = query.flightNumber;
            const criteriaKey = query.hasOwnProperty('flightNumber') ? 'flightNumber' : query.hasOwnProperty('idAirplane') ? 'idAirplane' : false;
            const criteriaValue = query.flightNumber || query.idAirplane;

            await this.service.getAllBy(criteriaKey, criteriaValue)
            .then(({count, rows}) => { 
                const message = `Il y a ${count} vol(s) qui correspondent au critère de recherche ${criteriaKey} et le terme ${criteriaValue}.`;
                res.json({message, data: rows});
            })
            .catch((error) => {
                console.log(error);
                const message = 'Le ou les vols n\'ont pas pu etre récupérées. Réessayez dans quelques instants.';
                res.status(500).json({message, data: error.message });
            })
        }
        else{
            await this.service.getAll()
            .then((data) => {
                const message = 'La liste des vols a bien été récupérée (aucun critère de recherche existant ou valide).'
                res.json({ message, data })
            })
            .catch((error) => {
                const message = 'La liste des vols n\'a pas pu etre récupérée. Réessayez dans quelques instants.';
                res.status(500).json({message, data: error.message});
            })
        }
    }

    /**
     * @api {post} /flights/ Request flights create
     * @apiName postFlights
     * @apiGroup Flights
     * 
     * @apiBody {String} [flightNumber]  
     * @apiBody {Date} [departureDate]  
     * @apiBody {Time} [departureTime]  
     * @apiBody {Date} [arrivalDate]  
     * @apiBody {Time} [arrivalTime]  
     * @apiBody {int} [priceOfSeatFirstClass]  
     * @apiBody {int} [priceOfSeatSecondClass]  
     * @apiBody {int} [idAirplane]  
     * @apiBody {int} [destination]  
     * @apiBody {int} [from]  
     *
     * @apiHeader {String} authorization x-api-key <API_KEY>.
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "x-api-key": "1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X"
     *     }
     *
     * @apiError {json} apikey incorrecte
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {"error":"Bad Request"}
     *
     * @apiError {json} Flights Not Create
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Flights Not Create."
     *     }
     *
     * @apiSuccess {json} data Flights.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "flightNumber": 1,
     *       "departureDate": "john",
     *       "departureTime": "Doe",
     *       "arrivalDate": 25,
     *       "arrivalTime": "38 rue ....",
     *       "priceOfSeatFirstClass": 100,
     *       "priceOfSeatSecondClass": 50,
     *       "from": 1, => FK -> idCity
     *       "destination": 5, => FK -> idCity
     *       "idAirplane": 1,
     *     }
     */
    async post(req, res){
        await this.service.post(req.body)            
        .then((data) => {
            const message = `Le vol ${req.body.flightNumber} a bien été crée.`
            res.json({ message, data })
        })
        .catch(error => {
            console.log(error);
            if (error instanceof UniqueConstraintError) {
                return res.status(400).json({message: error.message, error: error.errors});
            }
            if (error instanceof ValidationError) {
                return res.status(400).json({message: error.message, data: error.errors});
            }
            const message = 'Le vol n\'a pas pu etre ajouté. Réessayez dans quelques instants.';
            res.status(500).json({message, data: error});
        })
    }

    /**
     * @api {update} /flights/ Request flights edit
     * @apiName updateFlights
     * @apiGroup Flights
     * 
     * @apiBody All fields are optionnals  
     * 
     * @apiParam {Number} id Flights's unique ID.
     *
     * @apiHeader {String} authorization x-api-key <API_KEY>.
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "x-api-key": "1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X"
     *     }
     *
     * @apiError {json} apikey incorrecte
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {"error":"Bad Request"}
     *
     * @apiError {json} Flights Not update
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Flights Not update."
     *     }
     *
     * @apiSuccess {json} data FlightsUpdate.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "flightNumber": 1,
     *       "departureDate": "john",
     *       "departureTime": "Doe",
     *       "arrivalDate": 25,
     *       "arrivalTime": "38 rue ....",
     *       "priceOfSeatFirstClass": 100,
     *       "priceOfSeatSecondClass": 50,
     *       "from": 1, => FK -> idCity
     *       "destination": 5, => FK -> idCity
     *       "idAirplane": 1,
     *     }
     */
    async update(req, res){
        await this.service.get(req.params.id)
        .then(data => {

            if (data === null) {
                const message = 'Le vol n\'existe pas.';
                return res.status(404).json({message});
            }

            const dataUpdate = data;
            return this.service.update(dataUpdate.idFlight, req.body)
            .then(() => {
                const message = `Le vol avec l'identifiant n°${dataUpdate.idFlight} a bien été modifié.`
                res.json({message, dataUpdate })
            })
        })
        .catch((error) => {
            if (error instanceof UniqueConstraintError) {
                const message = 'Les données fournies existent déja pour un autre utilisateur.'
                return res.status(400).json( {message, data: error})
            }
            if (error instanceof ValidationError) {
                const message = 'Les données fournies ne correspondent pas aux données utilisateurs attendues.'
                return res.status(400).json({message, data: error});
            }
            const message = 'Le vol n\'a pas pu etre modifié. Réessayez dans quelques instants.';
            res.status(500).json({message, data: error.message});
        })
    }

    /**
     * @api {delete} /flights/ Request flights delete
     * @apiName deleteFlights
     * @apiGroup Flights
     * 
     * @apiParam {Number} id Flights's unique ID.
     *
     * @apiHeader {String} authorization x-api-key <API_KEY>.
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "x-api-key": "1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X"
     *     }
     *
     * @apiError {json} apikey incorrecte
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {"error":"Bad Request"}
     *
     * @apiError {json} Flights Not delete
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Flights Not delete."
     *     }
     *
     * @apiSuccess {json} data FlightsDelete.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "flightNumber": 1,
     *       "departureDate": "john",
     *       "departureTime": "Doe",
     *       "arrivalDate": 25,
     *       "arrivalTime": "38 rue ....",
     *       "priceOfSeatFirstClass": 100,
     *       "priceOfSeatSecondClass": 50,
     *       "from": 1, => FK -> idCity
     *       "destination": 5, => FK -> idCity
     *       "idAirplane": 1,
     *     }
     */
    async delete(req, res){
        await this.service.get(req.params.id)
        .then(data => {

            if (data === null) {
                const message = 'Le vol n\'existe pas. Réessayez dans quelques instants.';
                return res.status(404).json({message});
            }

            const dataDeleted = data;
            return this.service.delete(dataDeleted.idFlight)
            .then(() => {
                const message = `Le vol avec l'identifiant n°${dataDeleted.idFlight} a bien été supprimé.`
                res.json({message, dataDeleted })
            })
        })
        .catch(error => {
            const message = 'Le vol n\'a pas pu etre supprimé. Réessayez dans quelques instants.';
            res.status(500).json({message, data: error.message});
        })
    }
}