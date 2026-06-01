import { useUiContext } from '@/UIProvider';
import { CalendarModal } from '@/UIKit/Calendar';
import { Dropdown } from '@/UIKit/Dropdown';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { NLTButton } from '@/UIKit/NLTButton';
import { NLTCard } from '@/UIKit/NLTCard';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { TextButton } from '@/UIKit/textButton';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useReports } from './presenters/useReports';
import { getStyles } from './styles';

const formatRange = (startDate: string, endDate: string, fallback: string) => {
    if (!startDate || !endDate) {
        return fallback;
    }

    return `${startDate} - ${endDate}`;
};

export const ReportsView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {
        range,
        selectedRange,
        selectedUserId,
        userItems,
        onDayPress,
        showCalendar,
        onChangeCalendarVisibility,
        onApplyDay,
        markedDates,
        onGetWeightReport,
        isLoading,
        onSelectUser,
        onPressBack,
    } = useReports();

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            contentContainerStyle={styles.container}
            headerComponent={<HeaderWithBackButton title={t('reports.title')} onPressBack={onPressBack} />}
        >
            <View style={styles.content}>
                <NLTCard >
                    <Text style={styles.cardTitle}>{t('reports.rangeTitle')}</Text>
                    <Text style={styles.cardDescription}>{t('reports.rangeDescription')}</Text>
                    <View style={styles.userBlock}>
                        <Text style={styles.rangeLabel}>{t('reports.userLabel')}</Text>
                        <View style={styles.dropdownContainer}>
                            <Dropdown
                                value={selectedUserId ?? 0}
                                items={userItems}
                                placeholder={t('reports.userPlaceholder')}
                                setValue={(item) => onSelectUser(item.value as number)}
                            />
                        </View>
                    </View>
                    <View style={styles.rangeBlock}>
                        <Text style={styles.rangeLabel}>{t('reports.selectedRangeLabel')}</Text>
                        <Text style={styles.rangeValue}>{formatRange(selectedRange.startDate, selectedRange.endDate, t('reports.rangePlaceholder'))}</Text>
                    </View>
                    <TextButton
                        text={t('reports.selectRangeButton')}
                        onPress={onChangeCalendarVisibility}
                        containerStyle={styles.textButtonContainer}
                        textStyles={styles.textButton}
                    />
                </NLTCard>
            </View>
            <View style={styles.footer}>
                <NLTButton
                    text={t('reports.downloadButton')}
                    onPress={onGetWeightReport}
                    disabled={!selectedRange.startDate || !selectedRange.endDate}
                    inProgress={isLoading}
                />
            </View>
            <CalendarModal
                visible={showCalendar}
                onDayPress={onDayPress}
                onBackdropPress={onApplyDay}
                calendarProps={{
                    markingType: 'period',
                    markedDates,
                    current: range.startDate || undefined,
                }}
            />
        </ScreenContainer>
    );
});
