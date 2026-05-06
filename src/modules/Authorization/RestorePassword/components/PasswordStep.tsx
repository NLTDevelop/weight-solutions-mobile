import { useUiContext } from '@/UIProvider';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { Typography } from '@/UIKit/Typography';
import { memo } from 'react';
import { View } from 'react-native';
import { getStyles } from '../styles';
import { IPasswordStepComponentProps } from '../types/IRestorePassword';

interface IProps extends IPasswordStepComponentProps {
    styles: ReturnType<typeof getStyles>;
}

export const PasswordStep = memo(({
    password,
    confirmPassword,
    shouldShowConfirmPasswordError,
    shouldHighlightPasswordFields,
    hasPasswordMinLength,
    hasPasswordDigit,
    hasPasswordSpecialCharacter,
    onChangePassword,
    onChangeConfirmPassword,
    onBlurPassword,
    onBlurConfirmPassword,
    styles,
}: IProps) => {
    const { t } = useUiContext();

    return (
        <View style={styles.section}>
            <View style={styles.field}>
                <NLTTextInput
                    label={t('restorePassword.password.newPasswordLabel')}
                    value={password}
                    onChangeText={onChangePassword}
                    onBlur={onBlurPassword}
                    placeholder={t('common.passwordPlaceholder')}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    showSecureToggle
                    isMandatory
                    isError={shouldHighlightPasswordFields}
                    shape='pill'
                    hasBottomOffset={false}
                />
            </View>

            <View style={styles.field}>
                <NLTTextInput
                    label={t('restorePassword.password.confirmPasswordLabel')}
                    value={confirmPassword}
                    onChangeText={onChangeConfirmPassword}
                    onBlur={onBlurConfirmPassword}
                    placeholder={t('common.passwordPlaceholder')}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    showSecureToggle
                    isMandatory
                    isError={shouldHighlightPasswordFields}
                    error={shouldShowConfirmPasswordError ? t('restorePassword.password.error') : ''}
                    shape='pill'
                    hasBottomOffset={false}
                />
            </View>

            <View style={styles.helperCard}>
                <View style={styles.helperTitleRow}>
                    <View style={styles.helperIcon}>
                        <Typography variant='body_s_bold' text='i' style={styles.helperIconText} />
                    </View>
                    <Typography variant='body_m_bold' text={t('restorePassword.password.helperTitle')} style={styles.helperTitle} />
                </View>

                <View style={styles.helperRules}>
                    <View style={styles.helperRuleRow}>
                        <View style={styles.helperRuleDot} />
                        <Typography
                            variant='body_m'
                            text={t('restorePassword.password.ruleMinLength')}
                            style={[styles.helperRuleText, hasPasswordMinLength && styles.helperRuleTextActive]}
                        />
                    </View>
                    <View style={styles.helperRuleRow}>
                        <View style={styles.helperRuleDot} />
                        <Typography
                            variant='body_m'
                            text={t('restorePassword.password.ruleDigit')}
                            style={[styles.helperRuleText, hasPasswordDigit && styles.helperRuleTextActive]}
                        />
                    </View>
                    <View style={styles.helperRuleRow}>
                        <View style={styles.helperRuleDot} />
                        <Typography
                            variant='body_m'
                            text={t('restorePassword.password.ruleSpecialCharacter')}
                            style={[styles.helperRuleText, hasPasswordSpecialCharacter && styles.helperRuleTextActive]}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
});
