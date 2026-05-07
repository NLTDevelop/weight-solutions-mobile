import { MobXRepository } from '@/repository/MobXRepository';
import { IContactInformation } from './IContactInformation';

export interface IContactInformationModel {
    contactInformation: IContactInformation | null;
    clear: () => void;
}

class ContactInformationModel implements IContactInformationModel {
    private contactInformationRepository = new MobXRepository<IContactInformation | null>(null, 'CONTACT_INFORMATION');

    public get contactInformation() {
        return this.contactInformationRepository.data;
    }

    public set contactInformation(contactInformation: IContactInformation | null) {
        this.contactInformationRepository.save(contactInformation);
    }

    public clear() {
        this.contactInformation = null;
    }
}

export const contactInformationModel = new ContactInformationModel();
