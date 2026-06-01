import { useCallback, useMemo, useState } from "react";
import { CalendarUtils, DateData } from "react-native-calendars";
import { useUiContext } from "../../../UIProvider";
import Share from 'react-native-share';
import { userModel } from "@/entities/User/UserModel";
import { fileSystem } from "@/libs/fileSystems";
import { links } from "@/Links";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const useReports = () => {
    const { colors } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [isLoading, setIsLoading] = useState(false);
    const [range, setRange] = useState({ startDate: '', endDate: '' });
    const [selectedRange, setSelectedRange] = useState({ startDate: '', endDate: '' });
    const [showCalendar, setShowCalendar] = useState(false);

    const onDayPress = useCallback((day: DateData) => {
        if (!range.startDate && !range.endDate) {
            setRange({ startDate: day.dateString, endDate: day.dateString });
        } else if (range.startDate === range.endDate) {
            const startDate = new Date(range.startDate) < new Date(day.dateString)
                ? range.startDate
                : day.dateString;
            const endDate = new Date(range.startDate) < new Date(day.dateString)
                ? day.dateString
                : range.startDate;
            setRange({ startDate, endDate });
        } else {
            setRange({ startDate: day.dateString, endDate: day.dateString });
        }
    }, [range]);

    const onChangeCalendarVisibility = useCallback(() => {
        setShowCalendar((prev) => !prev);
        setRange(selectedRange);
    }, [selectedRange]);

    const onApplyDay = useCallback(() => {
        setSelectedRange(range);
        setShowCalendar(false);
    }, [range]);

    const markedDates = useMemo(() => {
        if (!range.startDate || !range.endDate) {
            return {};
        }
        const marked: Record<string, any> = {};
        const getDay = (day: string) => CalendarUtils.getCalendarDateString(new Date(day));
        const start = new Date(range.startDate);
        const end = new Date(range.endDate);
        const primaryColor = colors.primary;
        const textColor = colors.text_strong;
        let current = new Date(start);
        while (current <= end) {
            const dateStr = getDay(current.toISOString());
            marked[dateStr] = {
                color: primaryColor,
                textColor: textColor,
            };
            current.setDate(current.getDate() + 1);
        }
        marked[getDay(range.startDate)] = {
            ...marked[getDay(range.startDate)],
            startingDay: true,
        };
        marked[getDay(range.endDate)] = {
            ...marked[getDay(range.endDate)],
            color: primaryColor,
            textColor: textColor,
            endingDay: true,
        };
        return marked;
    }, [range, colors]);

    const onGetWeightReport = async () => {
        try {
            if (!selectedRange.startDate || !selectedRange.endDate || !userModel.user?.id) {
                return;
            }
            setIsLoading(true);
            const url = links.reportWeight + `?end_date=${selectedRange?.endDate}&start_date=${selectedRange?.startDate}&user_id=${userModel.user?.id}`;
            const response = await fileSystem.download(url, 'qr_code_report.xlsx');
            if (response?.path) {
                await shareFile(response.path, 'Звіт зважування за період з ' + selectedRange.startDate + ' по ' + selectedRange.endDate);
            }
        } catch (error) {
            console.error('Error downloading equipment report:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const shareFile = async (filePath: string, title: string) => {
        try {
            const fullPath = filePath.startsWith('file://') ? filePath : 'file://' + filePath;
            const exists = await fileSystem.exist(fullPath);
            if (!exists) {
                return;
            }

            const shareOptions = {
                title,
                url: fullPath,
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                failOnCancel: false,
                filename: filePath.split('/').pop(),
                showAppsToView: true,
            };

            await Share.open(shareOptions);
            await fileSystem.deleteFile(fullPath);
        } catch (error) {
            console.error('Ошибка при шаринге файла:', error);
        }
    };

    return {
        range,
        selectedRange,
        onDayPress,
        showCalendar,
        onChangeCalendarVisibility,
        onApplyDay,
        markedDates,
        onGetWeightReport,
        isLoading,
        onPressBack: () => navigation.goBack(),
    };

}
