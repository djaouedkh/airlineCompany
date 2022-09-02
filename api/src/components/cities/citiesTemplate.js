export default (sequelize, DataTypes) => {

    return sequelize.define('cities', {
        idCity: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     notEmpty: {msg: 'Le nom de la ville doit etre remplis'},
            //     notNull: {msg: 'Le nom dela ville est une propriété requise'}
            // }
        },
        postalCode: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // unique: {
            //     name: 'flightNumber',
            //     args: true,
            //     msg: 'Numéro de vol déja pris.',
            //     fields: ['flightNumber']
            // },
            // validate: {
            //     isInt: {msg: 'Utilisez des nombres entiers.'},
            //     min: {
            //         args: [0],
            //         msg: 'Le numéro d\'avion doit etre superieur ou égale à 0.'
            //     }
            // }
        },
    },
    {
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true
    })
}