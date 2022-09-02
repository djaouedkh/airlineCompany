import BookingService from './bookingsService.js';
import { ValidationError, UniqueConstraintError } from 'sequelize';

export default class BookingApi {

    constructor(){
        this.BookingService = new BookingService();
    }

    /**
     * @api {get} /bookings/:id Request booking information
     * @apiName get
     * @apiGroup booking
     *
     * @apiParam {Number} id booking's unique ID.
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
     * @apiError {json} Booking Not Found
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Booking Not Found."
     *     }
     *
     * @apiSuccess {json} data booking.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "numberBooking": 1,
     *       "seatNumber": 1,
     *       "classTravel": "First",
     *       "idUser": 1,
     *       "idFlight": 1,
     *     }
     */
    async get(req, res){
        await this.BookingService.get(req.params.id)
        .then((data) => {
            if (data != null) {
                const message = "La réservation à bien été trouvé."
                res.json({ message, data })
            }
            else{
                const message = "La réservation n'existe pas."
                res.json({ message, data })
            }
        })
        .catch((error) => {
            const message = 'La réservation n\'a pas pu etre récupérée. Réessayez dans quelques instants.';
            res.status(500).json({message, data: error.message});
        })
    }

    /**
     * @api {get} /bookings/ Request bookings informations
     * @api {get} /bookings?numberBooking=1 Request bookings informations
     * @apiName getAll
     * @apiGroup bookings
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
     * @apiError {json} Bookings Not Found
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Bookings Not Found."
     *     }
     *
     * @apiSuccess {json} data bookings.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "numberBooking": 1,
     *       "seatNumber": 1,
     *       "classTravel": "First",
     *       "idUser": 1,
     *       "idFlight": 1,
     *     }
     *     ...
     */
    async getAll(req, res){
        const query = req.query;
        if (query.numberBooking) {
            const numberBooking = query.numberBooking;

            await this.BookingService.getAllBy(numberBooking)
            .then(({count, rows}) => { 
                const message = `Il y a ${count} réservations(s) qui correspondent au critère de recherche numberBooking et le terme ${numberBooking}.`;
                res.json({message, data: rows});
            })
            .catch((error) => {
                console.log(error);
                const message = 'Le ou les réservations n\'ont pas pu etre récupérées. Réessayez dans quelques instants.';
                res.status(500).json({message, data: error.message });
            })
        }
        else{
            await this.BookingService.getAll()
            .then((data) => {
                const message = 'La liste des réservations a bien été récupérée (aucun critère de recherche existant ou valide).'
                res.json({ message, data })
            })
            .catch((error) => {
                const message = 'La liste des réservations n\'a pas pu etre récupérée. Réessayez dans quelques instants.';
                res.status(500).json({message, data: error.message});
            })
        }
    }

    /**
     * @api {post} /bookings/ Request bookings create
     * @apiName post
     * @apiGroup bookings
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
     * @apiError {json} Bookings Not Create
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Bookings Not Create."
     *     }
     *
     * @apiSuccess {json} data bookings.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "numberBooking": 1,
     *       "seatNumber": 1,
     *       "classTravel": "First",
     *       "idUser": 1,
     *       "idFlight": 1,
     *     }
     */
    async post(req, res){
        await this.BookingService.post(req.body)            
        .then((data) => {
            const message = `La réservation ${req.body.numberBooking} a bien été crée.`
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
            const message = 'La réservation n\'a pas pu etre ajouté. Réessayez dans quelques instants.';
            res.status(500).json({message, data: error});
        })
    }

    /**
     * @api {update} /bookings/ Request bookings edit
     * @apiName update
     * @apiGroup bookings
     * 
     * @apiBody All fields are optionnals  
     * 
     * @apiParam {Number} id bookings's unique ID.
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
     * @apiError {json} Bookings Not update
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Bookings Not update."
     *     }
     *
     * @apiSuccess {json} data bookingsUpdate.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "numberBooking": 1,
     *       "seatNumber": 1,
     *       "classTravel": "First",
     *       "idUser": 1,
     *       "idFlight": 1,
     *     }
     */
    async update(req, res){
        await this.BookingService.get(req.params.id)
        .then(data => {

            if (data === null) {
                const message = 'La réservation n\'existe pas.';
                return res.status(404).json({message});
            }

            const dataUpdate = data;
            return this.BookingService.update(dataUpdate.idBooking, req.body)
            .then(() => {
                const message = `La réservation avec l'identifiant n°${dataUpdate.idBooking} a bien été modifié.`
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
            const message = 'La réservation n\'a pas pu etre modifié. Réessayez dans quelques instants.';
            res.status(500).json({message, data: error.message});
        })
    }

    /**
     * @api {delete} /bookings/ Request bookings delete
     * @apiName delete
     * @apiGroup bookings
     * 
     * @apiParam {Number} id bookings's unique ID.
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
     * @apiError {json} Bookings Not delete
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Bookings Not delete."
     *     }
     *
     * @apiSuccess {json} data bookingsDelete.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "numberBooking": 1,
     *       "seatNumber": 1,
     *       "classTravel": "First",
     *       "idUser": 1,
     *       "idFlight": 1,
     *     }
     */
    async delete(req, res){
        await this.BookingService.get(req.params.id)
        .then(data => {

            if (data === null) {
                const message = 'La réservation n\'existe pas. Réessayez dans quelques instants.';
                return res.status(404).json({message});
            }

            const dataDeleted = data;
            return this.BookingService.delete(dataDeleted.idBooking)
            .then(() => {
                const message = `La réservation avec l'identifiant n°${dataDeleted.idBooking} a bien été supprimé.`
                res.json({message, dataDeleted })
            })
        })
        .catch(error => {
            const message = 'La réservation n\'a pas pu etre supprimé. Réessayez dans quelques instants.';
            res.status(500).json({message, data: error.message});
        })
    }
}