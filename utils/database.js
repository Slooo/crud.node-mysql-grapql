const Sequelize = require('sequelize')

const DB_NAME = 'todo'
const USER_NAME = 'root'
const PASSWORD = 'asd'

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3307
})

module.exports = sequelize
