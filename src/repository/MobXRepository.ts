import { action, makeAutoObservable, toJS } from 'mobx';
import { IRepository } from './IRepository';
import { storage } from "@/libs/storage";

export class MobXRepository<T> implements IRepository<T> {
    constructor(private initialValue?: T, private storageKey?: string) {
        makeAutoObservable(this);
        this.storageKey = storageKey;
        if (typeof initialValue !== 'undefined') {
            this._data = this.initialValue as T;
        }
        if (storageKey) {
            this.load();
        }

    }

    private _data: T | null = null;

    get data() {
        return toJS(this._data) ?? null;
    }

    @action save = (data: T | null): void => {
        this._data = data;
        this.persist(data);
    };

    private load = () => {
        const data = storage.get(this.storageKey || '');
        if (data) {
            this._data = data;
        }
    }

    private persist = (data: T | null) => {
        if (data) {
            storage.set(this.storageKey || '', data);
        } else {
            storage.remove(this.storageKey || '');
        }
    }
}
