const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Users = db.define('Users', {
    name:{
        type: DataTypes.STRING,
        required: true
    },
    age:{
        type:DataTypes.STRING,
        allowNull: false
    },
    occupation:{
        type: DataTypes.STRING,
        required: true
    }
})

module.exports = Users