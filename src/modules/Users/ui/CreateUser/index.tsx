import { useUiContext } from '@/UIProvider';
import { Chevron } from '@/assets/icons/ChevronIcon';
import { InfoIcon } from '@/assets/icons/InfoIcon';
import { UserIcon } from '@/assets/icons/UserIcon';
import { NLTButton } from '@/UIKit/NLTButton';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useCreateUser } from './presenters/useCreateUser';
import { getStyles } from './styles';

export const CreateUserView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {
        name,
        phone,
        role,
        email,
        password,
        description,
        isLoading,
        nameErrorText,
        phoneErrorText,
        roleErrorText,
        emailErrorText,
        passwordErrorText,
        descriptionErrorText,
        isSubmitDisabled,
        onChangeName,
        onChangePhone,
        onChangeEmail,
        onChangePassword,
        onChangeDescription,
        onToggleRole,
        onPressBack,
        onSubmit,
    } = useCreateUser();

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            isKeyboardAvoiding
            scrollEnabled
            contentContainerStyle={styles.container}
            headerComponent={<HeaderWithBackButton title={t('users.createTitle')} onPressBack={onPressBack} containerStyle={styles.header} />}
        >
            <View style={styles.content}>
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionIconCircle}>
                            <UserIcon width={20} height={20} color={colors.icon_strong} />
                        </View>
                        <Text style={styles.sectionTitle}>{t('users.sections.mainInfo')}</Text>
                    </View>
                    <NLTTextInput
                        label={t('users.fullName')}
                        placeholder={t('users.fullNamePlaceholder')}
                        value={name}
                        onChangeText={onChangeName}
                        error={nameErrorText ? t(nameErrorText) : ''}
                        isMandatory
                        shape='pill'
                        containerStyle={styles.inputContainer}
                    />
                    <NLTTextInput
                        label={t('users.phone')}
                        placeholder={t('users.phonePlaceholder')}
                        value={phone}
                        onChangeText={onChangePhone}
                        error={phoneErrorText ? t(phoneErrorText) : ''}
                        isMandatory
                        shape='pill'
                        keyboardType='phone-pad'
                        containerStyle={styles.inputContainer}
                    />
                    <View style={styles.inputContainer}>
                        <View style={styles.labelRow}>
                            <Text style={styles.label}>{t('users.role')}</Text>
                            <Text style={styles.mandatoryMark}>*</Text>
                        </View>
                        <TouchableOpacity style={[styles.selectField, roleErrorText ? styles.selectFieldError : null]} onPress={onToggleRole} activeOpacity={0.85}>
                            <Text style={styles.selectValue}>{t(`profile.roles.${role}`)}</Text>
                            <Chevron position='DOWN' color={colors.icon_strong} />
                        </TouchableOpacity>
                        {roleErrorText ? <Text style={styles.errorText}>{t(roleErrorText)}</Text> : null}
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionIconCircle}>
                            <InfoIcon width={32} height={32} color={colors.icon_strong} />
                        </View>
                        <Text style={styles.sectionTitle}>{t('users.sections.credentials')}</Text>
                    </View>
                    <NLTTextInput
                        label={t('users.email')}
                        placeholder={t('users.emailPlaceholder')}
                        value={email}
                        onChangeText={onChangeEmail}
                        error={emailErrorText ? t(emailErrorText) : ''}
                        isMandatory
                        shape='pill'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        containerStyle={styles.inputContainer}
                    />
                    <NLTTextInput
                        label={t('users.password')}
                        placeholder={t('users.passwordPlaceholder')}
                        value={password}
                        onChangeText={onChangePassword}
                        error={passwordErrorText ? t(passwordErrorText) : ''}
                        isMandatory
                        shape='pill'
                        secureTextEntry
                        showSecureToggle
                        containerStyle={styles.inputContainer}
                    />
                    <NLTTextInput
                        label={t('users.description')}
                        placeholder={t('users.descriptionPlaceholder')}
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
                </View>
            </View>
            <View style={styles.footer}>
                <NLTButton
                    text={t('common.save')}
                    onPress={onSubmit}
                    disabled={isSubmitDisabled}
                    inProgress={isLoading}
                    containerStyle={[styles.button, isSubmitDisabled && styles.buttonDisabled]}
                    textStyle={[styles.buttonText, isSubmitDisabled && styles.buttonTextDisabled]}
                />
            </View>
        </ScreenContainer>
    );
});
