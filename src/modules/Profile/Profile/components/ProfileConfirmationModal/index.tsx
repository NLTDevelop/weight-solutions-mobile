import { useUiContext } from '@/UIProvider';
import { Button } from '@/UIKit/Button';
import { useMemo } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
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

export const ProfileConfirmationModal = ({ isVisible, title, description, confirmText, cancelText, onConfirm, onCancel, isDestructive }: IProps) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <Modal animationType="fade" transparent visible={isVisible} onRequestClose={onCancel}>
            <View style={styles.overlay}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={[styles.title, isDestructive ? styles.destructiveTitle : undefined]}>{title}</Text>
                        <TouchableOpacity onPress={onCancel}>
                            <Text style={styles.close}>×</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.description}>{description}</Text>
                    <Button text={confirmText} onPress={onConfirm} containerStyle={isDestructive ? styles.destructiveConfirmButton : styles.confirmButton} textStyle={styles.confirmText} />
                    <Button text={cancelText} onPress={onCancel} containerStyle={styles.cancelButton} textStyle={styles.cancelText} />
                </View>
            </View>
        </Modal>
    );
};
