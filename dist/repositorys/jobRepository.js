"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRepository = void 0;
const jobModel_1 = require("../models/jobModel");
class JobRepository {
    async createJob(data) {
        try {
            return await jobModel_1.Job.create(data);
        }
        catch (error) {
            throw new Error(`Unable to create job: ${error.message}`);
        }
    }
    async getJobsByContractId(contractId) {
        try {
            return await jobModel_1.Job.findAll({ where: { contractId } });
        }
        catch (error) {
            throw new Error(`Unable to fetch jobs: ${error.message}`);
        }
    }
    async updateJob(id, data) {
        try {
            const job = await jobModel_1.Job.findByPk(id);
            if (!job) {
                throw new Error("Job not found");
            }
            return await job.update(data);
        }
        catch (error) {
            throw new Error(`Unable to update job: ${error.message}`);
        }
    }
    async deleteJob(id) {
        try {
            const job = await jobModel_1.Job.findByPk(id);
            if (!job) {
                throw new Error("Job not found");
            }
            await job.destroy();
        }
        catch (error) {
            throw new Error(`Unable to delete job: ${error.message}`);
        }
    }
    async listarJobsNaoPagosPorContrato(contractId) {
        try {
            return await jobModel_1.Job.findAll({
                where: {
                    contractId: contractId,
                    paid: false
                }
            });
        }
        catch (error) {
            console.error('Erro ao listar Jobs não pagos no repositório:', error);
            throw error;
        }
    }
}
exports.JobRepository = JobRepository;
