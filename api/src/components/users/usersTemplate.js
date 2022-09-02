import bcrypt from 'bcrypt' 
import uuidAPIKey from 'uuid-apikey';

export default (sequelize, DataTypes) => {

    return sequelize.define('users', {
        idUser: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: {
                name: 'username',
                args: true,
                msg: 'Identifiant déja pris.',
                fields: ['username']
            },
            allowNull: false,
            validate: {
                notEmpty: {msg: 'L\'identifiant doit etre remplis'},
                notNull: {msg: 'L\'identifiant est une propriété requise'},
                isUsernameValid(value){
                    if (value.length < 4) {
                        throw new Error('L\'identifiant doit contenir au moins 4 chiffres')
                    }
                }
            }
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'le nom doit etre remplis'},
                notNull: {msg: 'Le nom est une propriété requise'}
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'le Prenom doit etre remplis'},
                notNull: {msg: 'Le Prenom est une propriété requise'}
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'Utilisez des nombres entiers.'},
                min: {
                    args: [0],
                    msg: 'L\'age doit etre superieur ou égale à 0.'
                }
            }
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'L\'adresse doit etre remplis'},
                notNull: {msg: 'L\'adresse est une propriété requise'}
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'Le mot de passe doit etre remplis'},
                notNull: {msg: 'Le mot de passe est une propriété requise'},
            },
            set(password){
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);
                toString(this.setDataValue('password', hash))
            }
        },
        uuid: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'uuid doit etre remplis'},
                notNull: {msg: 'uuid est une propriété requise'},
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