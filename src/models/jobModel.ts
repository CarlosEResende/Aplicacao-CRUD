import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../shared/connection";
import { Contract } from "./contractModel";


interface JobAttributes {
    id: number;
    contractId: number;
    operationDate: Date;
    paymentDate: Date;
    price: number;
    paid: boolean;
}

export interface JobCreationAttributes extends Optional<JobAttributes, 'id'> {}

export class Job extends Model<JobAttributes, JobCreationAttributes> 
    implements JobAttributes {
    public id!: number;
    public contractId!: number; 
    public operationDate!: Date;
    public paymentDate!: Date;
    public price!: number;
    public paid!: boolean;
}

Job.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        contractId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        operationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        paymentDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        paid:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
        
    },
    {
        sequelize,
        modelName: "Job",
        tableName: "jobs",
        timestamps: false,
    },
);

Job.belongsTo(Contract, {
    foreignKey: "contractId",  
    targetKey: "id",  
});




