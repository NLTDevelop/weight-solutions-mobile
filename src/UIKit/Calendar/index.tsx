import React, { FC, useMemo, memo } from 'react';
import { View, } from 'react-native';
import { useUiContext } from '@/UIProvider';
import { getStyle } from './styles';
import Modal from 'react-native-modal';
import { Calendar, CalendarProps, DateData } from 'react-native-calendars';
import { NLTButton } from '../NLTButton';

interface IProps {
    onDayPress: (day: DateData) => void;
    visible: boolean;
    onBackdropPress: () => void;
    calendarProps?: CalendarProps;
}

export const CalendarModal: FC<IProps> = memo(({ visible, onDayPress, onBackdropPress, calendarProps = {} }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (
        <Modal
            isVisible={visible}
            hasBackdrop={true}
            backdropOpacity={0.4}
            animationIn='fadeIn'
            animationOut={'fadeOut'}
            onBackdropPress={onBackdropPress}
            style={styles.modal}
        >
            <View style={styles.container}>
                <Calendar
                    onDayPress={onDayPress}
                    style={styles.calendar}
                    theme={{
                        calendarBackground: colors.background,
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
                    {...calendarProps}
                />
                <NLTButton onPress={onBackdropPress} text={t('apply')} containerStyle={styles.button} />
            </View>
        </Modal>
    );
})
