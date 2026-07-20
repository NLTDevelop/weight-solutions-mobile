import { useUiContext } from '@/UIProvider';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { memo } from 'react';
import { View } from 'react-native';
import { getStyles } from '../styles';
import { IEmailStepComponentProps } from '../types/IRestorePassword';

interface IProps extends IEmailStepComponentProps {
    styles: ReturnType<typeof getStyles>;
}

export const EmailStep = memo(({ email, shouldShowEmailError, onChangeEmail, onBlurEmail, styles, }: IProps) => {
    const { t } = useUiContext();

    return (
        <View style={styles.field}>
            <NLTTextInput
                label={t('common.email')}
                value={email}
                onChangeText={onChangeEmail}
                onBlur={onBlurEmail}
                placeholder={t('common.emailPlaceholder')}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                isMandatory
                isError={shouldShowEmailError}
                error={shouldShowEmailError ? t('restorePassword.email.error') : ''}
                hasBottomOffset={false}
            />
        </View>
    );
});
