"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const paymentService_1 = require("../services/paymentService");
class PaymentController {
    constructor() {
        this.paymentService = new paymentService_1.PaymentService();
    }
    async createPayment(req, res) {
        const { jobId, paymentValue, operationDate } = req.body;
        try {
            const payment = await this.paymentService.createPayment(jobId, paymentValue, operationDate);
            return res.status(201).json(payment);
        }
        catch (error) {
            return res.status(500).json({ message: "Failed to create payment", error });
        }
    }
    async getAllPayments(req, res) {
        try {
            const payments = await this.paymentService.getAllPayments();
            return res.status(200).json(payments);
        }
        catch (error) {
            return res.status(500).json({ message: "Failed to fetch payments", error });
        }
    }
    async getPaymentById(req, res) {
        const { id } = req.params;
        try {
            const payment = await this.paymentService.getPaymentById(Number(id));
            if (!payment) {
                return res.status(404).json({ message: "Payment not found" });
            }
            return res.status(200).json(payment);
        }
        catch (error) {
            return res.status(500).json({ message: "Failed to fetch payment", error });
        }
    }
    async updatePayment(req, res) {
        const { id } = req.params;
        const { jobId, paymentValue, operationDate } = req.body;
        try {
            const updatedPayment = await this.paymentService.updatePayment(Number(id), { jobId, paymentValue, operationDate });
            if (!updatedPayment) {
                return res.status(404).json({ message: "Payment not found" });
            }
            return res.status(200).json(updatedPayment);
        }
        catch (error) {
            return res.status(500).json({ message: "Failed to update payment", error });
        }
    }
    async deletePayment(req, res) {
        const { id } = req.params;
        try {
            const success = await this.paymentService.deletePayment(Number(id));
            if (!success) {
                return res.status(404).json({ message: "Payment not found" });
            }
            return res.status(204).send();
        }
        catch (error) {
            return res.status(500).json({ message: "Failed to delete payment", error });
        }
    }
    async getPaymentsByJob(req, res) {
        const { jobId } = req.params;
        try {
            const payments = await this.paymentService.getPaymentsByJob(Number(jobId));
            return res.status(200).json(payments);
        }
        catch (error) {
            return res.status(500).json({ message: "Failed to fetch payments for job", error });
        }
    }
}
exports.PaymentController = PaymentController;
