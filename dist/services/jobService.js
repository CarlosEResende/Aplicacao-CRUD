"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const jobRepository_1 = require("../repositorys/jobRepository");
class JobService {
    constructor() {
        this.jobRepository = new jobRepository_1.JobRepository();
    }
    async createJob(contractId, operationDate, paymentDate, price, paid) {
        try {
            const job = await this.jobRepository.createJob({ contractId, operationDate, paymentDate, price, paid });
            return job;
        }
        catch (error) {
            throw new Error(`Unable to create job: ${error.message}`);
        }
    }
    async getJobsByContractId(contractId) {
        try {
            return await this.jobRepository.getJobsByContractId(contractId);
        }
        catch (error) {
            throw new Error(`Unable to fetch jobs: ${error.message}`);
        }
    }
    async updateJob(id, data) {
        try {
            return await this.jobRepository.updateJob(id, data);
        }
        catch (error) {
            throw new Error(`Unable to update job: ${error.message}`);
        }
    }
    async deleteJob(id) {
        try {
            await this.jobRepository.deleteJob(id);
        }
        catch (error) {
            throw new Error(`Unable to delete job: ${error.message}`);
        }
    }
    async listarJobsNaoPagosPorContrato(contractId) {
        try {
            return await this.jobRepository.listarJobsNaoPagosPorContrato(contractId);
        }
        catch (error) {
            console.error('Erro ao listar Jobs não pagos no serviço:', error);
            throw error;
        }
    }
}
exports.JobService = JobService;
