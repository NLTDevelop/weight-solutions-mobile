import { useUiContext } from '@/UIProvider';
import { NLTButton } from '@/UIKit/NLTButton';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { Typography } from '@/UIKit/Typography';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useAuthorization } from './presenters/useAuthorization';
import { getStyles } from './styles';

const logo = require('@/assets/images/logo.png');
const AUTHORIZATION_ILLUSTRATION_URL = 'https://www.figma.com/api/mcp/asset/4a3fe167-8f16-4d2f-a441-35b3e484f287';

export const AuthorizationView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {
        username,
        password,
        authErrorText,
        isLoading,
        isSubmitDisabled,
        showPasswordToggle,
        onChangeUsername,
        onChangePassword,
        onPressForgotPassword,
        onSubmit,
    } = useAuthorization();

    return (
        <ScreenContainer isKeyboardAvoiding scrollEnabled>
            <View style={styles.content}>
                <View style={styles.formContainer}>
                    <Image source={logo} style={styles.logo} resizeMode="contain" />

                    <View style={styles.titleContainer}>
                        <Typography variant='h1' text={t('authorization.title')} style={styles.title} />
                        <Typography variant='body_m' text={t('authorization.subtitle')} style={styles.subtitle} />
                    </View>

                    <View style={styles.inputsContainer}>
                        <NLTTextInput
                            label={t('common.email')}
                            value={username}
                            onChangeText={onChangeUsername}
                            placeholder={t('common.emailPlaceholder')}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            isMandatory
                            isError={Boolean(authErrorText)}
                            hasBottomOffset={false}
                        />
                        <NLTTextInput
                            label={t('common.password')}
                            value={password}
                            onChangeText={onChangePassword}
                            placeholder={t('common.passwordPlaceholder')}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry
                            showSecureToggle={showPasswordToggle}
                            isMandatory
                            isError={Boolean(authErrorText)}
                            error={authErrorText ? t(authErrorText) : ''}
                            hasBottomOffset={false}
                        />
                        <TouchableOpacity style={styles.forgotPasswordButton} onPress={onPressForgotPassword}>
                            <Typography variant='body_m_bold' text={t('authorization.forgotPassword')} style={styles.forgotPasswordText} />
                        </TouchableOpacity>
                    </View>

                    <NLTButton
                        text={t('authorization.signIn')}
                        onPress={onSubmit}
                        disabled={isSubmitDisabled}
                        inProgress={isLoading}
                        containerStyle={[styles.button, isSubmitDisabled && styles.buttonDisabled] as any}
                        textStyle={styles.buttonText}
                    />
                </View>

                <Image source={{ uri: AUTHORIZATION_ILLUSTRATION_URL }} style={styles.illustration} resizeMode="contain" />
            </View>
        </ScreenContainer>
    );
});
