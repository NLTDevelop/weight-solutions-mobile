import { useUiContext } from '@/UIProvider';
import { Dropdown } from '@/UIKit/Dropdown';
import { NLTButton } from '@/UIKit/NLTButton';
import { TextButton } from '@/UIKit/textButton';
import { Calendar, DateData } from 'react-native-calendars';
import { Text, TouchableOpacity, View } from 'react-native';
import { getStyles } from './styles';
import Modal from 'react-native-modal';
import { MOVEMENT_TYPE, MovementType } from '@/entities/Order/types';

interface IProps {
    isVisible: boolean;
    type: MovementType | null;
    range: {
        startDate: string;
        endDate: string;
    };
    markedDates: Record<string, any>;
    onClose: () => void;
    onSelectType: (value: MovementType | null) => void;
    onDayPress: (day: DateData) => void;
    onApplyFilters: () => void;
    onClearFilters: () => void;
}

export const WeighingsFiltersModal = ({
    isVisible,
    type,
    range,
    markedDates,
    onClose,
    onSelectType,
    onDayPress,
    onApplyFilters,
    onClearFilters,
}: IProps) => {
    const { colors, t } = useUiContext();
    const styles = getStyles(colors);

    const typeItems = [
        { label: t('weighings.filter.allTypes'), value: 0 },
        { label: t('weighings.movementTypes.loading'), value: MOVEMENT_TYPE.loading },
        { label: t('weighings.movementTypes.unloading'), value: MOVEMENT_TYPE.unloading },
    ];

    return (
        <Modal
            animationIn='slideInUp'
            animationOut='slideOutDown'
            isVisible={isVisible}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            backdropTransitionOutTiming={400}
            animationInTiming={400}
            animationOutTiming={400}
            backdropOpacity={0.3}
            style={styles.modal}
            statusBarTranslucent
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}
            hideModalContentWhileAnimating={true}
        >
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.title}>{t('weighings.filter.title')}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.close}>×</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.sectionCalendar}>
                    <Text style={styles.label}>{t('weighings.filter.periodLabel')}</Text>
                    <Calendar
                        onDayPress={onDayPress}
                        current={range.startDate || undefined}
                        markingType='period'
                        markedDates={markedDates}
                        style={styles.calendar}
                        theme={{
                            calendarBackground: colors.card,
                            textSectionTitleColor: colors.text_strong,
                            selectedDayBackgroundColor: colors.primary,
                            selectedDayTextColor: colors.text_strong,
                            todayTextColor: colors.primary,
                            dayTextColor: colors.text_strong,
                            dotColor: colors.primary,
                            selectedDotColor: colors.primary,
                            arrowColor: colors.primary,
                            monthTextColor: colors.primary,
                            textDayFontFamily: 'Poppins-Medium',
                            textMonthFontFamily: 'Poppins-Medium',
                            textDayHeaderFontFamily: 'Poppins-Medium',
                        }}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>{t('weighings.filter.typeLabel')}</Text>
                    <Dropdown
                        value={type ?? 0}
                        items={typeItems}
                        placeholder={t('weighings.filter.typePlaceholder')}
                        setValue={(item) => onSelectType(item.value === 0 ? null : item.value as MovementType)}
                    />
                </View>

                <View style={styles.actions}>
                    <TextButton
                        text={t('weighings.filter.clearButton')}
                        onPress={onClearFilters}
                        containerStyle={styles.clearButtonContainer}
                        textStyles={styles.clearButtonText}
                    />
                    <NLTButton text={t('weighings.filter.applyButton')} onPress={onApplyFilters} />
                </View>
            </View>
        </Modal>
    );
};
