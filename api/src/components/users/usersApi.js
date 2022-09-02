import UserService from './usersService.js';
import uuidAPIKey from 'uuid-apikey';

import { ValidationError, UniqueConstraintError } from 'sequelize';

export default class UserApi {

    constructor(){
        this.UserService = new UserService();
    }

    /**
     * @api {get} /users/:id Request User information
     * @apiName getUser
     * @apiGroup User
     *
     * @apiParam {Number} id User's unique ID.
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
     * @apiError {json} User Not Found
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "User Not Found."
     *     }
     *
     * @apiSuccess {json} data user.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "username": "john2",
     *       "firstname": "john",
     *       "lastname": "Doe",
     *       "age": 25,
     *       "adress": "38 rue ....",
     *       "apiKey": "771dhf-ednhoi..."
     *     }
     */
    async getUser(req, res){
        await this.UserService.getUser(req.params.id)
        .then((userData) => {
            if (userData != null) {
                const message = "L\'utilisateur à bien été trouvé."
                const apiKey = uuidAPIKey.toAPIKey(userData.uuid);
                delete userData.dataValues.uuid;
                delete userData.dataValues.password;
                res.json({ message, data: {...userData.dataValues, apiKey} })
            }
            else{
                const message = "L\'utilisateur n'existe pas."
                res.json({ message, data: userData })
            }
        })
        .catch((error) => {
            const message = 'L\'utilisateur n\'a pas pu etre récupérée. Réessayez dans quelques instants.';
            res.status(500).json({message, data: error.message});
        })
    }

    /**
     * @api {get} /users/ Request Users informations
     * @api {get} /users?username=Joh Request Users informations for All username that begin with "jo" => johnathan, joe, joshua etc..
     * @apiName getAllUser
     * @apiGroup User
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
     * @apiError {json} Users Not Found
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Users Not Found."
     *     }
     *
     * @apiSuccess {json} data users.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "username": "john2",
     *       "firstname": "john",
     *       "lastname": "Doe",
     *       "age": 25,
     *       "adress": "38 rue ....",
     *       "password": "$2b$10$KvypmFyOCkLZv6mB5nJBJeRAZWnYNISF4E7aNPj/RdLnn4P.C4f1K",
     *       "uuid": "12041ab4-e2f7-49aa-a48b-af6ce61e2b04"
     *     }
     *     .
     *     .
     *     .
     */
    async getAllUsers(req, res){
        var dateFrom = "02/05/2013";
        var dateTo = "02/09/2013";
        var dateCheck = "01/05/2013";

        var d1 = dateFrom.split("/");
        var d2 = dateTo.split("/");
        var c = dateCheck.split("/");

        var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  //-1 because months are from 0 to 11
        var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
        var check = new Date(c[2], parseInt(c[1])-1, c[0]);

        console.log(check >= from && check <= to)

        const query = req.query;
        if (query.username || query.age) {
            const username = query.username;
            if (username.length < 2) {
                const message = 'Le terme de recherche doit contenir au moins 2 caractères';
                return res.status(400).json({message});
            }
            await this.UserService.getAllUsersBy(query)
            // await this.UserService.getAllUsersBy(username)
            .then(({count, rows}) => { 
                const message = `Il y a ${count} utilisateur(s) qui correspondent au critère de recherche username et le terme ${username}.`;
                res.json({message, data: rows});
            })
            .catch((error) => {
                console.log(error);
                const message = 'Le ou les utilisateurs n\'ont pas pu etre récupérées. Réessayez dans quelques instants.';
                res.status(500).json({message, data: error.message });
            })
        }
        else{
            await this.UserService.getAllUsers()
            .then((usersData) => {
                const message = 'La liste des utilisateurs a bien été récupérée (aucun critère de recherche existant ou valide).'
                res.json({ message, data: usersData })
            })
            .catch((error) => {
                const message = 'La liste des utilisateurs n\'a pas pu etre récupérée. Réessayez dans quelques instants.';
                res.status(500).json({message, data: error.message});
            })
        }
    }

    /**
     * @api {post} /users/ Request Users create
     * @apiName postUser
     * @apiGroup User
     *
     * @apiBody {String} [username] 
     * @apiBody {String} [firstname] 
     * @apiBody {String} [lastname] 
     * @apiBody {int} [age] 
     * @apiBody {String} [adress] 
     * @apiBody {String} [password] 
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
     * @apiError {json} Users Not Create
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Users Not Create."
     *     }
     *
     * @apiSuccess {json} data user.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "username": "john2",
     *       "firstname": "john",
     *       "lastname": "Doe",
     *       "age": 25,
     *       "adress": "38 rue ....",
     *       "password": "38 rue ....",
     *     }
     */
    async postUser(req, res){
        req.body.uuid = uuidAPIKey.create().uuid; // create uuid for apiKey
        await this.UserService.postUser(req.body)            
        .then((data) => {
            const message = `L\'utilisateur ${req.body.username} a bien été crée.`
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
            const message = 'L\'utilisateur n\'a pas pu etre ajouté. Réessayez dans quelques instants.';
            res.status(500).json({message, data: error});
        })
    }

    /**
     * @api {update} /users/ Request Users edit informations
     * @apiName updateUser
     * @apiGroup User
     * 
     * @apiBody All fields are optionnals
     * 
     * @apiParam {Number} id User's unique ID.
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
     * @apiError {json} Users Not update
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Users Not update."
     *     }
     *
     * @apiSuccess {json} data userUpdate.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "username": "john2",
     *       "firstname": "john",
     *       "lastname": "Doe",
     *       "age": 25,
     *       "adress": "38 rue ....",
     *       "password": "25527257527..."
     *     }
     */
    async updateUser(req, res){
        await this.UserService.getUser(req.params.id)
        .then(data => {

            if (data === null) {
                const message = 'L\'utilisateur n\'existe pas.';
                return res.status(404).json({message});
            }

            const dataUpdate = data;
            return this.UserService.updateUser(dataUpdate.idUser, req.body)
            .then(() => {
                const message = `L\'utilisateur avec l'identifiant n°${dataUpdate.idUser} a bien été modifié.`
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
            const message = 'L\'utilisateur n\'a pas pu etre modifié. Réessayez dans quelques instants.';
            res.status(500).json({message, data: error.message});
        })
    }

    /**
     * @api {delete} /users/ Request Users delete
     * @apiName deleteUser
     * @apiGroup User
     * 
     * @apiParam {Number} id User's unique ID.
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
     * @apiError {json} Users Not delete
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Users Not delete."
     *     }
     *
     * @apiSuccess {json} data userDelete.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "username": "john2",
     *       "firstname": "john",
     *       "lastname": "Doe",
     *       "age": 25,
     *       "adress": "38 rue ....",
     *       "password": "252524",
     *       "uuid": "25527257527..."
     *     }
     */
    async deleteUser(req, res){
        await this.UserService.getUser(req.params.id)
        .then(userData => {

            if (userData === null) {
                const message = 'L\'utilisateur n\'existe pas. Réessayez dans quelques instants.';
                return res.status(404).json({message});
            }

            const userDeleted = userData;
            return this.UserService.deleteUser(userDeleted.idUser)
            .then(() => {
                const message = `L\'utilisateur avec l'identifiant n°${userDeleted.idUser} a bien été supprimé.`
                res.json({message, userDeleted })
            })
        })
        .catch(error => {
            const message = 'L\'utilisateur n\'a pas pu etre supprimé. Réessayez dans quelques instants.';
            res.status(500).json({message, data: error.message});
        })
    }
}