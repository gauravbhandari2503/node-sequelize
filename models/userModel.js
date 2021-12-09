const Sequelize= require('sequelize');
const validator = require('validator');
const { options } = require('../app');
const bcrypt = require('bcryptjs');

const sequelize = new Sequelize(`${process.env.SQL_DATABASE}`, `${process.env.SQL_USER}`, `${process.env.SQL_PASSWORD}`, {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamp: true
    }
});

const userSchema = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        },
    },
    contact: {
        type: Sequelize.BIGINT,
        allowNull: true,
        validate: {
            isNumeric: true,
            len: {
                args: [10,10],
                msg: "Invalid number"
            }
        }
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [8, 12],
                msg: 'Password must be atleast 8 characters and 12 character long'
            }
        }
    }
}, {
    tableName: 'users'
});

userSchema.beforeCreate(async (user, options) => {
    user.password = await bcrypt.hash(user.password, 12);
});

module.exports = userSchema;