import StringUtils from '../../helper/string';
import Colors from '../../theme/colors';
import Fonts from '../../theme/fonts';
import React from 'react';
import { Text as RNText, StyleSheet, StyleProp, TextStyle, TextProps } from 'react-native';

interface Props extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  link?: boolean;
  error?: boolean;
  testID?: string;
  accessibilityLabel?: string;
}

interface TextComponent
  extends React.ForwardRefExoticComponent<Props & React.RefAttributes<RNText>> {
  Medium: React.ForwardRefExoticComponent<Props & React.RefAttributes<RNText>>;
  Bold: React.ForwardRefExoticComponent<Props & React.RefAttributes<RNText>>;
  Black: React.ForwardRefExoticComponent<Props & React.RefAttributes<RNText>>;
  Currency: React.ForwardRefExoticComponent<Props & React.RefAttributes<RNText>>;
}

const Text = React.forwardRef<RNText, Props>((props: Props, ref) => {
  const { children, style, link, error, testID, accessibilityLabel } = props;
  return (
    <RNText
      ref={ref}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      allowFontScaling={false}
      style={[styles.regularFamily, style, link && styles.link, error && styles.error]}
      accessibilityLabel={accessibilityLabel || testID}
    >
      {children}
    </RNText>
  );
}) as TextComponent;

const Medium = React.forwardRef((props: Props, ref: React.Ref<RNText>) => {
  const { children, style, link, error, testID, accessibilityLabel } = props;
  return (
    <RNText
      ref={ref}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      allowFontScaling={false}
      style={[styles.mediumFamily, style, link && styles.link, error && styles.error]}
      accessibilityLabel={accessibilityLabel || testID}
    >
      {children}
    </RNText>
  );
});

const Bold: React.ForwardRefExoticComponent<Props & React.RefAttributes<RNText>> = React.forwardRef(
  (props: Props, ref: React.Ref<RNText>) => {
    const { children, style, link, error, testID, accessibilityLabel } = props;
    return (
      <RNText
        ref={ref}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        allowFontScaling={false}
        style={[styles.boldFamily, style, link && styles.link, error && styles.error]}
        accessibilityLabel={accessibilityLabel || testID}
      >
        {children}
      </RNText>
    );
  },
);

const Black = React.forwardRef((props: Props, ref: React.Ref<RNText>) => {
  const { children, style, link, error, testID, accessibilityLabel } = props;
  return (
    <RNText
      ref={ref}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      allowFontScaling={false}
      style={[styles.extraBoldFamily, style, link && styles.link, error && styles.error]}
      accessibilityLabel={accessibilityLabel || testID}
    >
      {children}
    </RNText>
  );
});

const Currency = React.forwardRef((props: Props, ref: React.Ref<RNText>) => {
  const { children, style, link, error, testID, accessibilityLabel } = props;
  return (
    <RNText
      ref={ref}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      allowFontScaling={false}
      style={[styles.regularFamily, style, link && styles.link, error && styles.error]}
      accessibilityLabel={accessibilityLabel || testID}
    >
      {`Rp ${StringUtils.thousandSeparator(children as string)}`}
    </RNText>
  );
});

const styles = StyleSheet.create({
  regularFamily: {
    ...Fonts.regular,
    color: Colors.BLACK,
    fontSize: Fonts.size.small,
  },
  mediumFamily: {
    ...Fonts.medium,
    color: Colors.BLACK,
    fontSize: Fonts.size.small,
  },
  boldFamily: {
    ...Fonts.bold,
    color: Colors.BLACK,
    fontSize: Fonts.size.small,
  },
  extraBoldFamily: {
    ...Fonts.extraBold,
    color: Colors.BLACK,
    fontSize: Fonts.size.small,
  },
  link: {
    color: Colors.BRIGHT_BLUE,
  },
  error: {
    color: Colors.RED,
  },
});

Text.defaultProps = {
  link: false,
  style: {},
  error: false,
};

Text.Bold = Bold;
Text.Medium = Medium;
Text.Currency = Currency;
Text.Black = Black;

export default Text;
