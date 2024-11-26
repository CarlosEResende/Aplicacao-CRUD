"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const profileService_1 = require("../services/profileService");
class ProfileController {
    constructor() {
        this.profileService = new profileService_1.ProfileService();
    }
    async createProfile(req, res) {
        const { firstname, lastname, profession, type, balance } = req.body;
        try {
            const profile = await this.profileService.createProfile(firstname, lastname, profession, type, balance);
            return res.status(201).json(profile);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to create profile" });
        }
    }
    async getProfiles(req, res) {
        try {
            const profiles = await this.profileService.getProfiles();
            return res.status(200).json(profiles);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch profiles" });
        }
    }
    async getProfileById(req, res) {
        const { id } = req.params;
        try {
            const profile = await this.profileService.getProfileById(Number(id));
            if (profile) {
                return res.status(200).json(profile);
            }
            else {
                return res.status(404).json({ message: "Profile not found" });
            }
        }
        catch (error) {
            return res.status(500).json({ message: "Failed to fetch profile" });
        }
    }
    async updateProfile(req, res) {
        const { id } = req.params;
        const { firstname, lastname, profession, type, balance } = req.body;
        try {
            const updatedProfile = await this.profileService.updateProfile(Number(id), firstname, lastname, profession, type, balance);
            if (updatedProfile) {
                return res.status(200).json(updatedProfile);
            }
            else {
                return res.status(404).json({ message: "Profile not found" });
            }
        }
        catch (error) {
            return res.status(500).json({ message: "Failed to update profile" });
        }
    }
    async deleteProfile(req, res) {
        const { id } = req.params;
        try {
            const result = await this.profileService.deleteProfile(Number(id));
            if (result) {
                return res.status(200).json({ message: "Profile deleted successfully" });
            }
            else {
                return res.status(404).json({ message: "Profile not found" });
            }
        }
        catch (error) {
            return res.status(500).json({ message: "Failed to delete profile" });
        }
    }
}
exports.ProfileController = ProfileController;
