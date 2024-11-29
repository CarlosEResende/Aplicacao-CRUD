import { Request, Response } from 'express';
import { PaymentService } from '../services/paymentService';

export class PaymentController {
    private paymentService = new PaymentService();

    public async createPayment(req: Request, res: Response): Promise<Response> {
        const { jobId, paymentValue, operationDate } = req.body;

        try {
            const payment = await this.paymentService.createPayment(jobId, paymentValue, operationDate);
            return res.status(201).json(payment);
        } catch (error) {
            return res.status(500).json({ message: "Failed to create payment", error });
        }
    }

    public async getAllPayments(req: Request, res: Response): Promise<Response> {
        try {
            const payments = await this.paymentService.getAllPayments();
            return res.status(200).json(payments);
        } catch (error) {
            return res.status(500).json({ message: "Failed to fetch payments", error });
        }
    }

    public async getPaymentById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const payment = await this.paymentService.getPaymentById(Number(id));
            if (!payment) {
                return res.status(404).json({ message: "Payment not found" });
            }
            return res.status(200).json(payment);
        } catch (error) {
            return res.status(500).json({ message: "Failed to fetch payment", error });
        }
    }

    public async updatePayment(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { jobId, paymentValue, operationDate } = req.body; 

        try {
            const updatedPayment = await this.paymentService.updatePayment(Number(id), { jobId, paymentValue, operationDate });
            if (!updatedPayment) {
                return res.status(404).json({ message: "Payment not found" });
            }
            return res.status(200).json(updatedPayment);
        } catch (error) {
            return res.status(500).json({ message: "Failed to update payment", error });
        }
    }

    public async deletePayment(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const success = await this.paymentService.deletePayment(Number(id));
            if (!success) {
                return res.status(404).json({ message: "Payment not found" });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: "Failed to delete payment", error });
        }
    }

    public async getPaymentsByJob(req: Request, res: Response): Promise<Response> {
        const { jobId } = req.params;
    
        try {
            const payments = await this.paymentService.getPaymentsByJob(Number(jobId));
            return res.status(200).json(payments);
        } catch (error) {
            return res.status(500).json({ message: "Failed to fetch payments for job", error });
        }
    }
    
}
