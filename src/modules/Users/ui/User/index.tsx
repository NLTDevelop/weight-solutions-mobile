import { useUiContext } from '@/UIProvider';
import { EditIcon } from '@/assets/icons/EditIcon';
import { UserIcon } from '@/assets/icons/UserIcon';
import { NLTButton } from '@/UIKit/NLTButton';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { Loader } from '@/UIKit/Loader';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { InfoRow } from './components/InfoRow';
import { useUser } from './presenters/useUser';
import { getStyles } from './styles';

export const UserView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { user, infoRows, isLoading, onPressBack, onPressEdit } = useUser();

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            containerStyle={styles.screen}
            headerComponent={<HeaderWithBackButton title={user?.name || t('users.titleFallback')} onPressBack={onPressBack} containerStyle={styles.header} />}
        >
            {isLoading
                ? <Loader />
                : <View style={styles.content}>
                    <ScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <View style={styles.iconCircle}>
                                    <UserIcon width={20} height={20} color={colors.icon_strong} />
                                </View>
                                <Text style={styles.title}>{user?.name || t('users.titleFallback')}</Text>
                            </View>
                            {infoRows.map((item, index) => (
                                <View key={item.id}>
                                    {index > 0 ? <View style={styles.separator} /> : null}
                                    <InfoRow
                                        label={t(item.label)}
                                        value={item.value.startsWith('users.') || item.value.startsWith('profile.') || item.value.startsWith('products.')
                                            ? t(item.value)
                                            : item.value}
                                    />
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                    <View style={styles.footer}>
                        <NLTButton
                            text={t('users.editButton')}
                            onPress={onPressEdit}
                            containerStyle={styles.button}
                            textStyle={styles.buttonText}
                            LeftAccessory={<EditIcon color={colors.icon_strong} />}
                        />
                    </View>
                </View>}
        </ScreenContainer>
    );
});
