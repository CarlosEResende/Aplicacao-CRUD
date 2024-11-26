"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: "mysql",
    database: "banconode",
    username: "root",
    password: "Database123c",
    host: "localhost",
    port: 3306
});
exports.default = sequelize;
