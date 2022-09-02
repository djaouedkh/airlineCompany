export default (Users, Bookings, Airplanes, Flights, Cities) => {

    // bookings - users
    Users.hasMany(Bookings, { foreignKey: { name: "idUser", allowNull: false}, as: "user_of_booking", })
    Bookings.belongsTo(Users, { foreignKey: { name: "idUser", allowNull: false}, as: "user_of_booking", });
    // bookings - flights
    Flights.hasMany(Bookings, { foreignKey: { name: "idFlight", allowNull: false}, as: "flight_of_booking", })
    Bookings.belongsTo(Flights, { foreignKey: { name: "idFlight", allowNull: false}, as: "flight_of_booking", });

    
    // flights - cities (from)
    Cities.hasMany(Flights, { foreignKey: { name: "from", allowNull: false}, as: "cityFrom_of_booking", })
    Flights.belongsTo(Cities, { foreignKey: { name: "from", allowNull: false}, as: "cityFrom_of_booking", });
    // flights - cities (destination)
    Cities.hasMany(Flights, { foreignKey: { name: "destination", allowNull: false}, as: "cityDestination_of_booking", })
    Flights.belongsTo(Cities, { foreignKey: { name: "destination", allowNull: false}, as: "cityDestination_of_booking", });
    // flights - airplanes
    Airplanes.hasMany(Flights, { foreignKey: { name: "idAirplane", allowNull: false}, as: "airplane_of_flight", })
    Flights.belongsTo(Airplanes, { foreignKey: { name: "idAirplane", allowNull: false}, as: "airplane_of_flight", });

}