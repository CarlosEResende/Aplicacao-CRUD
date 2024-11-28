"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractController = void 0;
const contractService_1 = require("../services/contractService");
class ContractController {
    constructor() {
        this.contractService = new contractService_1.ContractService();
    }
    async createContract(req, res) {
        const { profileId, terms, operationDate, status } = req.body;
        try {
            const contract = await this.contractService.createContract(profileId, terms, operationDate, status);
            return res.status(201).json(contract);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to create contract" });
        }
    }
    async getContracts(req, res) {
        try {
            const contracts = await this.contractService.getContracts();
            return res.status(200).json(contracts);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch contracts" });
        }
    }
    async getContractById(req, res) {
        const { id } = req.params;
        try {
            const contract = await this.contractService.getContractById(Number(id));
            if (contract) {
                return res.status(200).json(contract);
            }
            else {
                return res.status(404).json({ message: "Contract not found" });
            }
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch contract" });
        }
    }
    async updateContract(req, res) {
        const { id } = req.params;
        const data = req.body;
        try {
            const updatedContract = await this.contractService.updateContract(Number(id), data);
            if (updatedContract) {
                return res.status(200).json(updatedContract);
            }
            else {
                return res.status(404).json({ message: "Contract not found" });
            }
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to update contract" });
        }
    }
    async deleteContract(req, res) {
        const { id } = req.params;
        try {
            const deleted = await this.contractService.deleteContract(Number(id));
            if (deleted) {
                return res.status(204).send();
            }
            else {
                return res.status(404).json({ message: "Contract not found" });
            }
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to delete contract" });
        }
    }
    async getContractsByProfileId(req, res) {
        const { profileId } = req.params;
        try {
            const contracts = await this.contractService.getContractsByProfileId(Number(profileId));
            return res.status(200).json(contracts);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch contracts by profileId" });
        }
    }
}
exports.ContractController = ContractController;
