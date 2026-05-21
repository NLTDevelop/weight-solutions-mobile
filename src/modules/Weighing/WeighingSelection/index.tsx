import { useUiContext } from '@/UIProvider';
import { Chevron } from '@/assets/icons/ChevronIcon';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { PhoneBanner } from '@/UIKit/PhoneBanner';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useWeighingStart } from './presenters/useWeighingStart';
import { getStyles } from './styles';
import { NLTCard } from '@/UIKit/NLTCard';
import { BellIcon } from '@/assets/icons/BellIcon';

export const WeighingSelectionView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { onSelectGuest, onSelectOwn, role, onNotificationsPress } = useWeighingStart();

    return (
        <ScreenContainer edges={['top']} headerComponent={<HeaderWithBackButton backDisabled title={t('weighings.title')} rightComponent={role !== null && role === 'admin' ? (<TouchableOpacity onPress={onNotificationsPress}><BellIcon/> </TouchableOpacity>) : null} />} >
            <View style={styles.content}>
                <PhoneBanner />
                <NLTCard onPress={onSelectOwn} containerStyle={styles.marginTop} >
                    <View style={styles.optionHeader}>
                        <Text style={styles.optionTitle}>{t('weighings.startOptions.own.title')}</Text>
                        <Chevron color={colors.icon_strong} position='RIGHT' />
                    </View>
                    <Text style={styles.optionDescription}>{t('weighings.startOptions.own.description')}</Text>
                </NLTCard>
                <NLTCard onPress={onSelectGuest}  >
                    <View style={styles.optionHeader}>
                        <Text style={styles.optionTitle}>{t('weighings.startOptions.guest.title')}</Text>
                        <Chevron color={colors.icon_strong} position='RIGHT' />
                    </View>
                    <Text style={styles.optionDescription}>{t('weighings.startOptions.guest.description')}</Text>
                </NLTCard>
            </View>
        </ScreenContainer>
    );
});
