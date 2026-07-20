import { useUiContext } from '@/UIProvider';
import { Dropdown } from '@/UIKit/Dropdown';
import { NLTButton } from '@/UIKit/NLTButton';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useEditProduct } from './presenters/useEditProduct';
import { getStyles } from './styles';

export const EditProductView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {
        name,
        description,
        status,
        isLoading,
        nameErrorText,
        descriptionErrorText,
        isSubmitDisabled,
        onChangeName,
        onChangeDescription,
        onSelectStatus,
        onSubmit,
    } = useEditProduct();

    const statusOptions = useMemo(() => ([
        { label: t('products.statuses.active'), value: 'active' },
        { label: t('products.statuses.inactive'), value: 'inactive' },
    ]), [t]);

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            isKeyboardAvoiding
            scrollEnabled
            contentContainerStyle={styles.container}
            headerComponent={<HeaderWithBackButton title={t('products.editTitle')} />}
        >
            <View style={styles.content}>
                <NLTTextInput
                    label={t('products.nameLabel')}
                    placeholder={t('products.namePlaceholder')}
                    value={name}
                    onChangeText={onChangeName}
                    error={nameErrorText ? t(nameErrorText) : ''}
                    isMandatory
                    shape='pill'
                    containerStyle={styles.inputContainer}
                />
                <View style={styles.inputContainer}>
                    <View style={styles.labelRow}>
                        <Text style={styles.label}>{t('products.statusLabel')}</Text>
                        <Text style={styles.mandatoryMark}>*</Text>
                    </View>
                    <Dropdown
                        value={status}
                        items={statusOptions}
                        placeholder={t('products.statusPlaceholder')}
                        setValue={(item) => onSelectStatus(item.value as 'active' | 'inactive')}
                    />
                </View>
                <NLTTextInput
                    label={t('products.descriptionLabel')}
                    placeholder={t('products.descriptionPlaceholder')}
                    value={description}
                    onChangeText={onChangeDescription}
                    error={descriptionErrorText ? t(descriptionErrorText) : ''}
                    isMandatory
                    multiline
                    shape='rounded'
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={styles.textAreaInner}
                    style={styles.textArea}
                />
                <Text style={styles.counterText}>{description.length}/250</Text>
            </View>
            <View style={styles.footer}>
                <NLTButton text={t('common.save')} onPress={onSubmit} disabled={isSubmitDisabled} inProgress={isLoading} containerStyle={[styles.button, isSubmitDisabled && styles.buttonDisabled]} textStyle={[styles.buttonText, isSubmitDisabled && styles.buttonTextDisabled]} />
            </View>
        </ScreenContainer>
    );
});
