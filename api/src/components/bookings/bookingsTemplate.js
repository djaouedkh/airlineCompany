export default (sequelize, DataTypes) => {

    return sequelize.define('bookings', {
        idBooking: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numberBooking: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: {
                name: 'numberBooking',
                args: true,
                msg: 'Numéro de réservation déja pris.',
                fields: ['numberBooking']
            },
            validate: {
                isInt: {msg: 'Utilisez des nombres entiers.'},
                min: {
                    args: [0],
                    msg: 'Le numéro de réservation doit etre superieur ou égale à 0.'
                }
            }
        },
        seatNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'Utilisez des nombres entiers.'},
                min: {
                    args: [0],
                    msg: 'Le numéro de siège doit etre superieur ou égale à 0.'
                }
            }
        },
        classTravel: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'La classe doit etre remplis'},
                notNull: {msg: 'La classe est une propriété requise'}
            }
        },
    },
    {
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true
    })
}