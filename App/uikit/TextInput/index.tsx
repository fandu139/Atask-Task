import React from 'react';
import AppStyles from '../../theme/appStyles';
import Colors from '../../theme/colors';
import Fonts from '../../theme/fonts';
import Icon from '../Icon';
import Pattern from '../../helper/pattern';
import { TextField } from 'rn-material-ui-textfield';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle, Text } from 'react-native';

/**
 * Material text input
 * @param props
 * @param label
 * @param text
 * @param onChangeText
 * @param disabled
 * @param isError
 * @param errorText
 * @param style
 * @returns {*}
 * @constructor
 */

type RightIcon =
  | {
      size: number;
      name: string;
      color: string;
      onPress: () => void;
      testID?: string;
    }
  | undefined;

type KeyboardType =
  | 'default'
  | 'number-pad'
  | 'decimal-pad'
  | 'numeric'
  | 'email-address'
  | 'phone-pad'
  | 'ascii-capable'
  | 'numbers-and-punctuation'
  | 'url'
  | 'name-phone-pad'
  | 'twitter'
  | 'web-search'
  | 'visible-password'
  | string;

type CustomColor = {
  selectionColor: string;
  base: string;
  tintColor: string;
  textColor: string;
  labelColor: string;
};

type TextAlign = 'left' | 'center' | 'right';

interface Props {
  label: string;
  text?: string;
  onChangeText: (value: string) => void;
  disabled?: boolean;
  isError?: boolean;
  errorText?: string;
  style?: StyleProp<TextStyle>;
  inverted?: boolean;
  autoCompleteType?:
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'email'
    | 'name'
    | 'password'
    | 'postal-code'
    | 'street-address'
    | 'tel'
    | 'username'
    | 'off';
  secureTextEntry?: boolean;
  rightIcon?: RightIcon;
  bottomRightText?: string;
  onPressRightText?: () => void;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  keyboardType?: KeyboardType;
  onBlur?: (value: string) => void;
  bottomLabelStyle?: StyleProp<TextStyle>;
  fontSize?: number;
  contentInset?: Record<string, unknown>;
  lineContainer?: StyleProp<ViewStyle>;
  outerPrefix?: React.ReactNode;
  suffix?: React.ReactNode;
  customColor?: CustomColor;
  multiline?: boolean;
  numberOfLines?: number;
  textAlign?: TextAlign;
  maxLength?: number;
  testID: string;
  testIDHelper?: string;
  testIDRightText?: string;
  accessibilityLabel?: string;
  accessibilityLabelHelper?: string;
  accessibilityLabelRightText?: string;
  required?: boolean;
}

type TextInputComponent = React.ForwardRefExoticComponent<Props & React.RefAttributes<TextField>>;

const TextInput: TextInputComponent = React.forwardRef<TextField, Props>(
  (
    {
      label,
      text,
      onChangeText,
      disabled,
      isError,
      errorText,
      style,
      inverted,
      autoCompleteType,
      secureTextEntry,
      rightIcon,
      bottomRightText,
      onPressRightText,
      placeholder,
      containerStyle,
      keyboardType,
      onBlur,
      bottomLabelStyle,
      fontSize,
      contentInset,
      lineContainer,
      outerPrefix,
      suffix,
      customColor,
      multiline,
      numberOfLines,
      textAlign,
      maxLength,
      testID,
      testIDHelper,
      testIDRightText,
      accessibilityLabel,
      accessibilityLabelHelper,
      accessibilityLabelRightText,
      required,
    }: Props,
    ref,
  ) => {
    let color = {
      selectionColor: Colors.GRAY,
      base: text ? Colors.BLACK : Colors.GRAY80,
      tintColor: Colors.GRAY80,
      textColor: Colors.BLACK,
      labelColor: Colors.GRAY80,
    };

    if (inverted) {
      color = {
        selectionColor: Colors.WHITE,
        base: Colors.WHITE,
        tintColor: Colors.WHITE,
        textColor: Colors.WHITE,
        labelColor: Colors.WHITE,
      };
    }

    if (customColor) {
      color = {
        selectionColor: customColor.selectionColor,
        base: customColor.base,
        tintColor: customColor.tintColor,
        textColor: customColor.textColor,
        labelColor: customColor.labelColor,
      };
    }

    if (text) {
      const regex = Pattern.unicode.test(text);

      if (!regex) {
        isError = true;
        errorText = "Karakter yang Anda masukkan tidak valid";
      }
    }

    const textLabel = required ? undefined : label;

    return (
      <View style={containerStyle}>
        {required && (
          <View style={AppStyles.rowItemsCenter}>
            <Text style={styles.label}>{label}</Text>
            <Text testID={`${testID}-required`} style={styles.labelRequired}>
              {' '}
              *
            </Text>
          </View>
        )}
        <TextField
          ref={ref}
          allowFontScaling={false}
          textAlign={textAlign}
          multiline={multiline}
          numberOfLines={numberOfLines}
          bottomLabelStyle={bottomLabelStyle}
          onBlur={onBlur}
          keyboardType={keyboardType}
          useNativeDriver
          placeholder={placeholder}
          selectionColor={color.selectionColor}
          labelTextStyle={styles.labelTextStyle}
          titleTextStyle={styles.textStyle}
          secureTextEntry={secureTextEntry}
          autoCompleteType={autoCompleteType}
          underlineColor={Colors.GRAY}
          labelFontSize={Fonts.size.extraSmall}
          disabledLineType="solid"
          fontSize={fontSize}
          maxLength={maxLength}
          style={[styles.textInputStyle, style]}
          label={textLabel}
          value={text}
          onChangeText={onChangeText}
          disabled={disabled}
          lineWidth={1}
          activeLineWidth={1}
          disabledLineWidth={1}
          baseColor={color.base}
          tintColor={color.tintColor}
          textColor={color.textColor}
          labelColor={color.labelColor}
          errorColor={Colors.RED}
          lineColor={Colors.GRAYE0}
          disabledLineColor={Colors.GRAYE0}
          lineContainer={lineContainer}
          outerPrefix={outerPrefix}
          contentInset={{
            top: 0,
            label: 6,
            input: 10,
            ...contentInset,
          }}
          error={isError && errorText}
          bottomRightText={bottomRightText}
          onPressRightText={onPressRightText}
          suffix={
            rightIcon ? (
              <Icon
                style={styles.rightIconBase}
                size={rightIcon.size}
                name={rightIcon.name}
                color={rightIcon.color}
                onPress={rightIcon.onPress}
                testID={rightIcon.testID || 'right-icon-text-input'}
              />
            ) : (
              suffix
            )
          }
          text={text}
          testID={testID}
          testIDHelper={testIDHelper}
          testIDRightText={testIDRightText}
          accessibilityLabel={accessibilityLabel || testID}
          accessibilityLabelHelper={accessibilityLabelHelper || testIDHelper}
          accessibilityLabelRightText={accessibilityLabelRightText || testIDRightText}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  textInputStyle: {
    ...Fonts.regular,
    fontSize: Fonts.size.medium,
  },
  textStyle: {
    ...Fonts.regular,
    color: Colors.WHITE,
  },
  labelTextStyle: {
    ...Fonts.regular,
    fontSize: Fonts.size.extraSmall,
    color: Colors.GRAY80,
  },
  rightIconBase: {
    padding: 5,
  },
  label: {
    fontSize: Fonts.size.extraSmall,
    color: Colors.GRAY80,
  },
  labelRequired: {
    fontSize: Fonts.size.extraSmall,
    color: Colors.RED,
  },
});

TextInput.defaultProps = {
  text: undefined,
  disabled: false,
  isError: false,
  errorText: '',
  style: {},
  inverted: false,
  autoCompleteType: undefined,
  secureTextEntry: false,
  rightIcon: undefined,
  bottomRightText: undefined,
  onPressRightText: undefined,
  placeholder: undefined,
  containerStyle: {},
  keyboardType: undefined,
  onBlur: undefined,
  bottomLabelStyle: {},
  fontSize: Fonts.size.medium,
  contentInset: {},
  lineContainer: {},
  outerPrefix: undefined,
  suffix: undefined,
  customColor: undefined,
  multiline: false,
  numberOfLines: undefined,
  textAlign: undefined,
  maxLength: 255,
  testIDHelper: 'text-input-default-helper',
  testIDRightText: 'text-input-default-right-text',
  accessibilityLabel: undefined,
  accessibilityLabelHelper: undefined,
  accessibilityLabelRightText: undefined,
  required: false,
};

const TextInputGrouped = Object.assign(TextInput);

export default TextInputGrouped;
