import Service from './citiesService.js';
import { ValidationError, UniqueConstraintError } from 'sequelize';

export default class CityApi {

    constructor(){
        this.service = new Service();
    }

    /**
     * @api {get} /cities/:id Request Cities information
     * @apiName get
     * @apiGroup Cities
     *
     * @apiParam {Number} id Cities's unique ID.
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
     * @apiError {json} Cities Not Found
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Cities Not Found."
     *     }
     *
     * @apiSuccess {json} data Cities.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "name": "paris",
     *       "postalCode": 75000,
     *     }
     */
    async get(req, res){
        await this.service.get(req.params.id)
        .then((data) => {
            if (data != null) {
                const message = "La ville à bien été trouvé."
                res.json({ message, data })
            }
            else{
                const message = "La ville n'existe pas."
                res.json({ message, data })
            }
        })
        .catch((error) => {
            const message = 'La ville n\'a pas pu etre récupérée. Réessayez dans quelques instants.';
            res.status(500).json({message, data: error.message});
        })
    }

    /**
     * @api {get} /cities/ Request cities informations
     * @api {get} /cities?postalCode=1 Request cities informations
     * @apiName getAll
     * @apiGroup cities
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
     * @apiError {json} Cities Not Found
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Cities Not Found."
     *     }
     *
     * @apiSuccess {json} data cities.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "name": "paris",
     *       "postalCode": 75000,
     *     }
     */
    async getAll(req, res){
        const query = req.query;
        if (query.postalCode) {
            const postalCode = query.postalCode;

            await this.service.getAllBy(postalCode)
            .then(({count, rows}) => { 
                const message = `Il y a ${count} ville(s) qui correspondent au critère de recherche airplaneNumber et le terme ${postalCode}.`;
                res.json({message, data: rows});
            })
            .catch((error) => {
                console.log(error);
                const message = 'Le ou les villes n\'ont pas pu etre récupérées. Réessayez dans quelques instants.';
                res.status(500).json({message, data: error.message });
            })
        }
        else{
            await this.service.getAll()
            .then((data) => {
                const message = 'La liste des villes a bien été récupérée (aucun critère de recherche existant ou valide).'
                res.json({ message, data })
            })
            .catch((error) => {
                const message = 'La liste des villes n\'a pas pu etre récupérée. Réessayez dans quelques instants.';
                res.status(500).json({message, data: error.message});
            })
        }
    }
}