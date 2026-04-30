import { useUiContext } from '@/UIProvider';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { EmptyListView } from '@/UIKit/NLTEmptyListView';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { LinkedObjectCard } from './components/LinkedObjectCard';
import { useLinkedObjects } from './presenters/useLinkedObjects';
import { getStyles } from './styles';

export const LinkedObjectsView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { linkedCompany, onPressBack } = useLinkedObjects();

    return (
        <ScreenContainer edges={['top', 'bottom']} contentContainerStyle={styles.container} headerComponent={<HeaderWithBackButton title={t('profile.linkedObjectsTitle')} onPressBack={onPressBack} containerStyle={styles.header} />}>
            <View style={styles.card}>
                <Text style={styles.title}>{t('profile.linkedObjectsTitle')}</Text>
                {linkedCompany
                    ? <LinkedObjectCard title={linkedCompany.title} subtitle={linkedCompany.subtitle} description={linkedCompany.description} onPress={linkedCompany.onPress} />
                    : <EmptyListView text={t('profile.linkedObjectsEmpty')} />}
            </View>
        </ScreenContainer>
    );
});
