import { MobXRepository } from "@/repository/MobXRepository";
import { IUser } from "../User/IUser";
import { IUserMeta } from "./IUserMeta";

export interface IUserModel {
    current: IUser | null;
    users: IUser[];
    meta: IUserMeta | null;
    clear: () => void;
}

class UsersModel implements IUserModel {
    private currentRepository = new MobXRepository<IUser | null>(null);
    private usersRepository = new MobXRepository<IUser[]>([], 'users');
    private metaRepository = new MobXRepository<IUserMeta | null>(null, 'usersMeta');

    public get current() {
        return this.currentRepository.data;
    }

    public set current(user: IUser | null) {
        this.currentRepository.save(user);
    }

    public get users() {
        return this.usersRepository.data || [];
    }

    public set users(users: IUser[]) {
        this.usersRepository.save(users);
    }

    public get meta() {
        return this.metaRepository.data;
    }

    public set meta(meta: IUserMeta | null) {
        this.metaRepository.save(meta);
    }

    public clear() {
        this.current = null;
        this.users = [];
        this.meta = null;
    }

}

export const usersModel = new UsersModel();
