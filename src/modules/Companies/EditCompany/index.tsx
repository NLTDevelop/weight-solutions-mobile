import { useUiContext } from '@/UIProvider';
import { NLTButton } from '@/UIKit/NLTButton';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useEditCompany } from './presenters/useEditCompany';
import { getStyles } from './styles';

export const EditCompanyView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {
        name,
        email,
        address,
        owner,
        phone,
        description,
        isLoading,
        isSubmitDisabled,
        nameErrorText,
        ownerErrorText,
        descriptionLength,
        descriptionMaxLength,
        onChangeEmail,
        onChangeName,
        onChangeAddress,
        onChangeOwner,
        onChangePhone,
        onChangeDescription,
        onPressBack,
        onSubmit,
    } = useEditCompany();

    return (
        <ScreenContainer
            isKeyboardAvoiding
            scrollEnabled
            headerComponent={(
                <HeaderWithBackButton
                    title={t('companies.editTitle')}
                    onPressBack={onPressBack}
                />
            )}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.form}>
                        <View style={styles.field}>
                            <NLTTextInput
                                label={t('companies.nameLabel')}
                                value={name}
                                onChangeText={onChangeName}
                                placeholder={t('companies.namePlaceholder')}
                                error={nameErrorText}
                                isMandatory
                                maxLength={50}
                                containerStyle={styles.inputContainer}
                                inputContainerStyle={styles.pillInputInner}
                                labelStyle={styles.labelStyle}
                            />
                        </View>

                        <View style={styles.field}>
                            <NLTTextInput
                                label={t('companies.ownerInputLabel')}
                                value={owner}
                                onChangeText={onChangeOwner}
                                placeholder={t('companies.ownerPlaceholder')}
                                error={ownerErrorText}
                                isMandatory
                                maxLength={50}
                                containerStyle={styles.inputContainer}
                                inputContainerStyle={styles.pillInputInner}
                                labelStyle={styles.labelStyle}
                            />
                        </View>

                        <View style={styles.field}>
                            <NLTTextInput
                                label={t('companies.addressInputLabel')}
                                value={address}
                                onChangeText={onChangeAddress}
                                placeholder={t('companies.addressPlaceholder')}
                                maxLength={50}
                                containerStyle={styles.inputContainer}
                                inputContainerStyle={styles.pillInputInner}
                                labelStyle={styles.labelStyle}
                            />
                        </View>

                        <View style={styles.field}>
                            <NLTTextInput
                                label={t('companies.phoneInputLabel')}
                                value={phone}
                                onChangeText={onChangePhone}
                                placeholder={t('companies.phonePlaceholder')}
                                keyboardType='phone-pad'
                                maxLength={50}
                                containerStyle={styles.inputContainer}
                                inputContainerStyle={styles.pillInputInner}
                                labelStyle={styles.labelStyle}
                            />
                        </View>

                        <View style={styles.field}>
                            <NLTTextInput
                                label={t('companies.emailInputLabel')}
                                value={email}
                                onChangeText={onChangeEmail}
                                placeholder={t('companies.emailPlaceholder')}
                                keyboardType='email-address'
                                maxLength={50}
                                containerStyle={styles.inputContainer}
                                inputContainerStyle={styles.pillInputInner}
                                labelStyle={styles.labelStyle}
                            />
                        </View>

                        <View style={styles.field}>
                            <NLTTextInput
                                label={t('companies.descriptionInputLabel')}
                                value={description}
                                onChangeText={onChangeDescription}
                                placeholder={t('companies.descriptionPlaceholder')}
                                multiline
                                shape='rounded'
                                maxLength={descriptionMaxLength}
                                containerStyle={styles.inputContainer}
                                inputContainerStyle={styles.multilineInputInner}
                                labelStyle={styles.labelStyle}
                                style={styles.multilineInput}
                            />
                            <Text style={styles.counterText}>{descriptionLength}/{descriptionMaxLength}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.footer}>
                    <NLTButton
                        text={t('companies.saveButton')}
                        onPress={onSubmit}
                        disabled={isSubmitDisabled}
                        inProgress={isLoading}
                        containerStyle={[styles.button, isSubmitDisabled && styles.buttonDisabled]}
                        textStyle={[styles.buttonText, isSubmitDisabled && styles.buttonTextDisabled]}
                    />
                </View>
            </View>
        </ScreenContainer>
    );
});
