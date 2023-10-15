import React from 'react';
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ButtonMenuList from './ButtonMenuList';
import AppStyles from '../../theme/appStyles';
import Fonts from '../../theme/fonts';
import Icon from '../../uikit/Icon';
import Spinner from '../../uikit/Spinner';
import Text from '../../uikit/Text';
import Colors from '../../theme/colors';

/**
 * Documentation: https://reactnative.dev/docs/pressable
 * Based on
 * @param disabled
 * @param loading
 * @param icon
 * @param iconFarRight
 * @param mode
 * @param onPress
 * @param testID
 * @param accessibilityLabel
 * @param style
 * @param textStyle
 * @param title
 * @param useFallback
 * @returns {*}
 * @constructor
 */

type Mode =
  | 'contained'
  | 'outlined'
  | 'custom'
  | 'contained-inverted'
  | 'outlined-bw';
type StyleConfig =
  | {
      button: StyleProp<ViewStyle>;
      text: StyleProp<TextStyle>;
      buttonPressed: StyleProp<TextStyle>;
      spinner: string;
      icon: string;
    }
  | Record<string, never>;

interface Props {
  title: string | undefined;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: {
    name: string;
    size?: number;
    color?: string;
  };
  iconFarRight?: {
    name: string;
    size: number;
    color: string;
  };
  image?: number
    | {
      uri?: string;
      headers?: {
        [key: string]: string;
      };
      priority?: 'low' | 'normal' | 'high';
      cache?: 'immutable' | 'web' | 'cacheOnly';
    };
  mode?: Mode;
  testID: string;
  testIDTitle?: string;
  accessibilityLabel?: string;
  accessibilityLabelTitle?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  useFallback?: boolean;
}

interface ButtonProps {
  MenuList: typeof ButtonMenuList;
  Mode: {
    Contained: 'contained';
    Outlined: 'outlined';
    Custom: 'custom';
    ContainedInverted: 'contained-inverted';
  };
}

const Button: React.FC<Props> & ButtonProps = ({
  disabled,
  loading,
  icon,
  iconFarRight,
  mode,
  onPress,
  testID,
  testIDTitle,
  accessibilityLabel,
  accessibilityLabelTitle,
  style,
  textStyle,
  title,
  useFallback,
  image,
}: Props) => {
  let styleConfig: StyleConfig = {};

  if (mode === 'contained') {
    styleConfig = {
      button: [styles.buttonContained, disabled && styles.buttonContainedDisabled],
      text: [styles.textContained, disabled && styles.textContainedDisabled],
      buttonPressed: styles.buttonContainedPressed,
      spinner: Colors.WHITE,
      icon: Colors.WHITE,
    };
  }

  if (mode === 'outlined') {
    styleConfig = {
      button: [styles.buttonOutlined, disabled && styles.buttonOutlinedDisabled],
      text: [styles.textOutlined, disabled && styles.textOutlinedDisabled],
      buttonPressed: styles.buttonOutlinedPressed,
      spinner: Colors.RED,
      icon: Colors.RED,
    };
  }

  if (mode === 'outlined-bw') {
    styleConfig = {
      button: [styles.buttonOutlinedBW, disabled && styles.buttonOutlinedBWDisabled],
      text: [styles.textOutlinedBW, disabled && styles.textOutlinedBWDisabled],
      buttonPressed: styles.buttonOutlinedBWPressed,
      spinner: Colors.GRAY,
      icon: Colors.GRAY,
    };
  }

  if (mode === 'contained-inverted') {
    styleConfig = {
      button: [styles.buttonContainedInverted, disabled && styles.buttonContainedDisabled],
      text: [styles.textContainedInverted, disabled && styles.textContainedInvertedDisabled],
      buttonPressed: styles.buttonContainedInvertedPressed,
      spinner: Colors.RED,
      icon: Colors.RED,
    };
  }

  if (useFallback) {
    return (
      <TouchableOpacity
        activeOpacity={0.4}
        style={[styleConfig.button, style]}
        disabled={disabled}
        testID={testID}
        accessibilityLabel={testID || accessibilityLabel}
        onPress={() => {
          if (!loading) {
            return onPress();
          }
          return null;
        }}
        hitSlop={AppStyles.HitSlopValue}
      >
        {loading ? (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <Spinner size={style?.height / 2 || 24} color={styleConfig.spinner} />
        ) : (
          <View style={styles.buttonTextContainer}>
            {icon && (
              <Icon
                style={styles.iconMargin}
                name={icon.name}
                size={icon.size}
                color={icon.color || styleConfig.icon}
              />
            )}
            {image && <FastImage style={styles.image} source={image} />}
            <Text.Black style={[styleConfig.text, textStyle]}>{title}</Text.Black>
          </View>
        )}
        {iconFarRight && (
          <View style={styles.iconFarRight}>
            {/* Ignore TS Ignore on Icon
              // @ts-ignore */}
            <Icon
              name={iconFarRight.name}
              size={iconFarRight.size}
              color={iconFarRight.color || styleConfig.icon}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <Pressable
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delayPressIn={0}
      disabled={disabled}
      testID={testID}
      accessibilityLabel={testID || accessibilityLabel}
      onPress={() => {
        if (!loading) {
          return onPress();
        }
        return null;
      }}
      style={({ pressed }) => [styleConfig.button, pressed && styleConfig.buttonPressed, style]}
      hitSlop={AppStyles.HitSlopValue}
    >
      {loading ? (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Spinner size={style?.height / 2 || 24} color={styleConfig.spinner} />
      ) : (
        <View style={styles.buttonTextContainer}>
          {icon && (
            <Icon
              style={styles.iconMargin}
              name={icon.name}
              size={icon.size}
              color={icon.color || styleConfig.icon}
            />
          )}
          {image && <FastImage style={styles.image} source={image} />}
          <Text.Black
            style={[styleConfig.text, textStyle]}
            testID={testIDTitle}
            accessibilityLabel={accessibilityLabelTitle || testIDTitle}
          >
            {title}
          </Text.Black>
        </View>
      )}
      {iconFarRight && (
        <View style={styles.iconFarRight}>
          <Icon
            name={iconFarRight.name}
            size={iconFarRight.size}
            color={iconFarRight.color || styleConfig.icon}
          />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContained: {
    backgroundColor: Colors.GREEN_47,
    color: Colors.WHITE,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  buttonContainedDisabled: {
    backgroundColor: Colors.GRAYF3,
  },
  buttonContainedPressed: {
    backgroundColor: Colors.RED_PRESSED,
  },
  buttonContainedInverted: {
    backgroundColor: Colors.GRAYF3,
    color: Colors.WHITE,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  buttonContainedInvertedDisabled: {
    backgroundColor: Colors.GRAYF3,
  },
  buttonContainedInvertedPressed: {
    backgroundColor: Colors.GRAYF3,
  },
  textContainedInverted: {
    fontSize: Fonts.size.medium,
    color: Colors.GREEN_47,
  },
  textContainedInvertedDisabled: {
    color: Colors.GRAY,
  },
  buttonTextContainer: {
    ...AppStyles.rowItemsCenter,
  },
  iconMargin: {
    marginRight: 5,
  },
  iconFarRight: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContained: {
    fontSize: Fonts.size.medium,
    color: Colors.WHITE,
  },
  textContainedDisabled: {
    color: Colors.GRAY,
  },
  buttonOutlined: {
    borderColor: Colors.RED,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  buttonOutlinedDisabled: {
    borderColor: Colors.GRAYF3,
  },
  buttonOutlinedPressed: {
    opacity: 0.8,
    borderColor: Colors.RED_PRESSED,
  },
  textOutlined: {
    fontSize: Fonts.size.medium,
    color: Colors.RED,
  },
  textOutlinedDisabled: {
    color: Colors.GRAY,
  },
  buttonOutlinedBW: {
    borderColor: Colors.WHITE,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  buttonOutlinedBWDisabled: {
    borderColor: Colors.GRAYF3,
  },
  buttonOutlinedBWPressed: {
    opacity: 0.8,
    borderColor: Colors.BLACK_50,
  },
  textOutlinedBW: {
    fontSize: Fonts.size.medium,
    color: Colors.WHITE,
  },
  textOutlinedBWDisabled: {
    color: Colors.GRAY,
  },
  image: {
    width: 20,
    height: 20,
  },
});

Button.defaultProps = {
  disabled: false,
  loading: false,
  icon: undefined,
  iconFarRight: undefined,
  style: {},
  textStyle: {},
  mode: 'contained',
  accessibilityLabel: undefined,
  testIDTitle: undefined,
  accessibilityLabelTitle: undefined,
  useFallback: true,
  image: undefined,
};

Button.Mode = {
  Contained: 'contained',
  Outlined: 'outlined',
  Custom: 'custom',
  ContainedInverted: 'contained-inverted',
};

Button.MenuList = ButtonMenuList;

export default Button;
