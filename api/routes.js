import express from 'express';
import userRoutes from './src/components/users/usersApiRoutes.js';
import bookingRoutes from './src/components/bookings/bookingsApiRoutes.js'
import airplaneRoutes from './src/components/airplanes/airplanesApiRoutes.js'
import flightRoutes from './src/components/flights/flightsApiRoutes.js'
import cityRoutes from './src/components/cities/citiesApiRoutes.js'
import authApi from './src/middlewares/auth/authApi.js';

const app = express();
const router = express.Router();



// ... chargement de vos prochaines routes ici
router.use('/', authApi.getAuthByApiKey);
router.use('/users', userRoutes)
router.use('/bookings', bookingRoutes)
router.use('/airplanes', airplaneRoutes)
router.use('/flights', flightRoutes)
router.use('/cities', cityRoutes)

// Si une route n'existe pas, erreur 404
router.route("*").all((req,res) => { res.status(404).send(); });
 
export default router;