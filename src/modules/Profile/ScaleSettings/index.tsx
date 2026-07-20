import { useUiContext } from '@/UIProvider';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { NLTButton } from '@/UIKit/NLTButton';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { View } from 'react-native';
import { useScaleSettings } from './presenters/useScaleSettings';
import { getStyles } from './styles';

export const ScaleSettingsView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {
        host,
        port,
        hostErrorText,
        portErrorText,
        isSubmitDisabled,
        setHost,
        setPort,
        onBlurHost,
        onBlurPort,
        onSubmit,
    } = useScaleSettings();

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            isKeyboardAvoiding
            contentContainerStyle={styles.container}
            headerComponent={<HeaderWithBackButton title={t('profile.scaleSettings.title')} />}
        >
            <View style={styles.form}>
                <NLTTextInput
                    label={t('profile.scaleSettings.hostLabel')}
                    placeholder={t('profile.scaleSettings.hostPlaceholder')}
                    value={host}
                    onChangeText={setHost}
                    onBlur={onBlurHost}
                    error={hostErrorText ? t(hostErrorText) : ''}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='url'
                    shape='pill'
                    isMandatory
                />
                <NLTTextInput
                    label={t('profile.scaleSettings.portLabel')}
                    placeholder={t('profile.scaleSettings.portPlaceholder')}
                    value={port}
                    onChangeText={setPort}
                    onBlur={onBlurPort}
                    error={portErrorText ? t(portErrorText) : ''}
                    keyboardType='number-pad'
                    shape='pill'
                    isMandatory
                />
            </View>
            <NLTButton
                text={t('common.save')}
                onPress={onSubmit}
                disabled={isSubmitDisabled}
                containerStyle={styles.button}
            />
        </ScreenContainer>
    );
});
