import { useUiContext } from '@/UIProvider';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { TextButton } from '@/UIKit/textButton';
import { Typography } from '@/UIKit/Typography';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { PersonalDataRow } from './components/PersonalDataRow';
import { usePersonalData } from './presenters/usePersonalData';
import { getStyles } from './styles';

export const PersonalDataView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { rows, onPressBack, onPressEdit } = usePersonalData();

    const keyExtractor = (item: { id: string }) => item.id;

    const renderItem: ListRenderItem<{ id: string; label: string; value: string | string[] }> = ({ item }) => {
        const value = typeof item.value === 'string' && item.value.startsWith('profile.roles.') ? t(item.value) : item.value;
        return <PersonalDataRow label={t(item.label)} value={value} />;
    };

    const ItemSeparatorComponent = () => {
        return <View style={styles.separator} />;
    };

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            contentContainerStyle={styles.container}
            headerComponent={<HeaderWithBackButton
                title={t('profile.personalDataTitle')}
                onPressBack={onPressBack}
                containerStyle={styles.header}
                rightComponent={<TextButton text={t('profile.editTitle')} onPress={onPressEdit} textStyles={styles.editButtonText} containerStyle={styles.editButton} />}
            />}
        >
            <View style={styles.card}>
                <Typography variant='h5' text={t('profile.personalDataTitle')} style={styles.title} />
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
