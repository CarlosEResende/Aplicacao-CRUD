"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRepository = void 0;
const profileModel_1 = require("../models/profileModel");
class ProfileRepository {
    async createProfile(data) {
        try {
            return await profileModel_1.Profile.create(data);
        }
        catch (error) {
            throw new Error(`Unable to create profile: ${error.message}`);
        }
    }
    async findAll() {
        try {
            return await profileModel_1.Profile.findAll();
        }
        catch (error) {
            throw new Error(`Unable to fetch profiles: ${error.message}`);
        }
    }
    async findById(id) {
        try {
            return await profileModel_1.Profile.findByPk(id);
        }
        catch (error) {
            throw new Error(`Unable to fetch profile with ID ${id}: ${error.message}`);
        }
    }
    async updateProfile(id, data) {
        try {
            const profile = await this.findById(id);
            if (profile) {
                return await profile.update(data);
            }
            return null;
        }
        catch (error) {
            throw new Error(`Unable to update profile with ID ${id}: ${error.message}`);
        }
    }
    async deleteProfile(id) {
        try {
            const profile = await this.findById(id);
            if (profile) {
                await profile.destroy();
                return true;
            }
            return false;
        }
        catch (error) {
            throw new Error(`Unable to delete profile with ID ${id}: ${error.message}`);
        }
    }
    async findByName(firstName) {
        try {
            return await profileModel_1.Profile.findAll({
                where: {
                    firstname: firstName,
                },
            });
        }
        catch (error) {
            throw new Error(`Unable to fetch profiles with first name ${firstName}: ${error.message}`);
        }
    }
}
exports.ProfileRepository = ProfileRepository;
