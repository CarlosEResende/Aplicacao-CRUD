import { ProfileRepository } from "../repositorys/profileRepository";
import { ProfileAttributes } from "../models/profileModel";

export class ProfileService {
  
  private profileRepository = new ProfileRepository();

  public async createProfile(firstname: string, lastname: string, profession: string, type: string, balance: number): Promise<ProfileAttributes> {
    try {
        const profile = await this.profileRepository.createProfile({ firstname, lastname, profession, balance, type });
        return profile;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Unable to create profile: ${error.message}`);
        } else {
            throw new Error("An unknown error occurred.");
        }
    }
  }

  public async getProfiles(): Promise<ProfileAttributes[]> {
    try {
        const profiles = await this.profileRepository.findAll();
        return profiles;
    } catch (error) {
        console.error("Error in service layer:", error);
        throw new Error("Error fetching profiles in service");
    }
  }

  public async getProfileById(id: number): Promise<ProfileAttributes | null> {
    try {
        const profile = await this.profileRepository.findById(id);
        return profile;
    } catch (error) {
        console.error("Error in service layer:", error);
        throw new Error("Error fetching profile by id in service");
    }
  }

  public async updateProfile(id: number, firstname: string, lastname: string, profession: string, type: string, balance: number): Promise<ProfileAttributes | null> {
    try {
        const updatedProfile = await this.profileRepository.updateProfile(id, { firstname, lastname, profession, balance, type });
        return updatedProfile;
    } catch (error) {
        console.error("Error in service layer:", error);
        throw new Error("Error updating profile in service");
    }
  }

  public async deleteProfile(id: number): Promise<boolean> {
    try {
        const result = await this.profileRepository.deleteProfile(id);
        return result;
    } catch (error) {
        console.error("Error in service layer:", error);
        throw new Error("Error deleting profile in service");
    }
  }
  
}
