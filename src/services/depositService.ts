import { DepositRepository } from "../repositorys/depositRepository";
import { DepositAttributes } from "../models/depositModel";

export class DepositService {
    private depositRepository = new DepositRepository();

    public async createDeposit(profileId: number, depositValue: number, operationDate: Date): Promise<DepositAttributes> {
        try {
            const deposit = await this.depositRepository.createDeposit({ profileId, depositValue, operationDate });
            return deposit;
        } catch (error) {
            throw new Error(`Unable to create deposit: ${(error as Error).message}`);
        }
    }

    public async getDeposits(): Promise<DepositAttributes[]> {
        try {
            const deposits = await this.depositRepository.findAll();
            return deposits;
        } catch (error) {
            throw new Error("Error fetching deposits");
        }
    }

    public async getDepositById(id: number): Promise<DepositAttributes | null> {
        try {
            const deposit = await this.depositRepository.findById(id);
            return deposit;
        } catch (error) {
            throw new Error("Error fetching deposit by ID");
        }
    }

    public async updateDeposit(id: number, depositValue: number, operationDate: Date): Promise<DepositAttributes | null> {
        try {
            const updatedDeposit = await this.depositRepository.updateDeposit(id, { depositValue, operationDate });
            return updatedDeposit;
        } catch (error) {
            throw new Error("Error updating deposit");
        }
    }

    public async deleteDeposit(id: number): Promise<boolean> {
        try {
            const result = await this.depositRepository.deleteDeposit(id);
            return result;
        } catch (error) {
            throw new Error("Error deleting deposit");
        }
    }
}
