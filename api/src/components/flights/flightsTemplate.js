export default (sequelize, DataTypes) => {

    return sequelize.define('flights', {
        idFlight: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        flightNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: {
                name: 'flightNumber',
                args: true,
                msg: 'Numéro de vol déja pris.',
                fields: ['flightNumber']
            },
            validate: {
                isInt: {msg: 'Utilisez des nombres entiers.'},
                min: {
                    args: [0],
                    msg: 'Le numéro d\'avion doit etre superieur ou égale à 0.'
                }
            }
        },
        // from: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     validate: {
        //         notEmpty: {msg: 'Le départ doit etre remplis'},
        //         notNull: {msg: 'Le départ est une propriété requise'}
        //     }
        // },
        // destination: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     validate: {
        //         notEmpty: {msg: 'La destination doit etre remplis'},
        //         notNull: {msg: 'La destination est une propriété requise'}
        //     }
        // },
        departureDate: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            // allowNull: false,
            validate: {
                notEmpty: {msg: 'La date de départ doit etre remplis.'},
                // notNull: {msg: 'la date d\'entrée dans l\'inventaire est une propriété requise.'},
                isDate: {msg: 'La date de départ doit être une date.'}
            }
        },
        departureTime: {
            type: DataTypes.TIME,
            defaultValue: DataTypes.NOW,
            // allowNull: false,
            validate: {
                notEmpty: {msg: 'L\'heure de départ doit etre remplis.'},
                // notNull: {msg: 'la date d\'entrée dans l\'inventaire est une propriété requise.'},
                isDate: {msg: 'L\'heure de départ doit être une date.'}
            }
        },
        arrivalDate: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            // allowNull: false,
            validate: {
                notEmpty: {msg: 'La date de d\'arrivée doit etre remplis.'},
                // notNull: {msg: 'la date d\'entrée dans l\'inventaire est une propriété requise.'},
                isDate: {msg: 'La date de d\'arrivée doit être une date.'}
            }
        },
        arrivalTime: {
            type: DataTypes.TIME,
            defaultValue: DataTypes.NOW,
            // allowNull: false,
            validate: {
                notEmpty: {msg: 'L\'heure de d\'arrivée doit etre remplis.'},
                // notNull: {msg: 'la date d\'entrée dans l\'inventaire est une propriété requise.'},
                isDate: {msg: 'L\'heure de d\'arrivée doit être une date.'}
            }
        },
        // duration: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     validate: {
        //         notEmpty: {msg: 'La durée doit etre remplis'},
        //         notNull: {msg: 'La durée est une propriété requise'}
        //     }
        // },
        priceOfSeatFirstClass: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: {
                    args: [0],
                    msg: 'Le prix doit être supérieur ou égale à 0'
                }
            },
        },
        priceOfSeatSecondClass: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: {
                    args: [0],
                    msg: 'Le prix doit être supérieur ou égale à 0'
                }
            },
        },
    },
    {
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true
    })
}