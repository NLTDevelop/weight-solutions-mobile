import { useUiContext } from '@/UIProvider';
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
        secondWeightDateTime,
        secondWeight,
        isLoading,
        secondWeightErrorText,
        isSubmitDisabled,
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
                    {/* <NLTTextInput label={t('weighings.recordNumberLabel')} value={recordNumber} editable={false} shape='pill' inputContainerStyle={styles.readonlyInput} />
                <NLTTextInput label={t('weighings.phoneLabel')} value={carPhone} editable={false} shape='pill' inputContainerStyle={styles.readonlyInput} />
                <NLTTextInput label={t('weighings.carNumberLabel')} value={carNumber} editable={false} shape='pill' inputContainerStyle={styles.readonlyInput} />
                <NLTTextInput label={t('weighings.cargoTypeLabel')} value={productName} editable={false} shape='pill' inputContainerStyle={styles.readonlyInput} />
                <NLTTextInput label={t('weighings.movementTypeLabel')} value={movementType ? t(`weighings.movementTypes.${movementType}`) : ''} editable={false} shape='pill' inputContainerStyle={styles.readonlyInput} />
                <NLTTextInput label={t('weighings.weightCountLabel')} value={String(weightCount || '')} editable={false} shape='pill' inputContainerStyle={styles.readonlyInput} /> */}

                    <Text style={styles.sectionTitle}>{t('weighings.firstWeighingSectionTitle')}</Text>
                    <NLTInfoRow label={t('weighings.firstWeightDateTimeLabel')} value={formatWeighingDateTime(firstWeightDateTime)} />
                    <NLTInfoRow label={t('weighings.tareWeightLabel')} value={firstWeight} />
                    {/* <NLTTextInput label={t('weighings.firstWeightDateTimeLabel')} value={formatWeighingDateTime(firstWeightDateTime)} editable={false} shape='pill' inputContainerStyle={styles.readonlyInput} />
                <NLTTextInput label={t('weighings.tareWeightLabel')} value={firstWeight} editable={false} shape='pill' inputContainerStyle={styles.readonlyInput} /> */}
                </NLTCard>
                <Text style={styles.sectionTitle}>{t('weighings.secondWeighingSectionTitle')}</Text>
                <NLTTextInput label={t('weighings.secondWeightDateTimeLabel')} value={formatWeighingDateTime(secondWeightDateTime)} editable={false} shape='pill' inputContainerStyle={styles.readonlyInput} />
                <NLTTextInput
                    label={t('weighings.grossWeightLabel')}
                    placeholder={t('weighings.grossWeightPlaceholder')}
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
