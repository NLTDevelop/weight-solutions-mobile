import { IContactInformation } from '@/entities/ContactInformation/IContactInformation';

export const useContactInformationUi = (contactInformation: IContactInformation | null) => {
    const phoneValues = [contactInformation?.phone, contactInformation?.phone2].filter(Boolean) as string[];

    const rows = [
        { id: 'phone', label: 'profile.contactPhone', value: phoneValues.length ? phoneValues : ['-'], },
        { id: 'telegram', label: 'profile.contactTelegram', value: contactInformation?.telegram || '-' },
        { id: 'instagram', label: 'profile.contactInstagram', value: contactInformation?.instagram || '-' },
        { id: 'facebook', label: 'profile.contactFacebook', value: contactInformation?.facebook || '-' },
        { id: 'viber', label: 'profile.contactViber', value: contactInformation?.viber || '-' },
        { id: 'tiktok', label: 'profile.contactTikTok', value: contactInformation?.tiktok || '-' },
        { id: 'youtube', label: 'profile.contactYouTube', value: contactInformation?.youtube || '-' },
    ];

    return { rows, };
};
