"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../shared/connection"));
const profileModel_1 = require("./profileModel");
class Contract extends sequelize_1.Model {
}
exports.Contract = Contract;
Contract.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    profileId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    terms: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    operationDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    modelName: "Contract",
    tableName: "contracts",
    timestamps: false,
});
Contract.belongsTo(profileModel_1.Profile, {
    foreignKey: "profileId",
    targetKey: "id",
});
