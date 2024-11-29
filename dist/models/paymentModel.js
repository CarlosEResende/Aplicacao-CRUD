"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../shared/connection"));
const jobModel_1 = require("./jobModel");
class Payment extends sequelize_1.Model {
}
exports.Payment = Payment;
Payment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    jobId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    operationDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    paymentValue: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    }
}, {
    sequelize: connection_1.default,
    modelName: "Payment",
    tableName: "payments",
    timestamps: false,
});
Payment.belongsTo(jobModel_1.Job, {
    foreignKey: "jobId",
    targetKey: "id",
});
