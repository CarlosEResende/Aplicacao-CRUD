"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractRepository = void 0;
const contractModel_1 = require("../models/contractModel");
class ContractRepository {
    async createContract(data) {
        try {
            return await contractModel_1.Contract.create(data);
        }
        catch (error) {
            throw new Error(`Unable to create contract: ${error.message}`);
        }
    }
    async getContracts() {
        try {
            return await contractModel_1.Contract.findAll();
        }
        catch (error) {
            throw new Error(`Unable to fetch contracts: ${error.message}`);
        }
    }
    async getContractById(id) {
        try {
            return await contractModel_1.Contract.findByPk(id);
        }
        catch (error) {
            throw new Error(`Unable to fetch contract: ${error.message}`);
        }
    }
    async updateContract(id, data) {
        try {
            const contract = await contractModel_1.Contract.findByPk(id);
            if (contract) {
                return await contract.update(data);
            }
            return null;
        }
        catch (error) {
            throw new Error(`Unable to update contract: ${error.message}`);
        }
    }
    async deleteContract(id) {
        try {
            const contract = await contractModel_1.Contract.findByPk(id);
            if (contract) {
                await contract.destroy();
                return true;
            }
            return false;
        }
        catch (error) {
            throw new Error(`Unable to delete contract: ${error.message}`);
        }
    }
    async getContractsByProfileId(profileId) {
        try {
            return await contractModel_1.Contract.findAll({ where: { profileId } });
        }
        catch (error) {
            throw new Error(`Unable to fetch contracts by profileId: ${error.message}`);
        }
    }
}
exports.ContractRepository = ContractRepository;
