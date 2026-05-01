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
import { useCreateWeighing } from './presenters/useCreateWeighing';
import { getStyles } from './styles';
import { ISelectableOptionItem } from '../types/ISelectableOptionItem';

export const CreateWeighingView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {
        productOptions,
        carNumber,
        weightBefore,
        weightAfter,
        scalePoint,
        isLoading,
        isProductsLoading,
        productErrorText,
        carNumberErrorText,
        weightBeforeErrorText,
        weightAfterErrorText,
        scalePointErrorText,
        isSubmitDisabled,
        onRefreshProducts,
        onChangeCarNumber,
        onChangeWeightBefore,
        onChangeWeightAfter,
        onChangeScalePoint,
        onPressBack,
        onSubmit,
    } = useCreateWeighing();

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
            headerComponent={<HeaderWithBackButton title={t('weighings.createTitle')} onPressBack={onPressBack} containerStyle={styles.header} />}
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
                <NLTTextInput label={t('weighings.scalePointLabel')} value={scalePoint} onChangeText={onChangeScalePoint} error={scalePointErrorText ? t(scalePointErrorText) : ''} />
                <Button text={t('weighings.createButton')} onPress={onSubmit} disabled={isSubmitDisabled} inProgress={isLoading} containerStyle={styles.button} textStyle={styles.buttonText} />
            </View>
        </ScreenContainer>
    );
});
