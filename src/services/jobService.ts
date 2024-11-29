import { JobRepository } from "../repositorys/jobRepository";
import { Job, JobCreationAttributes } from "../models/jobModel";

export class JobService {
    private jobRepository = new JobRepository();

    public async createJob(contractId: number, operationDate: Date, paymentDate: Date, price: number, paid: boolean): Promise<Job> {
        try {
            const job = await this.jobRepository.createJob({ contractId, operationDate, paymentDate, price, paid });
            return job;
        } catch (error) {
            throw new Error(`Unable to create job: ${(error as Error).message}`);
        }
    }

    public async getJobsByContractId(contractId: number): Promise<Job[]> {
        try {
            return await this.jobRepository.getJobsByContractId(contractId);
        } catch (error) {
            throw new Error(`Unable to fetch jobs: ${(error as Error).message}`);
        }
    }

    public async updateJob(id: number, data: Partial<JobCreationAttributes>): Promise<Job | null> {
        try {
            return await this.jobRepository.updateJob(id, data);
        } catch (error) {
            throw new Error(`Unable to update job: ${(error as Error).message}`);
        }
    }

    public async deleteJob(id: number): Promise<void> {
        try {
            await this.jobRepository.deleteJob(id);
        } catch (error) {
            throw new Error(`Unable to delete job: ${(error as Error).message}`);
        }
    }

    public async listarJobsNaoPagosPorContrato(contractId: number): Promise<Job[]> {
        try {
            return await this.jobRepository.listarJobsNaoPagosPorContrato(contractId);
        } catch (error) {
            console.error('Erro ao listar Jobs não pagos no serviço:', error);
            throw error;
        }
    }
   
}
