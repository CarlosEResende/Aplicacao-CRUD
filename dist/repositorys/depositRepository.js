"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositRepository = void 0;
const sequelize_1 = require("sequelize");
const depositModel_1 = require("../models/depositModel");
const profileModel_1 = require("../models/profileModel");
class DepositRepository {
    async createDeposit(data) {
        try {
            // Cria o depósito
            const deposit = await depositModel_1.Deposit.create(data);
            // Atualiza o balance do profile associado ao depósito
            await profileModel_1.Profile.update({ balance: sequelize_1.Sequelize.literal(`balance + ${data.depositValue}`) }, { where: { id: data.profileId } });
            return deposit;
        }
        catch (error) {
            throw new Error(`Unable to create deposit: ${error.message}`);
        }
    }
    async findAll() {
        try {
            return await depositModel_1.Deposit.findAll();
        }
        catch (error) {
            throw new Error(`Unable to fetch deposits: ${error.message}`);
        }
    }
    async findById(id) {
        try {
            return await depositModel_1.Deposit.findByPk(id);
        }
        catch (error) {
            throw new Error(`Unable to fetch deposit with ID ${id}: ${error.message}`);
        }
    }
    async updateDeposit(id, data) {
        try {
            const deposit = await this.findById(id); // Busca o depósito atual
            if (!deposit) {
                throw new Error("Deposit not found");
            }
            const previousDepositValue = deposit.depositValue; // Valor anterior do depósito
            const valueDifference = data.depositValue - previousDepositValue; // Calcula a diferença
            if (valueDifference !== 0) {
                // Atualiza o balance apenas se houver diferença
                await profileModel_1.Profile.update({ balance: sequelize_1.Sequelize.literal(`balance + ${valueDifference}`) }, { where: { id: deposit.profileId } });
            }
            // Atualiza o depósito com os novos valores
            return await deposit.update(data);
        }
        catch (error) {
            throw new Error(`Unable to update deposit with ID ${id}: ${error.message}`);
        }
    }
    async deleteDeposit(id) {
        try {
            const deposit = await this.findById(id);
            if (deposit) {
                // Atualiza o balance do profile removendo o valor do depósito
                await profileModel_1.Profile.update({ balance: sequelize_1.Sequelize.literal(`balance - ${deposit.depositValue}`) }, { where: { id: deposit.profileId } });
                await deposit.destroy();
                return true;
            }
            return false;
        }
        catch (error) {
            throw new Error(`Unable to delete deposit with ID ${id}: ${error.message}`);
        }
    }
}
exports.DepositRepository = DepositRepository;
