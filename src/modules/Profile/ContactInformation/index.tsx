import { useUiContext } from '@/UIProvider';
import { EditIcon } from '@/assets/icons/EditIcon';
import { NLTButton } from '@/UIKit/NLTButton';
import { EmptyListView } from '@/UIKit/NLTEmptyListView';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { useContactInformation } from './presenters/useContactInformation';
import { getStyles } from './styles';
import { NLTInfoRow } from '@/UIKit/NLTInfoRow';

export const ContactInformationView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { rows, isLoading, onPressEdit } = useContactInformation();

    const renderItem: ListRenderItem<{ id: string; label: string; value: string }> = ({ item }) => {
        return <NLTInfoRow label={t(item.label)} value={item.value} />;
    };

    const keyExtractor = (item: { id: string }) => item.id;

    const ItemSeparatorComponent = () => <View style={styles.separator} />;

    return (
        <ScreenContainer
            headerComponent={<HeaderWithBackButton title={t('profile.contactSettingsTitle')} />}
        >
            <View style={styles.container}>

                <View style={styles.card}>
                    <FlatList
                        data={rows}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        scrollEnabled={false}
                        contentContainerStyle={styles.listContent}
                        ItemSeparatorComponent={ItemSeparatorComponent}
                        ListEmptyComponent={<EmptyListView text={t('profile.contactInformationEmpty')} isLoading={isLoading} />}
                    />
                </View>

                <NLTButton
                    text={t('profile.editTitle')}
                    onPress={onPressEdit}
                    containerStyle={styles.button}
                    textStyle={styles.buttonText}
                    LeftAccessory={<EditIcon color={colors.icon_strong} />}
                />
            </View>
        </ScreenContainer>
    );
});
