import { Request, Response } from "express";
import { ContractService } from "../services/contractService";

export class ContractController {
    private contractService: ContractService;

    constructor() {
        this.contractService = new ContractService();
    }

    public async createContract(req: Request, res: Response): Promise<Response> {
        const { profileId, terms, operationDate, status } = req.body;
        try {
            const contract = await this.contractService.createContract(profileId, terms, operationDate, status);
            return res.status(201).json(contract);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to create contract" });
        }
    }

    public async getContracts(req: Request, res: Response): Promise<Response> {
        try {
            const contracts = await this.contractService.getContracts();
            return res.status(200).json(contracts);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch contracts" });
        }
    }

    public async getContractById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const contract = await this.contractService.getContractById(Number(id));
            if (contract) {
                return res.status(200).json(contract);
            } else {
                return res.status(404).json({ message: "Contract not found" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch contract" });
        }
    }

    public async updateContract(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const data = req.body;
        try {
            const updatedContract = await this.contractService.updateContract(Number(id), data);
            if (updatedContract) {
                return res.status(200).json(updatedContract);
            } else {
                return res.status(404).json({ message: "Contract not found" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to update contract" });
        }
    }

    public async deleteContract(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const deleted = await this.contractService.deleteContract(Number(id));
            if (deleted) {
                return res.status(204).send();
            } else {
                return res.status(404).json({ message: "Contract not found" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to delete contract" });
        }
    }

    public async getContractsByProfileId(req: Request, res: Response): Promise<Response> {
        const { profileId } = req.params;
        try {
            const contracts = await this.contractService.getContractsByProfileId(Number(profileId));
            return res.status(200).json(contracts);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch contracts by profileId" });
        }
    }
}
