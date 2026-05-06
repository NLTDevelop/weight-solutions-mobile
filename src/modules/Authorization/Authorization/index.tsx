import { useUiContext } from '@/UIProvider';
import { Button } from '@/UIKit/Button';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Image, View } from 'react-native';
import { useAuthorization } from './presenters/useAuthorization';
import { getStyles } from './styles';
import { Typography } from '@/UIKit/Typography';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
const logo = require('@/assets/images/logo.png');

export const AuthorizationView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { username, password, isLoading, isSubmitDisabled, onChangeUsername, onChangePassword, onBlurUsername, onBlurPassword, onSubmit, } = useAuthorization();

    //     "common": {
    //     "email": "Email",
    //     "emailPlaceholder": "Введіть еmail",
    //     "password": "Пароль",
    //     "passwordPlaceholder": "Введіть пароль"
    // },
    // "authorization": {
    //     "title": "Авторизація",
    //     "subtitle": "Введіть свій email та пароль, щоб увійти в систему.",
    //     "forgotPassword": "Забули пароль?",
    //     "signIn": "Увійти"
    // }

    return (
        <ScreenContainer edges={['top', 'bottom']} isKeyboardAvoiding scrollEnabled contentContainerStyle={styles.container} >
            <View style={styles.card}>
                <Image source={logo} style={styles.image} resizeMode="contain" />
                <Typography variant='h1' text={t('authorization.title')} />
                <Typography variant='body_l' text={t('authorization.subtitle')} />

                <View style={styles.form}>
                    <NLTTextInput
                        label={t('common.email')}
                        value={username}
                        onChangeText={onChangeUsername}
                        onBlur={onBlurUsername}
                        placeholder="Enter username"
                        placeholderTextColor={colors.text_additional}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                    />
                    <NLTTextInput
                        label={t('common.password')}
                        value={password}
                        onChangeText={onChangePassword}
                        onBlur={onBlurPassword}
                        placeholder={t('common.passwordPlaceholder')}
                        placeholderTextColor={colors.text_additional}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry
                    />

                    <Button
                        text="Sign in"
                        onPress={onSubmit}
                        disabled={isSubmitDisabled}
                        inProgress={isLoading}
                        containerStyle={styles.button}
                        textStyle={styles.buttonText}
                    />
                </View>
            </View>
        </ScreenContainer>
    );
});
