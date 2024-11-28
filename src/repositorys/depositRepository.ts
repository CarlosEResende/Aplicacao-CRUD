import { Sequelize } from "sequelize";
import { Deposit } from "../models/depositModel";
import { Profile } from "../models/profileModel";

export class DepositRepository {
    public async createDeposit(data: { profileId: number; depositValue: number; operationDate: Date }): Promise<Deposit> {
        try {

            const deposit = await Deposit.create(data);

            await Profile.update(
                { balance: Sequelize.literal(`balance + ${data.depositValue}`) },
                { where: { id: data.profileId } }
            );

            return deposit;
        } catch (error) {
            throw new Error(`Unable to create deposit: ${(error as Error).message}`);
        }
    }

    public async findAll(): Promise<Deposit[]> {
        try {
            return await Deposit.findAll();
        } catch (error) {
            throw new Error(`Unable to fetch deposits: ${(error as Error).message}`);
        }
    }

    public async findById(id: number): Promise<Deposit | null> {
        try {
            return await Deposit.findByPk(id);
        } catch (error) {
            throw new Error(`Unable to fetch deposit with ID ${id}: ${(error as Error).message}`);
        }
    }

    public async updateDeposit(id: number, data: { depositValue: number; operationDate: Date }): Promise<Deposit | null> {
        try {
            const deposit = await this.findById(id); 
            if (!deposit) {
                throw new Error("Deposit not found");
            }

            const previousDepositValue = deposit.depositValue; 
            const valueDifference = data.depositValue - previousDepositValue; 

            if (valueDifference !== 0) {

                await Profile.update(
                    { balance: Sequelize.literal(`balance + ${valueDifference}`) },
                    { where: { id: deposit.profileId } }
                );
            }

            return await deposit.update(data);
        } catch (error) {
            throw new Error(`Unable to update deposit with ID ${id}: ${(error as Error).message}`);
        }
    }


    public async deleteDeposit(id: number): Promise<boolean> {
        try {
            const deposit = await this.findById(id);
            if (deposit) {

                await Profile.update(
                    { balance: Sequelize.literal(`balance - ${deposit.depositValue}`) },
                    { where: { id: deposit.profileId } }
                );
                await deposit.destroy();
                return true;
            }
            return false;
        } catch (error) {
            throw new Error(`Unable to delete deposit with ID ${id}: ${(error as Error).message}`);
        }
    }
}
