import { useUiContext } from '@/UIProvider';
import { NLTButton } from '@/UIKit/NLTButton';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useEditProduct } from './presenters/useEditProduct';
import { getStyles } from './styles';

export const EditProductView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {
        name,
        description,
        isLoading,
        nameErrorText,
        isActiveSelected,
        isInactiveSelected,
        isSubmitDisabled,
        onChangeName,
        onChangeDescription,
        onSelectActive,
        onSelectInactive,
        onPressBack,
        onSubmit,
    } = useEditProduct();

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            isKeyboardAvoiding
            scrollEnabled
            contentContainerStyle={styles.container}
            headerComponent={<HeaderWithBackButton title={t('products.editTitle')} onPressBack={onPressBack} containerStyle={styles.header} />}
        >
            <View style={styles.form}>
                <NLTTextInput label={t('products.nameLabel')} value={name} onChangeText={onChangeName} error={nameErrorText ? t(nameErrorText) : ''} />
                <NLTTextInput label={t('products.descriptionLabel')} value={description} onChangeText={onChangeDescription} multiline />
                <View style={styles.statusSection}>
                    <Text style={styles.statusLabel}>{t('products.statusLabel')}</Text>
                    <View style={styles.statusRow}>
                        <TouchableOpacity style={[styles.statusOption, isActiveSelected ? styles.statusOptionActive : undefined]} onPress={onSelectActive}>
                            <Text style={[styles.statusOptionText, isActiveSelected ? styles.statusOptionTextActive : undefined]}>{t('products.statuses.active')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.statusOption, isInactiveSelected ? styles.statusOptionActive : undefined]} onPress={onSelectInactive}>
                            <Text style={[styles.statusOptionText, isInactiveSelected ? styles.statusOptionTextActive : undefined]}>{t('products.statuses.inactive')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <NLTButton text={t('products.saveButton')} onPress={onSubmit} disabled={isSubmitDisabled} inProgress={isLoading} containerStyle={styles.button} textStyle={styles.buttonText} />
            </View>
        </ScreenContainer>
    );
});
