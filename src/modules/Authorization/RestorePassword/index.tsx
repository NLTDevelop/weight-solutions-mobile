import { useUiContext } from '@/UIProvider';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { getStyles } from './styles';
import { View } from 'react-native';

export const RestorePasswordView = observer(() => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <ScreenContainer edges={['top', 'bottom']} contentContainerStyle={styles.container}>
            <View />
        </ScreenContainer>
    );
});
