"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositController = void 0;
const depositService_1 = require("../services/depositService");
class DepositController {
    constructor() {
        this.depositService = new depositService_1.DepositService();
    }
    async createDeposit(req, res) {
        const { profileId, depositValue, operationDate } = req.body;
        try {
            const deposit = await this.depositService.createDeposit(profileId, depositValue, operationDate);
            return res.status(201).json(deposit);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to create deposit" });
        }
    }
    async getDeposits(req, res) {
        try {
            const deposits = await this.depositService.getDeposits();
            return res.status(200).json(deposits);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch deposits" });
        }
    }
    async getDepositById(req, res) {
        const { id } = req.params;
        try {
            const deposit = await this.depositService.getDepositById(Number(id));
            if (deposit) {
                return res.status(200).json(deposit);
            }
            else {
                return res.status(404).json({ message: "Deposit not found" });
            }
        }
        catch (error) {
            return res.status(500).json({ message: "Failed to fetch deposit" });
        }
    }
    async updateDeposit(req, res) {
        const { id } = req.params;
        const { depositValue, operationDate } = req.body;
        try {
            const updatedDeposit = await this.depositService.updateDeposit(Number(id), depositValue, operationDate);
            if (updatedDeposit) {
                return res.status(200).json(updatedDeposit);
            }
            else {
                return res.status(404).json({ message: "Deposit not found" });
            }
        }
        catch (error) {
            return res.status(500).json({ message: "Failed to update deposit" });
        }
    }
    async deleteDeposit(req, res) {
        const { id } = req.params;
        try {
            const result = await this.depositService.deleteDeposit(Number(id));
            if (result) {
                return res.status(200).json({ message: "Deposit deleted successfully" });
            }
            else {
                return res.status(404).json({ message: "Deposit not found" });
            }
        }
        catch (error) {
            return res.status(500).json({ message: "Failed to delete deposit" });
        }
    }
}
exports.DepositController = DepositController;
