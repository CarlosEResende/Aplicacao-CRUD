import { Model, DataTypes } from "sequelize";
import sequelize from "../shared/connection";
import { Profile } from "./profileModel";

export interface DepositAttributes {
    profileId: number;
    depositValue: number;
    operationDate: Date;
}

export class Deposit extends Model<DepositAttributes> implements DepositAttributes {
    public profileId!: number;
    public depositValue!: number;
    public operationDate!: Date;
}

Deposit.init(
    {
        profileId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        depositValue: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        operationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Deposit",
    }
);

Deposit.belongsTo(Profile, {
    foreignKey: "profileId",
    targetKey: "id",
});
