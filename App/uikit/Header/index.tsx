import AppStyles from '../../theme/appStyles';
import Colors from '../../theme/colors';
import Fonts from '../../theme/fonts';
import Text from '../../uikit/Text';
import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

/**
 *
 * @param leftButton
 * @param leftContent
 * @param title
 * @param subtitle
 * @param rightButton
 * @returns {*}
 * @constructor
 */

interface Props {
  leftButton?: React.ReactNode;
  leftContent?: React.ReactNode;
  title: string;
  titleSelectable?: boolean;
  subtitle?: string;
  subtitleSelectable?: boolean;
  titleStyle?: StyleProp<ViewStyle>;
  rightButton?: React.ReactNode;
  testIDTitle?: string;
  testIDSubtitle?: string;
  accessibilityLabelTitle?: string;
  accessibilityLabelSubtitle?: string;
  headerContainerStyle?: StyleProp<ViewStyle>;
}

const Header: React.FC<Props> = ({
  leftButton,
  leftContent,
  title,
  titleSelectable,
  subtitle,
  subtitleSelectable,
  titleStyle,
  rightButton,
  testIDTitle,
  testIDSubtitle,
  accessibilityLabelTitle,
  accessibilityLabelSubtitle,
  headerContainerStyle,
}: Props) => (
  <View style={[styles.header, headerContainerStyle]}>
    <View style={styles.leftContent}>
      {leftButton}
      {leftContent}
      {subtitle ? (
        <View>
          <Text.Black
            style={[styles.titleAlt, titleStyle]}
            testID={testIDTitle}
            accessibilityLabel={accessibilityLabelTitle || testIDTitle}
            selectable={titleSelectable}
          >
            {title}
          </Text.Black>
          <Text
            style={styles.subtitle}
            testID={testIDSubtitle}
            accessibilityLabel={accessibilityLabelSubtitle || testIDSubtitle}
            selectable={subtitleSelectable}
          >
            {subtitle}
          </Text>
        </View>
      ) : (
        <Text.Black
          style={[styles.title, titleStyle]}
          testID={testIDTitle}
          accessibilityLabel={accessibilityLabelTitle || testIDTitle}
          selectable={titleSelectable}
        >
          {title}
        </Text.Black>
      )}
    </View>
    {rightButton}
  </View>
);

const styles = StyleSheet.create({
  header: {
    ...AppStyles.rowItemsCenterSpace,
    width: '100%',
    height: 60,
    backgroundColor: Colors.GREEN_47,
    paddingHorizontal: 20,
  },
  leftContent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    marginTop: 1,
    color: Colors.WHITE,
    fontSize: Fonts.size.large,
  },
  titleAlt: {
    marginTop: 1,
    color: Colors.WHITE,
    fontSize: Fonts.size.small,
  },
  subtitle: {
    marginTop: 1,
    color: Colors.WHITE,
  },
});

Header.defaultProps = {
  leftButton: undefined,
  leftContent: undefined,
  subtitle: undefined,
  rightButton: undefined,
  testIDTitle: 'header-text-title',
  testIDSubtitle: 'header-text-subtitle',
  accessibilityLabelTitle: undefined,
  accessibilityLabelSubtitle: undefined,
  titleSelectable: false,
  subtitleSelectable: false,
  titleStyle: {},
  headerContainerStyle: {},
};

export default Header;
