import { useUiContext } from '@/UIProvider';
import { NLTButton } from '@/UIKit/NLTButton';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { View } from 'react-native';
import { useEditContactInformation } from './presenters/useEditContactInformation';
import { getStyles } from './styles';

export const EditContactInformationView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {
        phone,
        phone2,
        telegram,
        instagram,
        facebook,
        viber,
        tiktok,
        youtube,
        isLoading,
        isSubmitDisabled,
        setPhone,
        setPhone2,
        setTelegram,
        setInstagram,
        setFacebook,
        setViber,
        setTiktok,
        setYoutube,
        onPressBack,
        onSubmit,
    } = useEditContactInformation();

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            scrollEnabled
            isKeyboardAvoiding
            contentContainerStyle={styles.container}
            headerComponent={<HeaderWithBackButton title={t('profile.contactInformationEditTitle')} onPressBack={onPressBack} containerStyle={styles.header} />}
        >
            <View style={styles.form}>
                <NLTTextInput label={t('profile.contactPhoneSingle')} placeholder={t('profile.contactPhonePlaceholder')} value={phone} onChangeText={setPhone} shape='pill' keyboardType='number-pad' />
                <NLTTextInput label={t('profile.contactPhoneSecondary')} placeholder={t('profile.contactPhonePlaceholder')} value={phone2} onChangeText={setPhone2} shape='pill' keyboardType='number-pad' />
                <NLTTextInput label={t('profile.contactTelegramPlaceholder')} placeholder={t('profile.contactTelegramPlaceholder')} value={telegram} onChangeText={setTelegram} shape='pill' autoCapitalize='none' />
                <NLTTextInput label={t('profile.contactInstagramPlaceholder')} placeholder={t('profile.contactInstagramPlaceholder')} value={instagram} onChangeText={setInstagram} shape='pill' autoCapitalize='none' />
                <NLTTextInput label={t('profile.contactFacebookPlaceholder')} placeholder={t('profile.contactFacebookPlaceholder')} value={facebook} onChangeText={setFacebook} shape='pill' autoCapitalize='none' />
                <NLTTextInput label={t('profile.contactViberPlaceholder')} placeholder={t('profile.contactViberPlaceholder')} value={viber} onChangeText={setViber} shape='pill' autoCapitalize='none' />
                <NLTTextInput label={t('profile.contactTikTokPlaceholder')} placeholder={t('profile.contactTikTokPlaceholder')} value={tiktok} onChangeText={setTiktok} shape='pill' autoCapitalize='none' />
                <NLTTextInput label={t('profile.contactYouTubePlaceholder')} placeholder={t('profile.contactYouTubePlaceholder')} value={youtube} onChangeText={setYoutube} shape='pill' autoCapitalize='none' />
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
