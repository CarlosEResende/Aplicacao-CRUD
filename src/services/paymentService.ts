import { PaymentRepository } from '../repositorys/paymentRepository';
import { Payment, PaymentCreationAttributes } from '../models/paymentModel';

export class PaymentService {
    private paymentRepository = new PaymentRepository();

    public async createPayment(jobId: number, paymentValue: number, operationDate: Date): Promise<Payment> {
        if (paymentValue < 0) {
            throw new Error("Payment value must be positive.");
        }
    
        try {
            const payment = await Payment.create({
                jobId,
                paymentValue,
                operationDate,
            });
            return payment;
        } catch (error) {
            throw new Error(`Unable to create payment: ${(error as Error).message}`);
        }
    }
    

    public async getAllPayments(): Promise<Payment[]> {
        try {
            return await Payment.findAll();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to fetch payments: ${error.message}`);
            } else {
                throw new Error("An unknown error occurred.");
            }
        }
    }

    public async getPaymentById(id: number): Promise<Payment | null> {
        try {
            const payment = await Payment.findByPk(id);
            if (!payment) {
                throw new Error(`Payment with ID ${id} not found.`);
            }
            return payment;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to fetch payment with ID ${id}: ${error.message}`);
            } else {
                throw new Error("An unknown error occurred.");
            }
        }
    }

    public async updatePayment(id: number, data: Partial<PaymentCreationAttributes>): Promise<Payment | null> {
        try {
            const payment = await Payment.findByPk(id);
            if (!payment) {
                return null; 
            }
    
            await payment.update(data); 
            return payment; 
        } catch (error) {
            throw new Error(`Unable to update payment with ID ${id}: ${(error as Error).message}`);
        }
    }
    

    public async deletePayment(id: number): Promise<boolean> {
        try {
            const payment = await Payment.findByPk(id); 
            if (!payment) {
                return false;
            }
    
            await payment.destroy(); 
            return true; 
        } catch (error) {
            throw new Error(`Unable to delete payment with ID ${id}: ${(error as Error).message}`);
        }
    }
    
    public async getPaymentsByJob(jobId: number): Promise<Payment[]> {
        try {
            return await this.paymentRepository.findByJobId(jobId);
        } catch (error) {
            throw new Error(`Unable to fetch payments for job ID ${jobId}: ${(error as Error).message}`);
        }
    }
}
