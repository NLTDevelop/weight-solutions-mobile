import { IColors } from '@/UIProvider/theme/IColors';
import { scaleHorizontal, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 0,
        paddingHorizontal: scaleHorizontal(16),
        paddingBottom: scaleVertical(16),
    },
    calendar: {
        borderRadius: scaleHorizontal(16),
        backgroundColor: colors.card,
    },
    card: {
        width: '100%',
        borderRadius: scaleHorizontal(20),
        padding: scaleHorizontal(16),
        backgroundColor: colors.card,
        gap: scaleVertical(16),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: colors.text_strong,
        fontSize: scaleHorizontal(18),
        lineHeight: scaleVertical(24),
        fontWeight: '600',
    },
    close: {
        color: colors.text_middle,
        fontSize: scaleHorizontal(24),
        lineHeight: scaleVertical(24),
    },
    sectionCalendar: {
        height: scaleVertical(330),
        gap: scaleVertical(8),
    },
    section: {
        gap: scaleVertical(8),
    },
    label: {
        color: colors.text_strong,
        fontSize: scaleHorizontal(14),
        lineHeight: scaleVertical(20),
        fontWeight: '500',
    },
    actions: {
        gap: scaleVertical(8),
    },
    clearButtonContainer: {
        alignSelf: 'center',
        minWidth: 0,
        height: 'auto',
    },
    clearButtonText: {
        fontSize: scaleHorizontal(14),
        lineHeight: scaleVertical(18),
    },
});
