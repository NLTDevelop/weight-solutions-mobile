import { useUiContext } from '@/UIProvider';
import { ArrowIcon } from '@/assets/icons/ArrowIcon';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { Typography } from '@/UIKit/Typography';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { CodeStep } from './components/CodeStep';
import { EmailStep } from './components/EmailStep';
import { PasswordStep } from './components/PasswordStep';
import { useRestorePassword } from './presenters/useRestorePassword';
import { getStyles } from './styles';

const logo = require('@/assets/images/logo.png');

export const RestorePasswordView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {
        titleTextKey,
        subtitleTextKey,
        buttonTextKey,
        isEmailStep,
        isCodeStep,
        isPasswordStep,
        isActionDisabled,
        emailStepProps,
        codeStepProps,
        passwordStepProps,
        onSubmit,
        onPressBack,
    } = useRestorePassword();

    return (
        <ScreenContainer edges={['top', 'bottom']} isKeyboardAvoiding scrollEnabled>
            <View style={styles.content}>
                <TouchableOpacity style={styles.headerButton} onPress={onPressBack}>
                    <ArrowIcon color={colors.icon_strong} />
                    <Typography variant='body_m_bold' text={t('common.back')} style={styles.headerButtonText} />
                </TouchableOpacity>

                <View style={styles.formContainer}>
                    <Image source={logo} resizeMode="contain" style={styles.logo} />

                    <View style={styles.section}>
                        <View style={styles.titleBlock}>
                            <Typography variant='h1' text={t(titleTextKey)} style={styles.title} />
                            <Typography variant='body_m' text={t(subtitleTextKey)} style={styles.subtitle} />
                        </View>

                        {isEmailStep ? (
                            <EmailStep {...emailStepProps} styles={styles} />
                        ) : null}

                        {isCodeStep ? (
                            <CodeStep {...codeStepProps} styles={styles} />
                        ) : null}

                        {isPasswordStep ? (
                            <PasswordStep {...passwordStepProps} styles={styles} />
                        ) : null}

                        <TouchableOpacity
                            style={[styles.actionButton, isActionDisabled && styles.actionButtonDisabled]}
                            onPress={onSubmit}
                            disabled={isActionDisabled}
                        >
                            <Typography
                                variant='body_l_bold'
                                text={t(buttonTextKey)}
                                style={[styles.actionButtonText, isActionDisabled && styles.actionButtonTextDisabled]}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScreenContainer>
    );
});
