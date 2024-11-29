"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const paymentRepository_1 = require("../repositorys/paymentRepository");
const paymentModel_1 = require("../models/paymentModel");
class PaymentService {
    constructor() {
        this.paymentRepository = new paymentRepository_1.PaymentRepository();
    }
    async createPayment(jobId, paymentValue, operationDate) {
        if (paymentValue < 0) {
            throw new Error("Payment value must be positive.");
        }
        try {
            const payment = await paymentModel_1.Payment.create({
                jobId,
                paymentValue,
                operationDate,
            });
            return payment;
        }
        catch (error) {
            throw new Error(`Unable to create payment: ${error.message}`);
        }
    }
    async getAllPayments() {
        try {
            return await paymentModel_1.Payment.findAll();
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to fetch payments: ${error.message}`);
            }
            else {
                throw new Error("An unknown error occurred.");
            }
        }
    }
    async getPaymentById(id) {
        try {
            const payment = await paymentModel_1.Payment.findByPk(id);
            if (!payment) {
                throw new Error(`Payment with ID ${id} not found.`);
            }
            return payment;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to fetch payment with ID ${id}: ${error.message}`);
            }
            else {
                throw new Error("An unknown error occurred.");
            }
        }
    }
    async updatePayment(id, data) {
        try {
            const payment = await paymentModel_1.Payment.findByPk(id);
            if (!payment) {
                return null;
            }
            await payment.update(data);
            return payment;
        }
        catch (error) {
            throw new Error(`Unable to update payment with ID ${id}: ${error.message}`);
        }
    }
    async deletePayment(id) {
        try {
            const payment = await paymentModel_1.Payment.findByPk(id);
            if (!payment) {
                return false;
            }
            await payment.destroy();
            return true;
        }
        catch (error) {
            throw new Error(`Unable to delete payment with ID ${id}: ${error.message}`);
        }
    }
    async getPaymentsByJob(jobId) {
        try {
            return await this.paymentRepository.findByJobId(jobId);
        }
        catch (error) {
            throw new Error(`Unable to fetch payments for job ID ${jobId}: ${error.message}`);
        }
    }
}
exports.PaymentService = PaymentService;
