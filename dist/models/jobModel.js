"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../shared/connection"));
const contractModel_1 = require("./contractModel");
class Job extends sequelize_1.Model {
}
exports.Job = Job;
Job.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    contractId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    operationDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    paymentDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    paid: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    sequelize: connection_1.default,
    modelName: "Job",
    tableName: "jobs",
    timestamps: false,
});
Job.belongsTo(contractModel_1.Contract, {
    foreignKey: "contractId",
    targetKey: "id",
});
