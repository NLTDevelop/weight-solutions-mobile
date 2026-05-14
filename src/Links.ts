export interface ILinks {
    signIn: string;
    me: string;
    restorePassword: string;
    verifyRestoreCode: string;
    confirmRestorePassword: string;
    company: string;
    companyDetails: (companyId: number) => string;
    orders: string;
    orderDetails: (orderId: number) => string;
    products: string;
    productDetails: (productId: number) => string;
    users: string;
    userDetails: (userId: number) => string;
    userContact: string;
    userContactSave: string;
}

class Links {
    private dev = 'https://weight-solutions.on-forge.com/api/v1';
    private _domain = this.dev;
    private _links = {
        me: `${this._domain}/me`,
        signIn: `${this._domain}/auth/login`,
        restorePassword: `${this._domain}/auth/restore`,
        verifyRestoreCode: `${this._domain}/auth/restore/verify-code`,
        confirmRestorePassword: `${this._domain}/auth/restore/confirm`,
        company: `${this._domain}/company`,
        orders: `${this._domain}/orders`,
        products: `${this._domain}/products`,
        users: `${this._domain}/users`,
        userContact: `${this._domain}/user/contact`,
        userContactSave: `${this._domain}/user/contact/save`,
    };

    public get me() { return this._links.me; }
    public get signIn() { return this._links.signIn; }
    public get restorePassword() { return this._links.restorePassword; }
    public get verifyRestoreCode() { return this._links.verifyRestoreCode; }
    public get confirmRestorePassword() { return this._links.confirmRestorePassword; }
    public get company() { return this._links.company; }
    public companyDetails = (companyId: number) => `${this._links.company}/${companyId}`;
    public get orders() { return this._links.orders; }
    public orderDetails = (orderId: number) => `${this._links.orders}/${orderId}`;
    public get products() { return this._links.products; }
    public productDetails = (productId: number) => `${this._links.products}/${productId}`;
    public get users() { return this._links.users; }
    public userDetails = (userId: number) => `${this._links.users}/${userId}`;
    public get userContact() { return this._links.userContact; }
    public get userContactSave() { return this._links.userContactSave; }

}

export const links = new Links();
