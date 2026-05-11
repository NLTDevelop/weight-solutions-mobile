import { useUiContext } from '@/UIProvider';
import { NLTButton } from '@/UIKit/NLTButton';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { Typography } from '@/UIKit/Typography';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { View } from 'react-native';
import { useChangePassword } from './presenters/useChangePassword';
import { getStyles } from './styles';

export const ChangePasswordView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {
        oldPassword,
        newPassword,
        confirmPassword,
        isLoading,
        isSubmitDisabled,
        oldPasswordError,
        newPasswordError,
        confirmPasswordError,
        hasPasswordMinLength,
        hasPasswordDigit,
        setOldPassword,
        setNewPassword,
        setConfirmPassword,
        onBlurOldPassword,
        onBlurNewPassword,
        onBlurConfirmPassword,
        onSubmit,
    } = useChangePassword();

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            isKeyboardAvoiding
            scrollEnabled
            contentContainerStyle={styles.container}
            headerComponent={<HeaderWithBackButton title={t('profile.changePasswordScreenTitle')} />}
        >
            <View style={styles.form}>
                <View style={styles.titleBlock}>
                    <Typography variant='body_m' text={t('profile.changePasswordDescription')} style={styles.description} />
                </View>

                <NLTTextInput
                    label={t('profile.changePasswordOldLabel')}
                    value={oldPassword}
                    onChangeText={setOldPassword}
                    onBlur={onBlurOldPassword}
                    placeholder={t('common.passwordPlaceholder')}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry
                    showSecureToggle
                    error={oldPasswordError ? t(oldPasswordError) : ''}
                    shape='pill'
                />

                <NLTTextInput
                    label={t('profile.changePasswordNewLabel')}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    onBlur={onBlurNewPassword}
                    placeholder={t('common.passwordPlaceholder')}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry
                    showSecureToggle
                    error={newPasswordError ? t(newPasswordError) : ''}
                    isError={Boolean(newPasswordError)}
                    shape='pill'
                />

                <NLTTextInput
                    label={t('profile.changePasswordConfirmLabel')}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    onBlur={onBlurConfirmPassword}
                    placeholder={t('common.passwordPlaceholder')}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry
                    showSecureToggle
                    error={confirmPasswordError ? t(confirmPasswordError) : ''}
                    isError={Boolean(confirmPasswordError)}
                    shape='pill'
                />

                <View style={styles.helperCard}>
                    <Typography variant='body_m_bold' text={t('restorePassword.password.helperTitle')} style={styles.helperTitle} />
                    <Typography variant='body_m' text={t('restorePassword.password.ruleMinLength')} style={[styles.helperRuleText, hasPasswordMinLength && styles.helperRuleTextActive]} />
                    <Typography variant='body_m' text={t('restorePassword.password.ruleDigit')} style={[styles.helperRuleText, hasPasswordDigit && styles.helperRuleTextActive]} />
                </View>
            </View>

            <NLTButton
                text={t('profile.changePasswordSubmit')}
                onPress={onSubmit}
                disabled={isSubmitDisabled}
                inProgress={isLoading}
                containerStyle={[styles.button, !isSubmitDisabled && styles.buttonEnabled]}
                textStyle={{ color: isSubmitDisabled ? colors.text_inverted : colors.text }}
            />
        </ScreenContainer>
    );
});
