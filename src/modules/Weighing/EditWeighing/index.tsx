import { useUiContext } from '@/UIProvider';
import { Dropdown } from '@/UIKit/Dropdown';
import { NLTButton } from '@/UIKit/NLTButton';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useEditWeighing } from './presenters/useEditWeighing';
import { getStyles } from './styles';
import { formatWeighingDateTime } from '../utils/weight';
import { NLTInfoRow } from '@/UIKit/NLTInfoRow';
import { NLTCard } from '@/UIKit/NLTCard';
import { NLTSeparator } from '@/UIKit/NLTSeparator';

export const EditWeighingView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {
        recordNumber,
        carPhone,
        carNumber,
        productName,
        movementType,
        weightCount,
        firstWeightDateTime,
        firstWeight,
        firstWeightType,
        secondWeightDateTime,
        secondWeight,
        weightType,
        weightTypeItems,
        isLoading,
        secondWeightErrorText,
        isSubmitDisabled,
        onSelectWeightType,
        onChangeSecondWeight,
        onPressBack,
        onSubmit,
    } = useEditWeighing();

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            isKeyboardAvoiding
            scrollEnabled
            contentContainerStyle={styles.container}
            headerComponent={<HeaderWithBackButton title={t('weighings.editTitle')} onPressBack={onPressBack} />}
        >
            <View style={styles.content}>
                <NLTCard>
                    <Text style={styles.sectionTitle}>{t('weighings.baseInfoTitle')}</Text>
                    <NLTInfoRow label={t('weighings.recordNumberLabel')} value={recordNumber} />
                    <NLTSeparator />
                    <NLTInfoRow label={t('weighings.phoneLabel')} value={carPhone} />
                    <NLTSeparator />
                    <NLTInfoRow label={t('weighings.carNumberLabel')} value={carNumber} />
                    <NLTSeparator />
                    <NLTInfoRow label={t('weighings.cargoTypeLabel')} value={productName} />
                    <NLTSeparator />
                    <NLTInfoRow label={t('weighings.movementTypeLabel')} value={movementType ? t(`weighings.movementTypes.${movementType}`) : ''} />
                    <NLTSeparator />
                    <NLTInfoRow label={t('weighings.weightCountLabel')} value={String(weightCount || '')} />

                    <Text style={styles.sectionTitle}>{t('weighings.firstWeighingSectionTitle')}</Text>
                    <NLTInfoRow label={t('weighings.firstWeightDateTimeLabel')} value={formatWeighingDateTime(firstWeightDateTime)} />
                    <NLTInfoRow label={t(`weighings.weightTypesLabels.${firstWeightType}`)} value={firstWeight} />
                </NLTCard>
                <Text style={styles.sectionTitle}>{t('weighings.secondWeighingSectionTitle')}</Text>
                <NLTTextInput label={t('weighings.secondWeightDateTimeLabel')} value={formatWeighingDateTime(secondWeightDateTime)} editable={false} shape='pill' inputContainerStyle={styles.readonlyInput} />
                <View style={styles.inputContainer}>
                    <View style={styles.labelRow}>
                        <Text style={styles.label}>{t('weighings.weightTypeLabel')}</Text>
                        <Text style={styles.mandatoryMark}>*</Text>
                    </View>
                    <Dropdown
                        value={weightType}
                        items={weightTypeItems}
                        placeholder={t('weighings.weightTypePlaceholder')}
                        setValue={(item) => onSelectWeightType(item.value as string)}
                    />
                </View>
                <NLTTextInput
                    label={weightType ? t(`weighings.weightTypesLabels.${weightType}`) : t('weighings.weightLabel')}
                    placeholder={weightType ? t(`weighings.weightTypesPlaceholders.${weightType}`) : t('weighings.weightPlaceholder')}
                    value={secondWeight}
                    onChangeText={onChangeSecondWeight}
                    error={secondWeightErrorText ? t(secondWeightErrorText) : ''}
                    isMandatory
                    shape='pill'
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.footer}>
                <NLTButton
                    text={t('weighings.finishButton')}
                    onPress={onSubmit}
                    disabled={isSubmitDisabled}
                    inProgress={isLoading}
                />
            </View>
        </ScreenContainer>
    );
});
