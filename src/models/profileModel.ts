import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../shared/connection"; 

export interface ProfileAttributes {
    id: number;
    firstname: string;
    lastname: string;
    profession: string;
    balance: number;
    type: string;
}

export interface ProfileCreationAttributes extends Optional<ProfileAttributes, 'id'> {}

export class Profile extends Model<ProfileAttributes, ProfileCreationAttributes> 
    implements ProfileAttributes {
    public id!: number;
    public firstname!: string;
    public lastname!: string;
    public profession!: string;
    public balance!: number;
    public type!: string;
}

Profile.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,  
            autoIncrement: true, 
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        profession: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        balance: {
            type: DataTypes.FLOAT,
            allowNull: false, 
            validate: {
                min: 0, 
            },
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
    },
    {
        sequelize, 
        modelName: "Profile", 
        tableName: "profiles", 
        timestamps: false, 
    }
);
