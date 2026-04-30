import { IStorage, storage as appStorage } from "@/libs/storage";
import { MobXRepository } from "@/repository/MobXRepository";
import { IUser } from "./IUser";

export interface IUserModel {
    user: IUser | null;
    clear: () => void;
}

class UserModel implements IUserModel {
    private userRepository = new MobXRepository<IUser | null>(null);

    constructor(private storage: IStorage) {
        this.load();
    }

    private load = () => {
        const userdata = this.storage.get('STORAGE_USER');
        userdata && this.userRepository.save(userdata);
    }

    private persistUser = (data: IUser | null) => {
        if (data) {
            this.storage.set('STORAGE_USER', data);
        } else {
            this.storage.remove('STORAGE_USER');
        }
    }

    public get user() {
        return this.userRepository.data;
    }

    public set user(user: IUser | null) {
        this.userRepository.save(user);
        this.persistUser(user);
    }

    public clear() {
        this.user = null;
    }

}

export const userModel = new UserModel(appStorage);
