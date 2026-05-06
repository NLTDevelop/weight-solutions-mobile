import { useUiContext } from '@/UIProvider';
import { NLTButton } from '@/UIKit/NLTButton';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { Loader } from '@/UIKit/loader';
import { NLTRow } from '@/UIKit/NLTRow';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { Typography } from '@/UIKit/Typography';
import { IWeighingInfoRow } from '@/modules/Weighing/types/IWeighingInfoRow';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { useWeighing } from './presenters/useWeighing';
import { getStyles } from './styles';

export const WeighingView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { order, infoRows, isLoading, onPressBack, onPressEdit } = useWeighing();

    const keyExtractor = (item: IWeighingInfoRow) => item.id;

    const renderItem: ListRenderItem<IWeighingInfoRow> = ({ item }) => {
        const value = item.value.startsWith('weighings.') ? t(item.value) : item.value;
        return <NLTRow label={t(item.label)} value={value} />;
    };

    const ItemSeparatorComponent = () => {
        return <View style={styles.separator} />;
    };

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            contentContainerStyle={styles.container}
            headerComponent={<HeaderWithBackButton title={t('weighings.detailsTitle')} onPressBack={onPressBack} containerStyle={styles.header} />}
        >
            {isLoading
                ? <Loader />
                : <View style={styles.card}>
                    <Typography variant='h3' text={order?.product?.name || t('weighings.titleFallback')} style={styles.title} />
                    <FlatList
                        data={infoRows}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        scrollEnabled={false}
                        contentContainerStyle={styles.listContent}
                        ItemSeparatorComponent={ItemSeparatorComponent}
                    />
                    <NLTButton text={t('weighings.editButton')} onPress={onPressEdit} containerStyle={styles.button} textStyle={styles.buttonText} />
                </View>}
        </ScreenContainer>
    );
});
