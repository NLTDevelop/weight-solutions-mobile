import { useUiContext } from '@/UIProvider';
import { Button } from '@/UIKit/Button';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { View } from 'react-native';
import { useCreateUser } from './presenters/useCreateUser';
import { getStyles } from './styles';

export const CreateUserView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {
        name,
        username,
        email,
        password,
        description,
        isLoading,
        nameErrorText,
        usernameErrorText,
        emailErrorText,
        passwordErrorText,
        descriptionErrorText,
        isSubmitDisabled,
        onChangeName,
        onChangeUsername,
        onChangeEmail,
        onChangePassword,
        onChangeDescription,
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
            <View style={styles.form}>
                <NLTTextInput label={t('users.name')} value={name} onChangeText={onChangeName} error={nameErrorText ? t(nameErrorText) : ''} />
                <NLTTextInput label={t('users.username')} value={username} onChangeText={onChangeUsername} error={usernameErrorText ? t(usernameErrorText) : ''} autoCapitalize="none" />
                <NLTTextInput label={t('users.email')} value={email} onChangeText={onChangeEmail} error={emailErrorText ? t(emailErrorText) : ''} autoCapitalize="none" keyboardType="email-address" />
                <NLTTextInput label={t('users.password')} value={password} onChangeText={onChangePassword} error={passwordErrorText ? t(passwordErrorText) : ''} secureTextEntry />
                <NLTTextInput label={t('users.description')} value={description} onChangeText={onChangeDescription} error={descriptionErrorText ? t(descriptionErrorText) : ''} multiline />
                <Button text={t('users.createButton')} onPress={onSubmit} disabled={isSubmitDisabled} inProgress={isLoading} containerStyle={styles.button} textStyle={styles.buttonText} />
            </View>
        </ScreenContainer>
    );
});
