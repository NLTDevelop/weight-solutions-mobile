import { useUiContext } from '@/UIProvider';
import { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { getStyles } from './styles';
import { usePhoneBanners } from './usePhoneBanners';
import { observer } from 'mobx-react';
import { Typography } from '../Typography';
import { NLTCard } from '../NLTCard';

export const PhoneBanner = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { contactInformation, onPressFirstPhone, onPressSecondPhone } = usePhoneBanners();

    return (
        contactInformation?.phone ?
            <NLTCard containerStyle={styles.container} >
                <Typography variant='body_m' text={t('weighings.bannerText')} />
                <View style={styles.row}>
                    <TouchableOpacity onPress={onPressFirstPhone} >
                        <Typography variant='body_m_bold' text={contactInformation?.phone} style={styles.phone} />
                    </TouchableOpacity>
                    {contactInformation?.phone2 ? <Typography variant='body_m_bold' text={' / '} style={styles.phone} /> : null}
                    {contactInformation?.phone2 ? <TouchableOpacity onPress={onPressSecondPhone} >
                        <Typography variant='body_m_bold' text={contactInformation?.phone2} style={styles.phone} />
                    </TouchableOpacity> : null}
                </View>
            </NLTCard>
            : null
    );
});
