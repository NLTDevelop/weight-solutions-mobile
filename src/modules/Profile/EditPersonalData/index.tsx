import { useUiContext } from '@/UIProvider';
import { NLTButton } from '@/UIKit/NLTButton';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { View } from 'react-native';
import { useEditPersonalData } from './presenters/useEditPersonalData';
import { getStyles } from './styles';

export const EditPersonalDataView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {
        name,
        username,
        email,
        description,
        isLoading,
        isSubmitDisabled,
        setName,
        setUsername,
        setEmail,
        setDescription,
        onSubmit,
    } = useEditPersonalData();

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            isKeyboardAvoiding
            scrollEnabled
            contentContainerStyle={styles.container}
            headerComponent={<HeaderWithBackButton title={t('profile.editPersonalDataTitle')} />}
        >
            <View style={styles.form}>
                <NLTTextInput label={t('users.name')} value={name} onChangeText={setName} />
                <NLTTextInput label={t('users.username')} value={username} onChangeText={setUsername} autoCapitalize='none' />
                <NLTTextInput label={t('users.email')} value={email} onChangeText={setEmail} autoCapitalize='none' keyboardType='email-address' />
                <NLTTextInput label={t('users.description')} value={description} onChangeText={setDescription} multiline />
            </View>

            <NLTButton
                text={t('common.save')}
                onPress={onSubmit}
                disabled={isSubmitDisabled}
                inProgress={isLoading}
                containerStyle={[styles.button, !isSubmitDisabled && styles.buttonEnabled]}
                textStyle={{ color: isSubmitDisabled ? colors.text_inverted : colors.text }}
            />
        </ScreenContainer>
    );
});
