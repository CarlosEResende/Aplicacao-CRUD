"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRepository = void 0;
const paymentModel_1 = require("../models/paymentModel");
class PaymentRepository {
    async createPayment(data) {
        try {
            return await paymentModel_1.Payment.create(data);
        }
        catch (error) {
            throw new Error(`Unable to create payment: ${error.message}`);
        }
    }
    async findAllPayment() {
        try {
            return await paymentModel_1.Payment.findAll();
        }
        catch (error) {
            throw new Error(`Unable to fetch payments: ${error.message}`);
        }
    }
    async findById(id) {
        try {
            return await paymentModel_1.Payment.findByPk(id);
        }
        catch (error) {
            throw new Error(`Unable to fetch payments with ID: ${error.message}`);
        }
    }
    async findByJobId(jobId) {
        try {
            return await paymentModel_1.Payment.findAll({ where: { jobId } });
        }
        catch (error) {
            throw new Error(`Unable to fetch payments for job ID ${jobId}: ${error.message}`);
        }
    }
    async updatePayment(id, data) {
        const payment = await this.findById(id);
        if (payment) {
            return await payment.update(data);
        }
        return null;
    }
    async deletePayment(id) {
        const payment = await this.findById(id);
        if (payment) {
            await payment.destroy();
            return true;
        }
        return false;
    }
}
exports.PaymentRepository = PaymentRepository;
