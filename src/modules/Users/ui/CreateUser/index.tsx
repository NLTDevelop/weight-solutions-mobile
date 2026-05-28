import { useUiContext } from '@/UIProvider';
import { Dropdown } from '@/UIKit/Dropdown';
import { InfoIcon } from '@/assets/icons/InfoIcon';
import { UserIcon } from '@/assets/icons/UserIcon';
import { NLTButton } from '@/UIKit/NLTButton';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useCreateUser } from './presenters/useCreateUser';
import { getStyles } from './styles';

export const CreateUserView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {
        name,
        role,
        email,
        password,
        description,
        isLoading,
        nameErrorText,
        emailErrorText,
        passwordErrorText,
        isSubmitDisabled,
        onChangeName,
        onChangeRole,
        onChangeEmail,
        onChangePassword,
        onChangeDescription,
        onSubmit,
    } = useCreateUser();

    const roleOptions = useMemo(() => ([
        { label: t('profile.roles.admin'), value: 'admin' },
        { label: t('profile.roles.user'), value: 'user' },]
    ), [t]);

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            isKeyboardAvoiding
            scrollEnabled
            headerComponent={<HeaderWithBackButton title={t('users.createTitle')} />}
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
                    <View style={styles.inputContainer}>
                        <View style={styles.labelRow}>
                            <Text style={styles.label}>{t('users.role')}</Text>
                            <Text style={styles.mandatoryMark}>*</Text>
                        </View>
                        <Dropdown
                            value={role}
                            items={roleOptions}
                            placeholder={t('users.role')}
                            setValue={(item) => onChangeRole(item.value as 'admin' | 'user')}
                        />
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
                        maxLength={500}
                        multiline
                        shape='rounded'
                    />
                </View>
            </View>
            <View style={styles.footer}>
                <NLTButton
                    text={t('common.save')}
                    onPress={onSubmit}
                    disabled={isSubmitDisabled}
                    inProgress={isLoading}
                />
            </View>
        </ScreenContainer>
    );
});
