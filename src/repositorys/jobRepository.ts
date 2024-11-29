import { Job, JobCreationAttributes } from "../models/jobModel";

export class JobRepository {

    public async createJob(data: JobCreationAttributes): Promise<Job> {
        try {
            return await Job.create(data);
        } catch (error) {
            throw new Error(`Unable to create job: ${(error as Error).message}`);
        }
    }

    public async getJobsByContractId(contractId: number): Promise<Job[]> {
        try {
            return await Job.findAll({ where: { contractId } });
        } catch (error) {
            throw new Error(`Unable to fetch jobs: ${(error as Error).message}`);
        }
    }

    public async updateJob(id: number, data: Partial<JobCreationAttributes>): Promise<Job | null> {
        try {
            const job = await Job.findByPk(id);
            if (!job) {
                throw new Error("Job not found");
            }
            return await job.update(data);
        } catch (error) {
            throw new Error(`Unable to update job: ${(error as Error).message}`);
        }
    }

    public async deleteJob(id: number): Promise<void> {
        try {
            const job = await Job.findByPk(id);
            if (!job) {
                throw new Error("Job not found");
            }
            await job.destroy();
        } catch (error) {
            throw new Error(`Unable to delete job: ${(error as Error).message}`);
        }
    }

   public async listarJobsNaoPagosPorContrato(contractId: number): Promise<Job[]> {
    try {
        return await Job.findAll({
            where: {
                contractId: contractId,
                paid: false
            }
        });
    } catch (error) {
        console.error('Erro ao listar Jobs não pagos no repositório:', error);
        throw error;
    }
}

}
