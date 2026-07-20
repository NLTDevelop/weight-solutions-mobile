import { observer } from 'mobx-react';
import { CompaniesView } from '@/modules/Companies/Companies';

export const HomeView = observer(() => {
    return (
        <CompaniesView />
    );
});
