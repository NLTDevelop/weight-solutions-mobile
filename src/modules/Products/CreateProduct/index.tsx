import { useUiContext } from '@/UIProvider';
import { Button } from '@/UIKit/Button';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { View } from 'react-native';
import { useCreateProduct } from './presenters/useCreateProduct';
import { getStyles } from './styles';

export const CreateProductView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {
        name,
        description,
        isLoading,
        nameErrorText,
        isSubmitDisabled,
        onChangeName,
        onChangeDescription,
        onPressBack,
        onSubmit,
    } = useCreateProduct();

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            isKeyboardAvoiding
            scrollEnabled
            contentContainerStyle={styles.container}
            headerComponent={<HeaderWithBackButton title={t('products.createTitle')} onPressBack={onPressBack} containerStyle={styles.header} />}
        >
            <View style={styles.form}>
                <NLTTextInput label={t('products.nameLabel')} value={name} onChangeText={onChangeName} error={nameErrorText ? t(nameErrorText) : ''} />
                <NLTTextInput label={t('products.descriptionLabel')} value={description} onChangeText={onChangeDescription} multiline />
                <Button text={t('products.createButton')} onPress={onSubmit} disabled={isSubmitDisabled} inProgress={isLoading} containerStyle={styles.button} textStyle={styles.buttonText} />
            </View>
        </ScreenContainer>
    );
});
