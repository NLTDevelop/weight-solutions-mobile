import { useUiContext } from '@/UIProvider';
import { InfoIcon } from '@/assets/icons/InfoIcon';
import { UserIcon } from '@/assets/icons/UserIcon';
import { NLTButton } from '@/UIKit/NLTButton';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useEditUser } from './presenters/useEditUser';
import { getStyles } from './styles';

export const EditUserView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {
        name,
        role,
        email,
        description,
        isLoading,
        nameErrorText,
        emailErrorText,
        isSubmitDisabled,
        onChangeName,
        onChangeEmail,
        onChangeDescription,
        onPressBack,
        onSubmit,
    } = useEditUser();

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            isKeyboardAvoiding
            scrollEnabled
            contentContainerStyle={styles.container}
            headerComponent={<HeaderWithBackButton title={t('users.editTitle')} onPressBack={onPressBack}/>}
        >
            <View style={styles.content}>
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionIconCircle}>
                            <UserIcon width={20} height={20} color={colors.icon_strong} />
                        </View>
                        <Text style={styles.sectionTitle}>{t('users.sections.mainInfo')}</Text>
                    </View>
                    <NLTTextInput
                        label={t('users.fullName')}
                        placeholder={t('users.fullNamePlaceholder')}
                        value={name}
                        onChangeText={onChangeName}
                        error={nameErrorText ? t(nameErrorText) : ''}
                        isMandatory
                        shape='pill'
                        containerStyle={styles.inputContainer}
                    />
                    <View style={styles.inputContainer}>
                        <View style={styles.labelRow}>
                            <Text style={styles.label}>{t('users.role')}</Text>
                            <Text style={styles.mandatoryMark}>*</Text>
                        </View>
                        <View style={styles.selectField}>
                            <Text style={styles.selectValue}>{t(`profile.roles.${role}`)}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionIconCircle}>
                            <InfoIcon width={32} height={32} color={colors.icon_strong} />
                        </View>
                        <Text style={styles.sectionTitle}>{t('users.sections.credentials')}</Text>
                    </View>
                    <NLTTextInput
                        label={t('users.email')}
                        placeholder={t('users.emailPlaceholder')}
                        value={email}
                        onChangeText={onChangeEmail}
                        error={emailErrorText ? t(emailErrorText) : ''}
                        isMandatory
                        shape='pill'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        containerStyle={styles.inputContainer}
                    />
                    <NLTTextInput
                        label={t('users.description')}
                        placeholder={t('users.descriptionPlaceholder')}
                        value={description}
                        onChangeText={onChangeDescription}
                        isMandatory
                        multiline
                        shape='rounded'
                        containerStyle={styles.inputContainer}
                        inputContainerStyle={styles.textAreaInner}
                        style={styles.textArea}
                    />
                </View>
            </View>
            <View style={styles.footer}>
                <NLTButton
                    text={t('common.save')}
                    onPress={onSubmit}
                    disabled={isSubmitDisabled}
                    inProgress={isLoading}
                    containerStyle={[styles.button, isSubmitDisabled && styles.buttonDisabled]}
                    textStyle={[styles.buttonText, isSubmitDisabled && styles.buttonTextDisabled]}
                />
            </View>
        </ScreenContainer>
    );
});
