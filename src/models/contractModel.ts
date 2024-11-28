import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../shared/connection";
import { Profile } from "./profileModel";


interface ContractAttributes {
    id: number;
    profileId: number; 
    terms: string;
    operationDate: Date;
    status: string;
}

export interface ContractCreationAttributes extends Optional<ContractAttributes, 'id'> {}

export class Contract extends Model<ContractAttributes, ContractCreationAttributes> 
    implements ContractAttributes {
    public id!: number;
    public profileId!: number; 
    public terms!: string;
    public operationDate!: Date;
    public status!: string;
}


Contract.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        profileId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        terms: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        operationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Contract",
        tableName: "contracts",
        timestamps: false,
    },
);

Contract.belongsTo(Profile, {
    foreignKey: "profileId",
    targetKey: "id",
});




