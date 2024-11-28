"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractService = void 0;
const contractRepository_1 = require("../repositorys/contractRepository");
class ContractService {
    constructor() {
        this.contractRepository = new contractRepository_1.ContractRepository();
    }
    async createContract(profileId, terms, operationDate, status) {
        try {
            const contract = await this.contractRepository.createContract({ profileId, terms, operationDate, status });
            return contract;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to create contract: ${error.message}`);
            }
            else {
                throw new Error("An unknown error occurred.");
            }
        }
    }
    async getContracts() {
        try {
            return await this.contractRepository.getContracts();
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to fetch contracts: ${error.message}`);
            }
            else {
                throw new Error("An unknown error occurred.");
            }
        }
    }
    async getContractById(id) {
        try {
            return await this.contractRepository.getContractById(id);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to fetch contract: ${error.message}`);
            }
            else {
                throw new Error("An unknown error occurred.");
            }
        }
    }
    async updateContract(id, data) {
        try {
            return await this.contractRepository.updateContract(id, data);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to update contract: ${error.message}`);
            }
            else {
                throw new Error("An unknown error occurred.");
            }
        }
    }
    async deleteContract(id) {
        try {
            return await this.contractRepository.deleteContract(id);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to delete contract: ${error.message}`);
            }
            else {
                throw new Error("An unknown error occurred.");
            }
        }
    }
    async getContractsByProfileId(profileId) {
        try {
            return await this.contractRepository.getContractsByProfileId(profileId);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to fetch contracts by profileId: ${error.message}`);
            }
            else {
                throw new Error("An unknown error occurred.");
            }
        }
    }
}
exports.ContractService = ContractService;
