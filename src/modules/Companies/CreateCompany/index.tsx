import { useUiContext } from '@/UIProvider';
import { Button } from '@/UIKit/Button';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useCreateCompany } from './presenters/useCreateCompany';
import { getStyles } from './styles';

export const CreateCompanyView = observer(() => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {
        name,
        contact,
        description,
        isLoading,
        isSubmitDisabled,
        nameErrorText,
        contactErrorText,
        onChangeName,
        onChangeContact,
        onChangeDescription,
        onPressBack,
        onSubmit,
    } = useCreateCompany();

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            isKeyboardAvoiding
            scrollEnabled
            contentContainerStyle={styles.container}
            headerComponent={<HeaderWithBackButton title="Create company" onPressBack={onPressBack} containerStyle={styles.header} />}
        >
            <View style={styles.card}>
                <View style={styles.form}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            value={name}
                            onChangeText={onChangeName}
                            placeholder="Company name"
                            placeholderTextColor={colors.text_light}
                            style={[styles.input, nameErrorText ? styles.inputError : undefined]}
                        />
                        <Text style={nameErrorText ? styles.errorText : styles.helperText}>{nameErrorText || 'Required field'}</Text>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Contact</Text>
                        <TextInput
                            value={contact}
                            onChangeText={onChangeContact}
                            placeholder="Phone, email or person"
                            placeholderTextColor={colors.text_light}
                            style={[styles.input, contactErrorText ? styles.inputError : undefined]}
                        />
                        <Text style={contactErrorText ? styles.errorText : styles.helperText}>{contactErrorText || 'Required field'}</Text>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            value={description}
                            onChangeText={onChangeDescription}
                            placeholder="Optional description"
                            placeholderTextColor={colors.text_light}
                            multiline
                            style={[styles.input, styles.multilineInput]}
                        />
                    </View>

                    <Button
                        text="Create company"
                        onPress={onSubmit}
                        disabled={isSubmitDisabled}
                        inProgress={isLoading}
                        containerStyle={styles.button}
                        textStyle={styles.buttonText}
                    />
                </View>
            </View>
        </ScreenContainer>
    );
});
