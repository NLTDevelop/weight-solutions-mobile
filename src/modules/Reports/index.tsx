import { useUiContext } from '@/UIProvider';
import { CalendarModal } from '@/UIKit/Calendar';
import { Dropdown } from '@/UIKit/Dropdown';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { NLTButton } from '@/UIKit/NLTButton';
import { NLTCard } from '@/UIKit/NLTCard';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useReports } from './presenters/useReports';
import { getStyles } from './styles';
import { NLTTextInput } from '@/UIKit/NLTTextInput';

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
        selectedWeighingType,
        userItems,
        weighingTypeItems,
        onDayPress,
        showCalendar,
        onChangeCalendarVisibility,
        onApplyDay,
        markedDates,
        onGetWeightReport,
        isLoading,
        onSelectUser,
        onSelectWeighingType,
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
                    <View style={styles.userBlock}>
                        <Text style={styles.rangeLabel}>{t('reports.weighingTypeLabel')}</Text>
                        <View style={styles.dropdownContainer}>
                            <Dropdown
                                value={selectedWeighingType}
                                items={weighingTypeItems}
                                placeholder={t('reports.weighingTypePlaceholder')}
                                setValue={(item) => onSelectWeighingType(item.value)}
                            />
                        </View>
                    </View>
                    <View style={styles.userBlock}>
                        <TouchableOpacity onPress={onChangeCalendarVisibility}>
                            <NLTTextInput
                                label={t('reports.selectedRangeLabel')}
                                value={formatRange(selectedRange.startDate, selectedRange.endDate, t('reports.rangePlaceholder'))}
                                shape='pill'
                                editable={false}
                                keyboardType='numeric'
                                pointerEvents='none'
                            />
                        </TouchableOpacity>
                    </View>
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
