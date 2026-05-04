import { MobXRepository } from '@/repository/MobXRepository';
import { ICompany } from './ICompany';
import { ICompanyMeta } from './ICompanyMeta';

export interface ICompanyModel {
    companies: ICompany[];
    company: ICompany | null;
    meta: ICompanyMeta | null;
}

class CompanyModel implements ICompanyModel {
    private companiesRepository = new MobXRepository<ICompany[]>([]);
    private companyRepository = new MobXRepository<ICompany | null>(null);
    private metaRepository = new MobXRepository<ICompanyMeta | null>(null);

    public get companies() {
        return this.companiesRepository.data || [];
    }

    public set companies(companies: ICompany[]) {
        this.companiesRepository.save(companies);
    }

    public get company() {
        return this.companyRepository.data;
    }

    public set company(company: ICompany | null) {
        this.companyRepository.save(company);
    }

    public get meta() {
        return this.metaRepository.data;
    }

    public set meta(meta: ICompanyMeta | null) {
        this.metaRepository.save(meta);
    }

    public appened(companies: ICompany[]) {
        this.companies = [...this.companies, ...companies];
    }

    public clear() {
        this.companies = [];
        this.company = null;
        this.meta = null;
    }
}

export const companyModel = new CompanyModel();
