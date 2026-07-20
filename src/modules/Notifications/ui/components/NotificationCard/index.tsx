import { Typography } from "@/UIKit/Typography";
import { useUiContext } from "@/UIProvider";
import { useMemo } from "react";
import { View } from "react-native";
import { getStyles } from "./styles";
import { formatTime } from "@/utils";
import { INotificationCard } from "@/modules/Notifications/types/INotificationCard";
import { NLTCard } from "@/UIKit/NLTCard";

interface INotificationCardProps {
    item: INotificationCard;
}

export const NotificationCard = ({ item }: INotificationCardProps) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors, item.isUnread), [colors, item.isUnread]);

    return (
        <NLTCard onPress={item.onPress}>
            {item.isUnread && <View style={styles.unreadDot} />}
            <View style={styles.cardRow}>
                <View style={styles.cardHeader}>
                    <Typography variant='h4' text={item.title} style={styles.cardTitle} />
                    <Typography variant='body_s' text={item.content} style={styles.cardContent} />
                </View>
                <Typography variant='body_xs' text={item.createdAt ? formatTime(item.createdAt) : t('notifications.dateFallback')} style={styles.cardDate} />
            </View>
        </NLTCard>
    );
};
