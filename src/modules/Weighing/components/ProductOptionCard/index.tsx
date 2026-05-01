import { useUiContext } from '@/UIProvider';
import { NLTLabel } from '@/UIKit/NLTLabel';
import { Typography } from '@/UIKit/Typography';
import { ISelectableOptionItem } from '@/modules/Weighing/types/ISelectableOptionItem';
import { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { getStyles } from './styles';

interface IProps {
    item: ISelectableOptionItem;
}

export const ProductOptionCard = ({ item }: IProps) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const description = item.description.startsWith('weighings.') ? t(item.description) : item.description;

    return (
        <TouchableOpacity style={[styles.container, item.isSelected ? styles.containerSelected : undefined]} onPress={item.onPress}>
            <View style={styles.header}>
                <Typography variant='h5' text={item.title} style={styles.title} />
                {item.isSelected ? <NLTLabel value={t('weighings.selectedProductLabel')} /> : null}
            </View>
            <Typography variant='body_s' text={description} style={styles.description} />
        </TouchableOpacity>
    );
};
