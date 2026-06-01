import { useUiContext } from '@/UIProvider';
import { NLTButton } from '@/UIKit/NLTButton';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { Loader } from '@/UIKit/Loader';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { Typography } from '@/UIKit/Typography';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useWeighing } from './presenters/useWeighing';
import { getStyles } from './styles';
import { NLTCard } from '@/UIKit/NLTCard';
import { NLTInfoRow } from '@/UIKit/NLTInfoRow';
import { WeightIcon } from '@/assets/icons/WeightsIcon';
import { NLTLabel } from '@/UIKit/NLTLabel';

export const WeighingView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { order, sections, status, actionLabel, isLoading, onPressBack, onPressEdit } = useWeighing();

    return (
        <ScreenContainer
            edges={['top']}
            scrollEnabled
            contentContainerStyle={styles.container}
            headerComponent={<HeaderWithBackButton title={t('weighings.detailsTitle')} onPressBack={onPressBack} />}
        >
            {isLoading
                ? <Loader />
                :
                <View style={styles.content}>
                    <NLTCard>
                        <View style={styles.cardHeader}>
                            <View style={styles.titleRow}>
                                <WeightIcon color={colors.icon_strong} />
                                <Typography variant='h2' text={`#${order?.id || ''}`} style={styles.title} />
                            </View>
                            <NLTLabel value={t(`weighings.statuses.${status}`)} textStyle={styles.badgeText} containerStyle={styles.badge} />
                        </View>
                        {sections.map(section => (
                            <View key={section.id} style={styles.section}>
                                <Text style={styles.titleSection} >{t(section.title)}</Text>
                                <View >
                                    {section.rows.map((row, rowIndex) => {
                                        const value = row.value.startsWith('weighings.') ? t(row.value) : row.value;
                                        return (
                                            <View key={row.id}>
                                                <NLTInfoRow label={t(row.label)} value={value} />
                                                {rowIndex < section.rows.length - 1 ? <View style={styles.separator} /> : null}
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                        ))}
                    </NLTCard>
                    <NLTButton text={t(actionLabel)} onPress={onPressEdit} />
                </View>}
        </ScreenContainer>
    );
});
