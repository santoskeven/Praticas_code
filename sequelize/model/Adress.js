const {DataTypes} = require('sequelize')

const db = require('../db/conn')
 const Users = require('../model/Users')

const Adress = db.define('Adress', {
    street:{
        type: DataTypes.STRING,
        required: true
    },
    number:{
        type: DataTypes.STRING,
        allowNull: false
    },
    city:{
        type: DataTypes.STRING,
        allowNull: false
    }
}) 

Users.hasMany(Adress)
Adress.belongsTo(Users)

module.exports = Adress