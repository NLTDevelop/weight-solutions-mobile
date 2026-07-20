import { useUiContext } from '@/UIProvider';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { EmptyListView } from '@/UIKit/NLTEmptyListView';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { Typography } from '@/UIKit/Typography';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { View } from 'react-native';
import { LinkedObjectCard } from './components/LinkedObjectCard';
import { useLinkedObjects } from './presenters/useLinkedObjects';
import { getStyles } from './styles';

export const LinkedObjectsView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { linkedCompany } = useLinkedObjects();

    return (
        <ScreenContainer edges={['top', 'bottom']} contentContainerStyle={styles.container} headerComponent={<HeaderWithBackButton title={t('profile.linkedObjectsTitle')}  />}>
            <View style={styles.card}>
                <Typography variant='h5' text={t('profile.linkedObjectsTitle')} style={styles.title} />
                {linkedCompany
                    ? <LinkedObjectCard title={linkedCompany.title} subtitle={linkedCompany.subtitle} description={linkedCompany.description} onPress={linkedCompany.onPress} />
                    : <EmptyListView text={t('profile.linkedObjectsEmpty')} />}
            </View>
        </ScreenContainer>
    );
});
