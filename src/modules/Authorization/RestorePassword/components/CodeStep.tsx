import { useUiContext } from '@/UIProvider';
import { Typography } from '@/UIKit/Typography';
import { memo } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { getStyles } from '../styles';
import { ICodeStepComponentProps } from '../types/IRestorePassword';

interface IProps extends ICodeStepComponentProps {
    styles: ReturnType<typeof getStyles>;
}

export const CodeStep = memo(({ code, codeBoxStates, shouldShowCodeError, codeInputRef, onChangeCode, onFocusCodeInput, onBlurCodeInput, onPressCodeInput, styles, }: IProps) => {
    const { t } = useUiContext();
    const firstCodeBox = codeBoxStates[0];
    const secondCodeBox = codeBoxStates[1];
    const thirdCodeBox = codeBoxStates[2];
    const fourthCodeBox = codeBoxStates[3];
    const fifthCodeBox = codeBoxStates[4];
    const sixthCodeBox = codeBoxStates[5];

    return (
        <View style={styles.codeField}>
            <View style={styles.fieldLabelContainer}>
                <Typography variant='body_m_bold' text={t('restorePassword.code.label')} style={styles.fieldLabel} />
                <Typography variant='body_m_bold' text=' *' style={[styles.fieldLabel, styles.mandatoryMark]} />
            </View>

            <TouchableOpacity style={styles.codeBoxesRow} onPress={onPressCodeInput} activeOpacity={1}>
                <View style={[styles.codeBox, firstCodeBox.isActive && styles.codeBoxActive]}>
                    <Typography
                        variant='body_m'
                        text={firstCodeBox.value || '0'}
                        style={[styles.codeBoxValue, !firstCodeBox.value && styles.codeBoxPlaceholder]}
                    />
                </View>
                <View style={[styles.codeBox, secondCodeBox.isActive && styles.codeBoxActive]}>
                    <Typography
                        variant='body_m'
                        text={secondCodeBox.value || '0'}
                        style={[styles.codeBoxValue, !secondCodeBox.value && styles.codeBoxPlaceholder]}
                    />
                </View>
                <View style={[styles.codeBox, thirdCodeBox.isActive && styles.codeBoxActive]}>
                    <Typography
                        variant='body_m'
                        text={thirdCodeBox.value || '0'}
                        style={[styles.codeBoxValue, !thirdCodeBox.value && styles.codeBoxPlaceholder]}
                    />
                </View>
                <View style={[styles.codeBox, fourthCodeBox.isActive && styles.codeBoxActive]}>
                    <Typography
                        variant='body_m'
                        text={fourthCodeBox.value || '0'}
                        style={[styles.codeBoxValue, !fourthCodeBox.value && styles.codeBoxPlaceholder]}
                    />
                </View>
                <View style={[styles.codeBox, fifthCodeBox.isActive && styles.codeBoxActive]}>
                    <Typography
                        variant='body_m'
                        text={fifthCodeBox.value || '0'}
                        style={[styles.codeBoxValue, !fifthCodeBox.value && styles.codeBoxPlaceholder]}
                    />
                </View>
                <View style={[styles.codeBox, sixthCodeBox.isActive && styles.codeBoxActive]}>
                    <Typography
                        variant='body_m'
                        text={sixthCodeBox.value || '0'}
                        style={[styles.codeBoxValue, !sixthCodeBox.value && styles.codeBoxPlaceholder]}
                    />
                </View>
            </TouchableOpacity>

            <TextInput
                ref={codeInputRef}
                value={code}
                onChangeText={onChangeCode}
                onFocus={onFocusCodeInput}
                onBlur={onBlurCodeInput}
                keyboardType="number-pad"
                maxLength={6}
                style={styles.hiddenCodeInput}
            />

            {shouldShowCodeError ? (
                <Typography variant='body_xs' text={t('restorePassword.code.error')} style={styles.fieldErrorText} />
            ) : null}
        </View>
    );
});
