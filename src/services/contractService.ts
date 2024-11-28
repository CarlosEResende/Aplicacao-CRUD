import { ContractRepository } from "../repositorys/contractRepository";
import { Contract, ContractCreationAttributes } from "../models/contractModel";

export class ContractService {
    private contractRepository: ContractRepository;

    constructor() {
        this.contractRepository = new ContractRepository();
    }

    public async createContract(
        profileId: number, 
        terms: string, 
        operationDate: Date, 
        status: string
    ): Promise<Contract> {
        try {
            const contract = await this.contractRepository.createContract({ profileId, terms, operationDate, status });
            return contract;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to create contract: ${error.message}`);
            } else {
                throw new Error("An unknown error occurred.");
            }
        }
    }

    public async getContracts(): Promise<Contract[]> {
        try {
            return await this.contractRepository.getContracts();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to fetch contracts: ${error.message}`);
            } else {
                throw new Error("An unknown error occurred.");
            }
        }
    }

    public async getContractById(id: number): Promise<Contract | null> {
        try {
            return await this.contractRepository.getContractById(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to fetch contract: ${error.message}`);
            } else {
                throw new Error("An unknown error occurred.");
            }
        }
    }

    public async updateContract(
        id: number, 
        data: Partial<ContractCreationAttributes>
    ): Promise<Contract | null> {
        try {
            return await this.contractRepository.updateContract(id, data);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to update contract: ${error.message}`);
            } else {
                throw new Error("An unknown error occurred.");
            }
        }
    }

    public async deleteContract(id: number): Promise<boolean> {
        try {
            return await this.contractRepository.deleteContract(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to delete contract: ${error.message}`);
            } else {
                throw new Error("An unknown error occurred.");
            }
        }
    }

    public async getContractsByProfileId(profileId: number): Promise<Contract[]> {
        try {
            return await this.contractRepository.getContractsByProfileId(profileId);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to fetch contracts by profileId: ${error.message}`);
            } else {
                throw new Error("An unknown error occurred.");
            }
        }
    }
}
