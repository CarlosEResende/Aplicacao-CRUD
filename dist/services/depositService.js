"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositService = void 0;
const depositRepository_1 = require("../repositorys/depositRepository");
class DepositService {
    constructor() {
        this.depositRepository = new depositRepository_1.DepositRepository();
    }
    async createDeposit(profileId, depositValue, operationDate) {
        try {
            const deposit = await this.depositRepository.createDeposit({ profileId, depositValue, operationDate });
            return deposit;
        }
        catch (error) {
            throw new Error(`Unable to create deposit: ${error.message}`);
        }
    }
    async getDeposits() {
        try {
            const deposits = await this.depositRepository.findAll();
            return deposits;
        }
        catch (error) {
            throw new Error("Error fetching deposits");
        }
    }
    async getDepositById(id) {
        try {
            const deposit = await this.depositRepository.findById(id);
            return deposit;
        }
        catch (error) {
            throw new Error("Error fetching deposit by ID");
        }
    }
    async updateDeposit(id, depositValue, operationDate) {
        try {
            const updatedDeposit = await this.depositRepository.updateDeposit(id, { depositValue, operationDate });
            return updatedDeposit;
        }
        catch (error) {
            throw new Error("Error updating deposit");
        }
    }
    async deleteDeposit(id) {
        try {
            const result = await this.depositRepository.deleteDeposit(id);
            return result;
        }
        catch (error) {
            throw new Error("Error deleting deposit");
        }
    }
}
exports.DepositService = DepositService;
