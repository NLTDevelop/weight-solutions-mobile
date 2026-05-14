import { useUiContext } from '@/UIProvider';
import { EditIcon } from '@/assets/icons/EditIcon';
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

export const WeighingView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { order, sections, status, actionLabel, isLoading, onPressBack, onPressEdit } = useWeighing();

    return (
        <ScreenContainer
            edges={['top']}
            contentContainerStyle={styles.container}
            headerComponent={<HeaderWithBackButton title={t('weighings.detailsTitle')} onPressBack={onPressBack} />}
        >
            {isLoading
                ? <Loader />
                : <View style={styles.content}>
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={styles.titleRow}>
                                <View style={styles.iconCircle}>
                                    <EditIcon width={20} height={20} color={colors.icon_strong} />
                                </View>
                                <Typography variant='h5' text={`#${order?.id || ''}`} style={styles.title} />
                            </View>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{t(`weighings.statuses.${status}`)}</Text>
                            </View>
                        </View>
                        {sections.map(section => (
                            <View key={section.id} style={styles.section}>
                                <Typography variant='h5' text={t(section.title)} />
                                <View style={styles.rows}>
                                    {section.rows.map((row, rowIndex) => {
                                        const value = row.value.startsWith('weighings.') ? t(row.value) : row.value;
                                        return (
                                            <View key={row.id}>
                                                <View style={styles.row}>
                                                    <Typography variant='body_xs' text={t(row.label)} style={styles.rowLabel} />
                                                    <Typography variant='body_m' text={value} style={styles.rowValue} />
                                                </View>
                                                {rowIndex < section.rows.length - 1 ? <View style={styles.separator} /> : null}
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                        ))}
                    </View>
                    <NLTButton text={t(actionLabel)} onPress={onPressEdit} LeftAccessory={<EditIcon color={colors.icon_strong} />} containerStyle={styles.button} />
                </View>}
        </ScreenContainer>
    );
});
