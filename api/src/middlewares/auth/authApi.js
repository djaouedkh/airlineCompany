import uuidAPIKey from 'uuid-apikey';
// import jsonwebtoken from 'jsonwebtoken'
import UserService from '../../components/users/usersService.js';
 
const userService = new UserService();
 
class AuthApi {
    getAuthByApiKey(req, res, next) {
        console.log(req.headers['x-api-key']);
        // Validation de la clef API, ApiKey : 1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X
        if (typeof req.headers['x-api-key'] == 'undefined' || uuidAPIKey.isAPIKey(req.headers['x-api-key']) !== true ) {
            return res.status(400).json({error : `La demande n'est pas valide.`});
        }
        // Si la clef est valide, on peut continuer
        userService.getUserBy("uuid", uuidAPIKey.toUUID(req.headers['x-api-key']))
        .then(()=> {
            // On permet d'aller à la suite
            next();
        })
        .catch((error) => {
            return res.status(404).json({error});
        });
    }

}
 
export default new AuthApi();