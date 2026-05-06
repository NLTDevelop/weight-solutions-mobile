import { useUiContext } from '@/UIProvider';
import { NLTButton } from '@/UIKit/NLTButton';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { Loader } from '@/UIKit/Loader2';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { FlatList, ListRenderItem, Text, View } from 'react-native';
import { InfoRow } from './components/InfoRow';
import { useUser } from './presenters/useUser';
import { getStyles } from './styles';

export const UserView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { user, infoRows, isLoading, onPressBack, onPressEdit } = useUser();

    const keyExtractor = (item: { id: string }) => item.id;

    const renderItem: ListRenderItem<{ id: string; label: string; value: string }> = ({ item }) => {
        return <InfoRow label={t(item.label)} value={item.value} />;
    };

    const ItemSeparatorComponent = () => {
        return <View style={styles.itemSeparator} />;
    };

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            contentContainerStyle={styles.container}
            headerComponent={<HeaderWithBackButton title={t('users.detailsTitle')} onPressBack={onPressBack} containerStyle={styles.header} />}
        >
            {isLoading
                ? <Loader />
                : <View style={styles.content}>
                    <View style={styles.card}>
                        <Text style={styles.title}>{user?.name || t('users.titleFallback')}</Text>
                        <FlatList
                            data={infoRows}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                            scrollEnabled={false}
                            contentContainerStyle={styles.listContent}
                            ItemSeparatorComponent={ItemSeparatorComponent}
                        />
                        <NLTButton text={t('users.editButton')} onPress={onPressEdit} containerStyle={styles.button} textStyle={styles.buttonText} />
                    </View>
                </View>}
        </ScreenContainer>
    );
});
