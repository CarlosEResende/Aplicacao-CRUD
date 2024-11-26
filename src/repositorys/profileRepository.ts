import { Profile, ProfileCreationAttributes } from "../models/profileModel";

export class ProfileRepository {

    public async createProfile(data: ProfileCreationAttributes): Promise<Profile> {
        try {
            return await Profile.create(data);
        } catch (error) {
            throw new Error(`Unable to create profile: ${(error as Error).message}`);
        }
    }

    public async findAll(): Promise<Profile[]> {
        try {
            return await Profile.findAll();
        } catch (error) {
            throw new Error(`Unable to fetch profiles: ${(error as Error).message}`);
        }
    }

    public async findById(id: number): Promise<Profile | null> {
        try {
            return await Profile.findByPk(id);
        } catch (error) {
            throw new Error(`Unable to fetch profile with ID ${id}: ${(error as Error).message}`);
        }
    }

    public async updateProfile(id: number, data: Partial<ProfileCreationAttributes>): Promise<Profile | null> {
        try {
            const profile = await this.findById(id);
            if (profile) {
                return await profile.update(data);
            }
            return null;
        } catch (error) {
            throw new Error(`Unable to update profile with ID ${id}: ${(error as Error).message}`);
        }
    }

    public async deleteProfile(id: number): Promise<boolean> {
        try {
            const profile = await this.findById(id);
            if (profile) {
                await profile.destroy();
                return true;
            }
            return false;
        } catch (error) {
            throw new Error(`Unable to delete profile with ID ${id}: ${(error as Error).message}`);
        }
    }

    public async findByName(firstName: string): Promise<Profile[]> {
        try {
            return await Profile.findAll({
                where: {
                    firstname: firstName,
                },
            });
        } catch (error) {
            throw new Error(`Unable to fetch profiles with first name ${firstName}: ${(error as Error).message}`);
        }
    }
}
