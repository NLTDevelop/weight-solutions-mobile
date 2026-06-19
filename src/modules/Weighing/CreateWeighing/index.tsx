import { useUiContext } from '@/UIProvider';
import { Dropdown } from '@/UIKit/Dropdown';
import { NLTButton } from '@/UIKit/NLTButton';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useCreateWeighing } from './presenters/useCreateWeighing';
import { getStyles } from './styles';
import { useWeightingConnection } from '@/hooks/useWeightingConnection';

export const CreateWeighingView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {
        recordNumber,
        carPhone,
        carNumber,
        selectedProductId,
        movementType,
        weightType,
        weightCount,
        firstWeight,
        comment,
        isLoading,
        productItems,
        movementTypeItems,
        weightCountItems,
        productErrorText,
        carNumberErrorText,
        movementTypeErrorText,
        weightCountErrorText,
        firstWeightErrorText,
        isSubmitDisabled,
        onSelectProduct,
        onChangeCarPhone,
        onChangeCarNumber,
        onSelectMovementType,
        onSelectWeightCount,
        onChangeFirstWeight,
        onChangeComment,
        onPressBack,
        onSubmit,
    } = useCreateWeighing();
    useWeightingConnection();

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            isKeyboardAvoiding
            scrollEnabled
            contentContainerStyle={styles.container}
            headerComponent={<HeaderWithBackButton title={t('weighings.createTitle')} onPressBack={onPressBack} />}
        >
            <View style={styles.content}>
                <NLTTextInput
                    label={t('weighings.recordNumberLabel')}
                    placeholder={t('weighings.recordNumberPlaceholder')}
                    value={recordNumber}
                    editable={false}
                    shape='pill'
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={styles.readonlyInput}
                />
                <NLTTextInput
                    label={t('weighings.phoneLabel')}
                    placeholder={t('weighings.phonePlaceholder')}
                    value={carPhone}
                    onChangeText={onChangeCarPhone}
                    shape='pill'
                    containerStyle={styles.inputContainer}
                    keyboardType='phone-pad'
                />
                <NLTTextInput
                    label={t('weighings.carNumberLabel')}
                    placeholder={t('weighings.carNumberPlaceholder')}
                    value={carNumber}
                    onChangeText={onChangeCarNumber}
                    error={carNumberErrorText ? t(carNumberErrorText) : ''}
                    isMandatory
                    shape='pill'
                    containerStyle={styles.inputContainer}
                />
                <View style={styles.inputContainer}>
                    <View style={styles.labelRow}>
                        <Text style={styles.label}>{t('weighings.cargoTypeLabel')}</Text>
                        <Text style={styles.mandatoryMark}>*</Text>
                    </View>
                    <Dropdown
                        value={selectedProductId}
                        items={productItems}
                        placeholder={t('weighings.productPlaceholder')}
                        setValue={(item) => onSelectProduct(item.value as unknown as number)}
                        zIndex={9999}
                    />
                    {productErrorText ? <Text style={styles.errorText}>{t(productErrorText)}</Text> : null}
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.labelRow}>
                        <Text style={styles.label}>{t('weighings.movementTypeLabel')}</Text>
                        <Text style={styles.mandatoryMark}>*</Text>
                    </View>
                    <Dropdown
                        value={movementType}
                        items={movementTypeItems}
                        placeholder={t('weighings.movementTypePlaceholder')}
                        setValue={(item) => onSelectMovementType(item.value as string)}
                        zIndex={299}
                    />
                    {movementTypeErrorText ? <Text style={styles.errorText}>{t(movementTypeErrorText)}</Text> : null}
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.labelRow}>
                        <Text style={styles.label}>{t('weighings.weightCountLabel')}</Text>
                        <Text style={styles.mandatoryMark}>*</Text>
                    </View>
                    <Dropdown
                        value={weightCount}
                        items={weightCountItems}
                        placeholder={t('weighings.weightCountPlaceholder')}
                        setValue={(item) => onSelectWeightCount(item.value as unknown as number)}
                        zIndex={298}
                    />
                    {weightCountErrorText ? <Text style={styles.errorText}>{t(weightCountErrorText)}</Text> : null}
                </View>
                <NLTTextInput
                    label={t('weighings.weightTypeLabel')}
                    placeholder={t('weighings.weightTypePlaceholder')}
                    value={weightType ? t(`weighings.weightTypesLabels.${weightType}`) : ''}
                    onChangeText={onChangeFirstWeight}
                    editable={false}
                    isMandatory
                    shape='pill'
                    containerStyle={styles.inputContainer}
                />
                <NLTTextInput
                    label={weightType ? t(`weighings.weightTypesLabels.${weightType}`) : t('weighings.weightLabel')}
                    placeholder={weightType ? t(`weighings.weightTypesPlaceholders.${weightType}`) : t('weighings.weightPlaceholder')}
                    value={firstWeight}
                    onChangeText={onChangeFirstWeight}
                    error={firstWeightErrorText ? t(firstWeightErrorText) : ''}
                    isMandatory
                    shape='pill'
                    containerStyle={styles.inputContainer}
                    keyboardType='numeric'
                />
                <NLTTextInput
                    label={t('weighings.commentLabel')}
                    placeholder={t('weighings.commentPlaceholder')}
                    value={comment}
                    onChangeText={onChangeComment}
                    multiline
                    shape='rounded'
                    inputContainerStyle={styles.textAreaInner}
                    style={styles.textArea}
                />
                <Text style={styles.counterText}>{comment.length}/250</Text>
            </View>
            <View style={styles.footer}>
                <NLTButton
                    text={t('weighings.createButton')}
                    onPress={onSubmit}
                    disabled={isSubmitDisabled}
                    inProgress={isLoading}
                />
            </View>
        </ScreenContainer>
    );
});
