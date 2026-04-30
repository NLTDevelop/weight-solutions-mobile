import { useUiContext } from '@/UIProvider';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { InfoRow } from '@/modules/Users/ui/User/components/InfoRow';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { FlatList, ListRenderItem, Text, View } from 'react-native';
import { usePersonalData } from './presenters/usePersonalData';
import { getStyles } from './styles';

export const PersonalDataView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { rows, onPressBack } = usePersonalData();

    const keyExtractor = (item: { id: string }) => item.id;

    const renderItem: ListRenderItem<{ id: string; label: string; value: string }> = ({ item }) => {
        return <InfoRow label={t(item.label)} value={item.value} />;
    };

    const ItemSeparatorComponent = () => {
        return <View style={styles.separator} />;
    };

    return (
        <ScreenContainer edges={['top', 'bottom']} contentContainerStyle={styles.container} headerComponent={<HeaderWithBackButton title={t('profile.personalDataTitle')} onPressBack={onPressBack} containerStyle={styles.header} />}>
            <View style={styles.card}>
                <Text style={styles.title}>{t('profile.personalDataTitle')}</Text>
                <FlatList
                    data={rows}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    scrollEnabled={false}
                    contentContainerStyle={styles.listContent}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                />
            </View>
        </ScreenContainer>
    );
});
