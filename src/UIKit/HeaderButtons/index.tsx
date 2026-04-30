import React, { FC, memo, useMemo } from 'react';
import { TouchableOpacity, View, Text, Alert } from "react-native";
import { getStyle } from './styles';
import { useUiContext } from '@/UIProvider';

interface IProps {
    onDelete?: () => void;
    onEdit?: () => void;
    onCreate?: () => void;
}

export const HeaderButtons: FC<IProps> = memo(({ onEdit, onDelete, onCreate }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    const onHandlePressDelete = () => {
        Alert.alert(t('delete'), t('sureDeleteItem'), [
            { text: t('cancel'), style: 'cancel', },
            { text: t('delete'), style: 'destructive', onPress: onDelete, },
        ]);
    }

    return (
        <View style={styles.container} >
            {onDelete ? <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onHandlePressDelete}>
                <Text style={styles.text} >{t('delete')}</Text>
            </TouchableOpacity> : null}
            {onEdit ? <TouchableOpacity style={styles.button} onPress={onEdit}>
                <Text style={styles.text} >{t('edit')}</Text>
            </TouchableOpacity> : null}
            {onCreate ? <TouchableOpacity style={styles.button} onPress={onCreate}>
                <Text style={styles.text} >{t('save')}</Text>
            </TouchableOpacity> : null}
        </View>
    );
})