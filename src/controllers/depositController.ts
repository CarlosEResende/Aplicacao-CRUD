import { Request, Response } from "express";
import { DepositService } from "../services/depositService";

export class DepositController {
    private depositService = new DepositService();

    public async createDeposit(req: Request, res: Response): Promise<Response> {
        const { profileId, depositValue, operationDate } = req.body;
        try {
            const deposit = await this.depositService.createDeposit(profileId, depositValue, operationDate);
            return res.status(201).json(deposit);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to create deposit" });
        }
    }

    public async getDeposits(req: Request, res: Response): Promise<Response> {
        try {
            const deposits = await this.depositService.getDeposits();
            return res.status(200).json(deposits);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch deposits" });
        }
    }

    public async getDepositById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const deposit = await this.depositService.getDepositById(Number(id));
            if (deposit) {
                return res.status(200).json(deposit);
            } else {
                return res.status(404).json({ message: "Deposit not found" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Failed to fetch deposit" });
        }
    }

    public async updateDeposit(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { depositValue, operationDate } = req.body;
        try {
            const updatedDeposit = await this.depositService.updateDeposit(
                Number(id),
                depositValue,
                operationDate
            );
            if (updatedDeposit) {
                return res.status(200).json(updatedDeposit);
            } else {
                return res.status(404).json({ message: "Deposit not found" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Failed to update deposit" });
        }
    }

    public async deleteDeposit(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const result = await this.depositService.deleteDeposit(Number(id));
            if (result) {
                return res.status(200).json({ message: "Deposit deleted successfully" });
            } else {
                return res.status(404).json({ message: "Deposit not found" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Failed to delete deposit" });
        }
    }
}
