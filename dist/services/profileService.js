"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const profileRepository_1 = require("../repositorys/profileRepository");
class ProfileService {
    constructor() {
        this.profileRepository = new profileRepository_1.ProfileRepository();
    }
    async createProfile(firstname, lastname, profession, type, balance) {
        try {
            const profile = await this.profileRepository.createProfile({ firstname, lastname, profession, balance, type });
            return profile;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to create profile: ${error.message}`);
            }
            else {
                throw new Error("An unknown error occurred.");
            }
        }
    }
    async getProfiles() {
        try {
            const profiles = await this.profileRepository.findAll();
            return profiles;
        }
        catch (error) {
            console.error("Error in service layer:", error);
            throw new Error("Error fetching profiles in service");
        }
    }
    async getProfileById(id) {
        try {
            const profile = await this.profileRepository.findById(id);
            return profile;
        }
        catch (error) {
            console.error("Error in service layer:", error);
            throw new Error("Error fetching profile by id in service");
        }
    }
    async updateProfile(id, firstname, lastname, profession, type, balance) {
        try {
            const updatedProfile = await this.profileRepository.updateProfile(id, { firstname, lastname, profession, balance, type });
            return updatedProfile;
        }
        catch (error) {
            console.error("Error in service layer:", error);
            throw new Error("Error updating profile in service");
        }
    }
    async deleteProfile(id) {
        try {
            const result = await this.profileRepository.deleteProfile(id);
            return result;
        }
        catch (error) {
            console.error("Error in service layer:", error);
            throw new Error("Error deleting profile in service");
        }
    }
}
exports.ProfileService = ProfileService;
