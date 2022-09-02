import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {initDb} from './src/db/sequelize.js'
import general from './src/middlewares/general.js';
import apiRoutes from './routes.js';



const app = express();

// pour permettre le chargement des variables d'environnement
dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV.trim()}` : '.env' });

general(app, express, cookieParser, cors)

initDb();

//--------------------------------------------------------------------
//      Chargement des routes liées à l'API
//--------------------------------------------------------------------
app.use('/api', apiRoutes);
app.use('/apiDoc', express.static('./src/doc'));
 
//--------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------
app.listen(process.env.PORT,() => {
    console.log(`Le serveur est démarré : http://localhost:${process.env.PORT}`);
});
 
export default app;