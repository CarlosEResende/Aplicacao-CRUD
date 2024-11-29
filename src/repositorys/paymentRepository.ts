import { Payment, PaymentCreationAttributes } from "../models/paymentModel";

export class PaymentRepository {

    public async createPayment(data: PaymentCreationAttributes): Promise<Payment> {
        try {
            return await Payment.create(data);
        } catch (error) {
            throw new Error(`Unable to create payment: ${(error as Error).message}`);
        }
    }

    public async findAllPayment(): Promise<Payment[]> {
        try {
            return await Payment.findAll();
        } catch (error) {
            throw new Error(`Unable to fetch payments: ${(error as Error).message}`);
        }
    }

    public async findById(id: number): Promise<Payment | null> {
        try {
            return await Payment.findByPk(id);
        } catch (error) {
            throw new Error(`Unable to fetch payments with ID: ${(error as Error).message}`);
        }
    }

    public async findByJobId(jobId: number): Promise<Payment[]> {
        try {
            return await Payment.findAll({ where: { jobId } });
        } catch (error) {
            throw new Error(`Unable to fetch payments for job ID ${jobId}: ${(error as Error).message}`);
        }
    }
    

    public async updatePayment(id: number, data: Partial<PaymentCreationAttributes>): Promise<Payment | null> {
        const payment = await this.findById(id);
        if (payment) {
            return await payment.update(data);
        }
        return null;
    }

    public async deletePayment(id: number): Promise<boolean> {
        const payment = await this.findById(id);
        if (payment) {
            await payment.destroy();
            return true;
        }
        return false;
    }
}
