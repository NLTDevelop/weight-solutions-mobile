export interface ILinks {
    signIn: string;
    company: string;
    companyDetails: (companyId: number) => string;
    users: string;
    userDetails: (userId: number) => string;
}

class Links {
    private dev = 'https://weight-solutions.on-forge.com/api/v1';
    private _domain = this.dev;
    private _links = {
        signIn: `${this._domain}/auth/login`,
        company: `${this._domain}/company`,
        users: `${this._domain}/users`,
    };

    public get signIn() { return this._links.signIn; }
    public get company() { return this._links.company; }
    public companyDetails = (companyId: number) => `${this._links.company}/${companyId}`;
    public get users() { return this._links.users; }
    public userDetails = (userId: number) => `${this._links.users}/${userId}`;

}

export const links = new Links();
