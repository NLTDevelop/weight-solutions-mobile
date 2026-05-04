import { useUiContext } from '@/UIProvider';
import { Button } from '@/UIKit/Button';
import { Typography } from '@/UIKit/Typography';
import { useMemo } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { getStyles } from './styles';

interface IProps {
    isVisible: boolean;
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDestructive?: boolean;
}

export const NLTModal = ({ isVisible, title, description, confirmText, cancelText, onConfirm, onCancel, isDestructive }: IProps) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <Modal animationType="fade" transparent visible={isVisible} onRequestClose={onCancel}>
            <View style={styles.overlay}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Typography variant='h5' text={title} style={[styles.title, isDestructive ? styles.destructiveTitle : undefined]} />
                        <TouchableOpacity onPress={onCancel}>
                            <Typography variant='h4' text='×' style={styles.close} />
                        </TouchableOpacity>
                    </View>
                    <Typography variant='body_m' text={description} style={styles.description} />
                    <Button text={confirmText} onPress={onConfirm} containerStyle={isDestructive ? styles.destructiveConfirmButton : styles.confirmButton} textStyle={styles.confirmText} />
                    <Button text={cancelText} onPress={onCancel} containerStyle={styles.cancelButton} textStyle={styles.cancelText} />
                </View>
            </View>
        </Modal>
    );
};
