export default (sequelize, DataTypes) => {

    return sequelize.define('airplanes', {
        idAirplane: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        airplaneNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: {
                name: 'airplaneNumber',
                args: true,
                msg: 'Numéro d\'avion déja pris.',
                fields: ['airplaneNumber']
            },
            validate: {
                isInt: {msg: 'Utilisez des nombres entiers.'},
                min: {
                    args: [0],
                    msg: 'Le numéro d\'avion doit etre superieur ou égale à 0.'
                }
            }
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'La marque doit etre remplis'},
                notNull: {msg: 'La marque est une propriété requise'}
            }
        },
        numberOfSeatsFirstClass: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'Utilisez des nombres entiers.'},
                min: {
                    args: [0],
                    msg: 'Le nombre de siège doit etre superieur ou égale à 0.'
                }
            }
        },
        numberOfSeatsSecondClass: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'Utilisez des nombres entiers.'},
                min: {
                    args: [0],
                    msg: 'Le nombre de siège doit etre superieur ou égale à 0.'
                }
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