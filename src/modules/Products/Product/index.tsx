import { useUiContext } from '@/UIProvider';
import { NLTButton } from '@/UIKit/NLTButton';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { Loader } from '@/UIKit/loader';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { InfoRow } from '@/modules/Users/ui/User/components/InfoRow';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { FlatList, ListRenderItem, Text, View } from 'react-native';
import { useProduct } from './presenters/useProduct';
import { getStyles } from './styles';

export const ProductView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { product, infoRows, isLoading, onPressBack, onPressEdit } = useProduct();

    const keyExtractor = (item: { id: string }) => item.id;

    const renderItem: ListRenderItem<{ id: string; label: string; value: string }> = ({ item }) => {
        const value = item.value.startsWith('products.') ? t(item.value) : item.label === 'products.statusLabel' ? t(`products.statuses.${item.value}`) : item.value;
        return <InfoRow label={t(item.label)} value={value} />;
    };

    const ItemSeparatorComponent = () => {
        return <View style={styles.separator} />;
    };

    return (
        <ScreenContainer edges={['top', 'bottom']} contentContainerStyle={styles.container} headerComponent={<HeaderWithBackButton title={t('products.detailsTitle')} onPressBack={onPressBack} containerStyle={styles.header} />}>
            {isLoading
                ? <Loader />
                : <View style={styles.card}>
                    <Text style={styles.title}>{product?.name || t('products.titleFallback')}</Text>
                    <FlatList
                        data={infoRows}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        scrollEnabled={false}
                        contentContainerStyle={styles.listContent}
                        ItemSeparatorComponent={ItemSeparatorComponent}
                    />
                    <NLTButton text={t('products.editButton')} onPress={onPressEdit} containerStyle={styles.button} textStyle={styles.buttonText} />
                </View>}
        </ScreenContainer>
    );
});
