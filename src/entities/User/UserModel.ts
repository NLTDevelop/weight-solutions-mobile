import { MobXRepository } from "@/repository/MobXRepository";
import { IUser } from "./IUser";

export interface IUserModel {
    user: IUser | null;
    clear: () => void;
}

class UserModel implements IUserModel {
    private userRepository = new MobXRepository<IUser | null>(null, 'STORAGE_USER');

    public get user() {
        return this.userRepository.data;
    }

    public set user(user: IUser | null) {
        this.userRepository.save(user);
    }

    public clear() {
        this.user = null;
    }

}

export const userModel = new UserModel();
