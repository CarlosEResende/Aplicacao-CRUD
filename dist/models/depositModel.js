"use strict";
// depositModel.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deposit = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../shared/connection")); // Certifique-se de que o Sequelize esteja configurado corretamente
const profileModel_1 = require("./profileModel");
class Deposit extends sequelize_1.Model {
}
exports.Deposit = Deposit;
Deposit.init({
    profileId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    depositValue: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    operationDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    modelName: "Deposit",
});
Deposit.belongsTo(profileModel_1.Profile, {
    foreignKey: "profileId", // chave estrangeira no Deposit
    targetKey: "id", // chave primária no Profile
});
