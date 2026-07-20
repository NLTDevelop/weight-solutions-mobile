import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useUiContext } from '@/UIProvider';
import { appStateModel } from '../../entities/appState/AppStateModel';
import { getStyle } from './styles';

export const LoadingView: FC = observer(() => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (appStateModel.isLoading
        ? <View style={styles.container} >
            <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
        : null
    );
});
