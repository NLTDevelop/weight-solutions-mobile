import { useUiContext } from '@/UIProvider';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { TextButton } from '@/UIKit/textButton';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { usePersonalData } from './presenters/usePersonalData';
import { getStyles } from './styles';
import { NLTCard } from '@/UIKit/NLTCard';
import { NLTInfoRow } from '@/UIKit/NLTInfoRow';
import { userModel } from '@/entities/User/UserModel';

export const PersonalDataView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { rows, onPressBack, onPressEdit } = usePersonalData();
    const isUser = userModel.user?.role === 'user';

    const keyExtractor = (item: { id: string }) => item.id;

    const renderItem: ListRenderItem<{ id: string; label: string; value: string }> = ({ item }) => {
        const value = typeof item.value === 'string' && item.value.startsWith('profile.roles.') ? t(item.value) : item.value;
        return <NLTInfoRow label={item.label} value={value} />;
    };

    const ItemSeparatorComponent = () => {
        return <View style={styles.separator} />;
    };

    return (
        <ScreenContainer
            contentContainerStyle={styles.container}
            headerComponent={<HeaderWithBackButton
                title={t('profile.personalDataTitle')}
                onPressBack={onPressBack}
                rightComponent={isUser ? null : <TextButton text={t('profile.editTitle')} onPress={onPressEdit} textStyles={styles.editButtonText} />}
            />}
        >
            <NLTCard containerStyle={styles.card}>
                <FlatList
                    data={rows}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    scrollEnabled={false}
                    contentContainerStyle={styles.listContent}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                />
            </NLTCard>
        </ScreenContainer>
    );
});
