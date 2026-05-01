import { useUiContext } from '@/UIProvider';
import { Button } from '@/UIKit/Button';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { EmptyListView } from '@/UIKit/NLTEmptyListView';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { FlatList, ListRenderItem, Text, View } from 'react-native';
import { ProductOptionCard } from '../components/ProductOptionCard';
import { ISelectableOptionItem } from '../types/ISelectableOptionItem';
import { useEditWeighing } from './presenters/useEditWeighing';
import { getStyles } from './styles';

export const EditWeighingView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {
        productOptions,
        carNumber,
        weightBefore,
        weightAfter,
        isLoading,
        isProductsLoading,
        productErrorText,
        carNumberErrorText,
        weightBeforeErrorText,
        weightAfterErrorText,
        isSubmitDisabled,
        onRefreshProducts,
        onChangeCarNumber,
        onChangeWeightBefore,
        onChangeWeightAfter,
        onPressBack,
        onSubmit,
    } = useEditWeighing();

    const keyExtractor = (item: ISelectableOptionItem) => String(item.id);

    const renderItem: ListRenderItem<ISelectableOptionItem> = ({ item }) => {
        return <ProductOptionCard item={item} />;
    };

    const ItemSeparatorComponent = () => {
        return <View style={styles.productSeparator} />;
    };

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            isKeyboardAvoiding
            scrollEnabled
            contentContainerStyle={styles.container}
            headerComponent={<HeaderWithBackButton title={t('weighings.editTitle')} onPressBack={onPressBack} containerStyle={styles.header} />}
        >
            <View style={styles.form}>
                <Text style={styles.sectionTitle}>{t('weighings.productLabel')}</Text>
                <FlatList
                    data={productOptions}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    scrollEnabled={false}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    onRefresh={onRefreshProducts}
                    refreshing={isProductsLoading}
                    ListEmptyComponent={<EmptyListView text={t('weighings.noProducts')} isLoading={isProductsLoading} />}
                />
                {productErrorText ? <Text style={styles.errorText}>{t(productErrorText)}</Text> : null}
                <NLTTextInput label={t('weighings.carNumberLabel')} value={carNumber} onChangeText={onChangeCarNumber} error={carNumberErrorText ? t(carNumberErrorText) : ''} />
                <NLTTextInput label={t('weighings.grossWeightLabel')} value={weightBefore} onChangeText={onChangeWeightBefore} error={weightBeforeErrorText ? t(weightBeforeErrorText) : ''} keyboardType='numeric' />
                <NLTTextInput label={t('weighings.tareWeightLabel')} value={weightAfter} onChangeText={onChangeWeightAfter} error={weightAfterErrorText ? t(weightAfterErrorText) : ''} keyboardType='numeric' />
                <Button text={t('weighings.saveButton')} onPress={onSubmit} disabled={isSubmitDisabled} inProgress={isLoading} containerStyle={styles.button} textStyle={styles.buttonText} />
            </View>
        </ScreenContainer>
    );
});
