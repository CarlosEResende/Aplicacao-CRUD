import { Request, Response } from "express";
import { JobService } from "../services/jobService";

export class JobController {
    private jobService = new JobService();

    public async createJob(req: Request, res: Response): Promise<Response> {
        const { contractId, operationDate, paymentDate, price, paid } = req.body;
        try {
            const job = await this.jobService.createJob(contractId, operationDate, paymentDate, price, paid);
            return res.status(201).json(job);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to create job" });
        }
    }

    public async getJobsByContractId(req: Request, res: Response): Promise<Response> {
        const { contractId } = req.params;
        try {
            const jobs = await this.jobService.getJobsByContractId(Number(contractId));
            return res.status(200).json(jobs);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch jobs" });
        }
    }

    public async updateJob(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const data = req.body;
        try {
            const updatedJob = await this.jobService.updateJob(Number(id), data);
            return res.status(200).json(updatedJob);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to update job" });
        }
    }

    public async deleteJob(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            await this.jobService.deleteJob(Number(id));
            return res.status(200).json({ message: "Job deleted successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to delete job" });
        }
    }

    public async listarJobsNaoPagosPorContrato(req: Request, res: Response): Promise<void> {
        const contractId = parseInt(req.params.contractId);

        if (isNaN(contractId)) {
            res.status(400).json({ message: 'O ID do contrato deve ser um número válido.' });
            return;
        }

        try {
            const jobsNaoPagos = await this.jobService.listarJobsNaoPagosPorContrato(contractId);
            res.status(200).json(jobsNaoPagos);
        } catch (error) {
            console.error('Erro ao listar Jobs não pagos no controlador:', error);
            res.status(500).json({ message: 'Erro ao listar Jobs não pagos.' });
        }
    }

    
}
