import { Sequelize, DataTypes } from 'sequelize';
import uuidAPIKey from 'uuid-apikey';

import usersTemplate from '../components/users/usersTemplate.js';
import airplanesTemplate from '../components/airplanes/airplanesTemplate.js';
import bookingsTemplate from '../components/bookings/bookingsTemplate.js';
import flightsTemplate from '../components/flights/flightsTemplate.js';
import citiesTemplate from '../components/cities/citiesTemplate.js';

let sequelize;

// bdd en ligne
if (process.env.NODE_ENV === 'prod') {
    console.log('bdd en ligne pas encore crée');    
}
// bdd localhost
else{
    sequelize = new Sequelize(
        'airlineCompany',
        'root',
        '',
        {
            host: 'localhost',
            // dialect: 'mssql',
            dialect: 'mariadb',
            dialectOptions: { timezone: 'Etc/GMT-2' },
            caseModel: 'c',
            logging: false
        }
    )
    console.log('bdd local');
}

const Users = usersTemplate(sequelize, DataTypes);
const Bookings = bookingsTemplate(sequelize, DataTypes);
const Airplanes = airplanesTemplate(sequelize, DataTypes);
const Flights = flightsTemplate(sequelize, DataTypes);
const Cities = citiesTemplate(sequelize, DataTypes);

// foreign keys
import foreignKeys from './foreignKeys.js';
foreignKeys(Users, Bookings, Airplanes, Flights, Cities)

const initDb = () => {
    return sequelize.sync({force: false})
    .then(() => {
        // Users.create({ 
        //     username: "salamèche",
        //     firstname: "salamèche",
        //     lastname: "salamèche",
        //     age: 25,
        //     adress: "salamèche",
        //     password: "salamèche",
        //     uuid: uuidAPIKey.create().uuid
        // })
        // Users.create({ 
        //     username: "pikachu",
        //     firstname: "pikachu",
        //     lastname: "pikachu",
        //     age: 25,
        //     adress: "pikachu",
        //     password: "pikachu",
        //     uuid: uuidAPIKey.create().uuid
        // })
        // Users.create({ 
        //     username: "carapuce",
        //     firstname: "carapuce",
        //     lastname: "carapuce",
        //     age: 25,
        //     adress: "carapuce",
        //     password: "carapuce",
        //     uuid: uuidAPIKey.create().uuid
        // })

        // Airplanes.create({ 
        //     airplaneNumber: 1,
        //     brand: "Boieng 720",
        //     numberOfSeatsFirstClass: 20,
        //     numberOfSeatsSecondClass: 40
        // })
        // Airplanes.create({ 
        //     airplaneNumber: 2,
        //     brand: "Boieng 720",
        //     numberOfSeatsFirstClass: 20,
        //     numberOfSeatsSecondClass: 40
        // })
        // Airplanes.create({ 
        //     airplaneNumber: 3,
        //     brand: "Boieng 720",
        //     numberOfSeatsFirstClass: 20,
        //     numberOfSeatsSecondClass: 40
        // })
        // Airplanes.create({ 
        //     airplaneNumber: 4,
        //     brand: "Boieng 720",
        //     numberOfSeatsFirstClass: 20,
        //     numberOfSeatsSecondClass: 40
        // })
        // Airplanes.create({ 
        //     airplaneNumber: 5,
        //     brand: "Boieng 720",
        //     numberOfSeatsFirstClass: 20,
        //     numberOfSeatsSecondClass: 40
        // })
        // Airplanes.create({ 
        //     airplaneNumber: 6,
        //     brand: "Boieng 720",
        //     numberOfSeatsFirstClass: 20,
        //     numberOfSeatsSecondClass: 40
        // })


        // Cities.create({ 
        //     name: 'Marseille',
        //     postalCode: '13000',
        // })
        // Cities.create({ 
        //     name: 'Paris',
        //     postalCode: '75000',
        // })
        // Cities.create({ 
        //     name: 'Toulon',
        //     postalCode: '83000',
        // })
        // Cities.create({ 
        //     name: 'Dijon',
        //     postalCode: '21000',
        // })
        // Cities.create({ 
        //     name: 'Montpellier',
        //     postalCode: '34000',
        // })
        // Cities.create({ 
        //     name: 'Toulouse',
        //     postalCode: '31000',
        // })
        // Cities.create({ 
        //     name: 'Bordeaux',
        //     postalCode: '33000',
        // })
        // Cities.create({ 
        //     name: 'Rennes',
        //     postalCode: '35000',
        // })
        // Cities.create({ 
        //     name: 'Nantes',
        //     postalCode: '44000',
        // })
        // Cities.create({ 
        //     name: 'Lille',
        //     postalCode: '59000',
        // })
        // Cities.create({ 
        //     name: 'Strasbourg',
        //     postalCode: '67000',
        // })
        // Cities.create({ 
        //     name: 'Nancy',
        //     postalCode: '54000',
        // })
        // Cities.create({ 
        //     name: 'Lyon',
        //     postalCode: '69000',
        // })
        // Cities.create({ 
        //     name: 'Annecy',
        //     postalCode: '74000',
        // })
        // Cities.create({ 
        //     name: 'Caen',
        //     postalCode: '14000',
        // })
        // Cities.create({ 
        //     name: 'Vannes',
        //     postalCode: '56000',
        // })
        // Cities.create({ 
        //     name: 'Niort',
        //     postalCode: '79000',
        // })
        // Cities.create({ 
        //     name: 'Carcassonne',
        //     postalCode: '11000',
        // })
        // Cities.create({ 
        //     name: 'Angers',
        //     postalCode: '49000',
        // })
        // Cities.create({ 
        //     name: 'Amiens',
        //     postalCode: '80000',
        // })

        // Flights.create({ 
        //     flightNumber: 1,
        //     priceOfSeatFirstClass: 100,
        //     priceOfSeatSecondClass: 50,
        //     idAirplane: 1,
        //     destination: 1,
        //     departureDate: "2022-09-01",
        //     arrivalDate: "2022-09-01",
        //     from: 2,
        // })
        // Flights.create({ 
        //     flightNumber: 2,
        //     priceOfSeatFirstClass: 100,
        //     priceOfSeatSecondClass: 50,
        //     idAirplane: 1,
        //     destination: 1,
        //     departureDate: "2022-09-05",
        //     arrivalDate: "2022-09-06",
        //     from: 2,
        // })
        // Flights.create({ 
        //     flightNumber: 3,
        //     priceOfSeatFirstClass: 100,
        //     priceOfSeatSecondClass: 50,
        //     idAirplane: 1,
        //     destination: 1,
        //     departureDate: "2022-09-15",
        //     arrivalDate: "2022-09-15",
        //     from: 2,
        // })
        // Flights.create({ 
        //     flightNumber: 4,
        //     priceOfSeatFirstClass: 100,
        //     priceOfSeatSecondClass: 50,
        //     idAirplane: 1,
        //     destination: 1,
        //     departureDate: "2022-09-22",
        //     arrivalDate: "2022-09-23",
        //     from: 2,
        // })
        // Flights.create({ 
        //     flightNumber: 5,
        //     priceOfSeatFirstClass: 100,
        //     priceOfSeatSecondClass: 50,
        //     idAirplane: 1,
        //     destination: 1,
        //     departureDate: "2022-09-10",
        //     arrivalDate: "2022-09-10",
        //     from: 2,
        // })
        // Flights.create({ 
        //     flightNumber: 6,
        //     priceOfSeatFirstClass: 100,
        //     priceOfSeatSecondClass: 50,
        //     idAirplane: 1,
        //     destination: 1,
        //     departureDate: "2022-09-29",
        //     arrivalDate: "2022-09-29",
        //     from: 2,
        // })
        // Flights.create({ 
        //     flightNumber: 7,
        //     priceOfSeatFirstClass: 100,
        //     priceOfSeatSecondClass: 50,
        //     idAirplane: 1,
        //     destination: 1,
        //     departureDate: "2022-10-02",
        //     arrivalDate: "2022-10-02",
        //     from: 2,
        // })

        // Flights.create({ 
        //     flightNumber: 8,
        //     priceOfSeatFirstClass: 100,
        //     priceOfSeatSecondClass: 50,
        //     idAirplane: 2,
        //     destination: 1,
        //     departureDate: "2022-09-01",
        //     arrivalDate: "2022-10-02",
        //     from: 2,
        // })
        // Flights.create({ 
        //     flightNumber: 9,
        //     priceOfSeatFirstClass: 100,
        //     priceOfSeatSecondClass: 50,
        //     idAirplane: 2,
        //     destination: 1,
        //     departureDate: "2022-09-06",
        //     arrivalDate: "2022-10-06",
        //     from: 2,
        // })
        // Flights.create({ 
        //     flightNumber: 10,
        //     priceOfSeatFirstClass: 100,
        //     priceOfSeatSecondClass: 50,
        //     idAirplane: 2,
        //     destination: 1,
        //     departureDate: "2022-09-11",
        //     arrivalDate: "2022-10-12",
        //     from: 2,
        // })
        // Flights.create({ 
        //     flightNumber: 11,
        //     priceOfSeatFirstClass: 100,
        //     priceOfSeatSecondClass: 50,
        //     idAirplane: 2,
        //     destination: 1,
        //     departureDate: "2022-09-16",
        //     arrivalDate: "2022-10-16",
        //     from: 2,
        // })
        // Flights.create({ 
        //     flightNumber: 12,
        //     priceOfSeatFirstClass: 100,
        //     priceOfSeatSecondClass: 50,
        //     idAirplane: 2,
        //     destination: 1,
        //     departureDate: "2022-09-19",
        //     arrivalDate: "2022-10-19",
        //     from: 2,
        // })
        // Flights.create({ 
        //     flightNumber: 13,
        //     priceOfSeatFirstClass: 100,
        //     priceOfSeatSecondClass: 50,
        //     idAirplane: 2,
        //     destination: 1,
        //     departureDate: "2022-09-24",
        //     arrivalDate: "2022-10-24",
        //     from: 2,
        // })

        // Flights.create({ 
        //     flightNumber: 14,
        //     priceOfSeatFirstClass: 100,
        //     priceOfSeatSecondClass: 50,
        //     idAirplane: 3,
        //     destination: 15,
        //     departureDate: "2022-09-26",
        //     arrivalDate: "2022-10-26",
        //     from: 20,
        // })
        // Flights.create({ 
        //     flightNumber: 15,
        //     priceOfSeatFirstClass: 100,
        //     priceOfSeatSecondClass: 50,
        //     idAirplane: 4,
        //     destination: 15,
        //     departureDate: "2022-09-18",
        //     arrivalDate: "2022-10-18",
        //     from: 20,
        // })
        // Flights.create({ 
        //     flightNumber: 16,
        //     priceOfSeatFirstClass: 100,
        //     priceOfSeatSecondClass: 50,
        //     idAirplane: 5,
        //     destination: 15,
        //     departureDate: "2022-08-31",
        //     arrivalDate: "2022-09-01",
        //     from: 20,
        // })
        // Flights.create({ 
        //     flightNumber: 17,
        //     priceOfSeatFirstClass: 100,
        //     priceOfSeatSecondClass: 50,
        //     idAirplane: 5,
        //     destination: 15,
        //     departureDate: "2022-09-02",
        //     arrivalDate: "2022-09-02",
        //     from: 20,
        // })
        // Flights.create({ 
        //     flightNumber: 18,
        //     priceOfSeatFirstClass: 100,
        //     priceOfSeatSecondClass: 50,
        //     idAirplane: 6,
        //     destination: 15,
        //     departureDate: "2022-09-02",
        //     arrivalDate: "2022-09-02",
        //     from: 20,
        // })

        // Bookings.create({ 
        //     numberBooking: 1,
        //     seatNumber: 18,
        //     classTravel: "first",
        //     idUser: 7,
        //     idFlight: 1,
        // })
        // Bookings.create({ 
        //     numberBooking: 2,
        //     seatNumber: 32,
        //     classTravel: "second",
        //     idUser: 8,
        //     idFlight: 2,
        // })
        // Bookings.create({ 
        //     numberBooking: 3,
        //     seatNumber: 45,
        //     classTravel: "second",
        //     idUser: 9,
        //     idFlight: 1,
        // })
    })
}

export { initDb, Users, Bookings, Airplanes, Flights, Cities };