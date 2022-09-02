import Service from './airplanesService.js';
import { ValidationError, UniqueConstraintError } from 'sequelize';

export default class AirplaneApi {

    constructor(){
        this.service = new Service();
    }

    /**
     * @api {get} /airplanes/:id Request airplane information
     * @apiName get
     * @apiGroup airplane
     *
     * @apiParam {Number} id airplane's unique ID.
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
     * @apiError {json} Airplane Not Found
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Airplane Not Found."
     *     }
     *
     * @apiSuccess {json} data airplane.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "airplaneNumber": 1,
     *       "brand": "boeing",
     *       "numberOfSeatsFirstClass": 50,
     *       "numberOfSeatsSecondClass": 20,
     *     }
     */
    async get(req, res){
        await this.service.get(req.params.id)
        .then((data) => {
            if (data != null) {
                const message = "L\'avion à bien été trouvé."
                res.json({ message, data })
            }
            else{
                const message = "L\'avion n'existe pas."
                res.json({ message, data })
            }
        })
        .catch((error) => {
            const message = 'L\'avion n\'a pas pu etre récupérée. Réessayez dans quelques instants.';
            res.status(500).json({message, data: error.message});
        })
    }

    /**
     * @api {get} /airplanes/ Request airplanes informations
     * @api {get} /airplanes?numberBooking=1 Request airplanes informations
     * @api {get} /airplanes?datesBooking[departureDate]=2022-09-01&datesBooking[arrivalDate]=2022-09-02 Request airplanes informations
     * @apiName getAll
     * @apiGroup airplanes
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
     * @apiError {json} Airplanes Not Found
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Airplanes Not Found."
     *     }
     *
     * @apiSuccess {json} data airplanes.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "airplaneNumber": 1,
     *       "brand": "boeing",
     *       "numberOfSeatsFirstClass": 50,
     *       "numberOfSeatsSecondClass": 20,
     *     }
     *     ...
     */
    async getAll(req, res){
        const query = req.query;
        if (query.airplaneNumber || query.datesBooking) {
            // query Get for datesBooking = datesBooking[departureDate]=2022-08-01&datesBooking[arrivalDate]=2022-08-02
            const criteriaKey = query.hasOwnProperty('airplaneNumber') ? 'airplaneNumber' : query.hasOwnProperty('datesBooking') ? 'datesBooking' : false;
            const criteriaValue = query.airplaneNumber || query.datesBooking;

            await this.service.getAllBy(criteriaKey, criteriaValue)
            .then(({count, rows}) => { 
                const message = `Il y a ${count} avion(s) qui correspondent au critère de recherche ${criteriaKey} et le terme ${criteriaValue}.`;
                res.json({message, data: rows});
            })
            .catch((error) => {
                const message = 'Le ou les avions n\'ont pas pu etre récupérées. Réessayez dans quelques instants.';
                res.status(500).json({message, data: error.message });
            })
        }
        else{
            await this.service.getAll()
            .then((data) => {
                const message = 'La liste des avions a bien été récupérée (aucun critère de recherche existant ou valide).'
                res.json({ message, data })
            })
            .catch((error) => {
                const message = 'La liste des avions n\'a pas pu etre récupérée. Réessayez dans quelques instants.';
                res.status(500).json({message, data: error.message});
            })
        }
    }

    /**
     * @api {post} /airplanes/ Request airplanes create
     * @apiName post
     * @apiGroup airplanes
     * 
     * @apiBody {int} [numberBooking]  
     * @apiBody {int} [seatNumber]  
     * @apiBody {String} [classTravel]  
     * @apiBody {int} [idUser]  
     * @apiBody {int} [idFlight]  
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
     * @apiError {json} Airplanes Not Create
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Airplanes Not Create."
     *     }
     *
     * @apiSuccess {json} data airplanes.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "airplaneNumber": 1,
     *       "brand": "boeing",
     *       "numberOfSeatsFirstClass": 50,
     *       "numberOfSeatsSecondClass": 20,
     *     }
     */
    async post(req, res){
        await this.service.post(req.body)            
        .then((data) => {
            const message = `L\'avion ${req.body.airplaneNumber} a bien été crée.`
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
            const message = 'L\'avion n\'a pas pu etre ajouté. Réessayez dans quelques instants.';
            res.status(500).json({message, data: error});
        })
    }

    /**
     * @api {update} /airplanes/ Request airplanes edit
     * @apiName update
     * @apiGroup airplanes
     * 
     * @apiBody All fields are optionnals  
     * 
     * @apiParam {Number} id airplanes's unique ID.
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
     * @apiError {json} Airplanes Not update
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Airplanes Not update."
     *     }
     *
     * @apiSuccess {json} data airplanesUpdate.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "airplaneNumber": 1,
     *       "brand": "boeing",
     *       "numberOfSeatsFirstClass": 50,
     *       "numberOfSeatsSecondClass": 20,
     *     }
     */
    async update(req, res){
        await this.service.get(req.params.id)
        .then(data => {

            if (data === null) {
                const message = 'L\'avion n\'existe pas.';
                return res.status(404).json({message});
            }

            const dataUpdate = data;
            return this.service.update(dataUpdate.idAirplane, req.body)
            .then(() => {
                const message = `L\'avion avec l'identifiant n°${dataUpdate.idAirplane} a bien été modifié.`
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
            const message = 'L\'avion n\'a pas pu etre modifié. Réessayez dans quelques instants.';
            res.status(500).json({message, data: error.message});
        })
    }

    /**
     * @api {delete} /airplanes/ Request airplanes delete
     * @apiName delete
     * @apiGroup airplanes
     * 
     * @apiParam {Number} id airplanes's unique ID.
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
     * @apiError {json} Airplanes Not delete
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Airplanes Not delete."
     *     }
     *
     * @apiSuccess {json} data airplanesDelete.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
      *     {
     *       "airplaneNumber": 1,
     *       "brand": "boeing",
     *       "numberOfSeatsFirstClass": 50,
     *       "numberOfSeatsSecondClass": 20,
     *     }
     */
    async delete(req, res){
        await this.service.get(req.params.id)
        .then(data => {

            if (data === null) {
                const message = 'L\'avion n\'existe pas. Réessayez dans quelques instants.';
                return res.status(404).json({message});
            }

            const dataDeleted = data;
            return this.service.delete(dataDeleted.idAirplane)
            .then(() => {
                const message = `L\'avion avec l'identifiant n°${dataDeleted.idAirplane} a bien été supprimé.`
                res.json({message, dataDeleted })
            })
        })
        .catch(error => {
            const message = 'L\'avion n\'a pas pu etre supprimé. Réessayez dans quelques instants.';
            res.status(500).json({message, data: error.message});
        })
    }
}