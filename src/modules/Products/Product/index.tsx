import { useUiContext } from '@/UIProvider';
import { EditIcon } from '@/assets/icons/EditIcon';
import { NLTButton } from '@/UIKit/NLTButton';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { Loader } from '@/UIKit/Loader';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { InfoRow } from '@/modules/Users/ui/User/components/InfoRow';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useProduct } from './presenters/useProduct';
import { getStyles } from './styles';

export const ProductView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { infoRows, status, isLoading, onPressBack, onPressEdit } = useProduct();

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            containerStyle={styles.screen}
            headerComponent={<HeaderWithBackButton title={t('products.detailsTitle')} onPressBack={onPressBack} containerStyle={styles.header} />}
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
                            {infoRows.map((item, index) => (
                                <View key={item.id}>
                                    {index > 0 ? <View style={styles.separator} /> : null}
                                    <InfoRow
                                        label={t(item.label)}
                                        value={item.value.startsWith('products.') ? t(item.value) : item.value}
                                    />
                                </View>
                            ))}
                            <View style={styles.separator} />
                            <View style={styles.statusBlock}>
                                <Text style={styles.statusLabel}>{t('products.statusLabel')}:</Text>
                                <View style={[styles.statusBadge, status === 'active' ? styles.statusBadgeActive : styles.statusBadgeInactive]}>
                                    <Text style={[styles.statusBadgeText, status === 'active' ? styles.statusBadgeTextActive : styles.statusBadgeTextInactive]}>
                                        {t(`products.statuses.${status}`)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.footer}>
                        <NLTButton
                            text={t('products.editButton')}
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
