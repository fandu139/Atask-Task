import { ICON_ARROW_RIGHT } from '../../assets/icon';
import Colors from '../../theme/colors';
import Icon from '../Icon';
import Text from '../Text';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import AppStyles from '../../theme/appStyles';
import Divider from '../Divider';

/**
 *
 * @param testID
 * @param accessibilityLabel
 * @param iconLeft
 * @param imageLeft
 * @param iconLeftColor
 * @param iconRight
 * @param iconRightColor
 * @param rightTitle
 * @param title
 * @param onPress
 * @param titleStyle
 * @param style
 * @param useDivider
 * @param useBold
 * @param rightTitleStyle
 * @param headerText
 * @param headerRightText
 * @param description
 * @param disabled
 * @param subtitle
 * @param rightContent
 * @returns {*}
 * @constructor
 */

interface Props {
  testID: string;
  testIDTitle?: string;
  testIDRightTitle?: string;
  accessibilityLabel?: string;
  iconLeft?: string;
  imageLeft?: number;
  iconLeftColor?: string;
  iconRight?: string | null;
  iconRightColor?: string;
  iconRightSize?: number;
  onPressIconRight?: () => void;
  testIDIconRight?: string;
  rightTitle?: string;
  title?: string | React.ReactNode;
  onPress?: () => void;
  titleStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  useDivider?: boolean;
  useBold?: boolean;
  rightTitleStyle?: StyleProp<TextStyle>;
  headerText?: string;
  headerRightText?: string;
  description?: string;
  disabled?: boolean;
  subtitle?: React.ReactNode;
  rightContent?: React.ReactNode;
  rightTitleSelectable?: boolean;
}

const ButtonMenuList: React.FC<Props> = ({
  testID,
  testIDTitle,
  testIDRightTitle,
  accessibilityLabel,
  iconLeft,
  imageLeft,
  iconLeftColor,
  iconRight,
  iconRightColor,
  iconRightSize,
  onPressIconRight,
  testIDIconRight,
  rightTitle,
  title,
  onPress,
  titleStyle,
  style,
  useDivider,
  useBold,
  rightTitleStyle,
  headerText,
  headerRightText,
  description,
  disabled,
  subtitle,
  rightContent,
  rightTitleSelectable,
}: Props) => {
  const isVerticalStyle = !!(headerText && headerRightText && description);
  const Title = useBold ? Text.Bold : Text;

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      onPress={onPress}
      testID={testID}
      style={[styles.container, style, isVerticalStyle && styles.containerRow]}
      accessibilityLabel={testID || accessibilityLabel}
    >
      {isVerticalStyle &&
        (imageLeft ? (
          <View style={styles.contentImage}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={styles.imageItem}
              source={imageLeft as number}
            />
          </View>
        ) : (
          <View style={styles.contentImage}>
            <Icon
              name={iconLeft}
              style={styles.iconLeft}
              size={22}
              color={iconLeftColor as string}
            />
          </View>
        ))}
      <View style={[styles.content, isVerticalStyle && styles.containerColumn]}>
        {isVerticalStyle && (
          <View style={styles.rightTextContainer}>
            <Text style={titleStyle} testID={`title-${testID}`}>
              {headerText}
            </Text>
            <Text style={styles.headerRightText} testID={`subtitle-${testID}`}>
              {headerRightText}
            </Text>
          </View>
        )}
        {!isVerticalStyle && (
          <Icon
            size={18}
            style={styles.iconContainer}
            color={iconLeftColor as string}
            name={iconLeft}
          />
        )}
        {!isVerticalStyle && imageLeft !== 1 && (
          <View style={styles.iconContainer}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={styles.imageItem}
              source={imageLeft as number}
            />
          </View>
        )}
        <View style={styles.listContent}>
          <View style={rightContent ? styles.innerListContentFreeStyle : styles.innerListContent}>
            <View style={styles.leftTextContainer}>
              <View>
                {typeof title === 'string' ? (
                  <Title testID={testIDTitle || `title-${testID}`} style={titleStyle}>
                    {title}
                  </Title>
                ) : (
                  title
                )}
                {subtitle}
              </View>
            </View>
            {rightContent || (
              <View style={styles.rightTextContainer}>
                {(!!description || !!rightTitle) && (
                  <Text
                    testID={testIDRightTitle}
                    style={rightTitleStyle}
                    selectable={rightTitleSelectable}
                  >
                    {isVerticalStyle ? description : rightTitle}
                  </Text>
                )}
                {iconRight ? (
                  <Icon
                    style={styles.iconRight}
                    size={iconRightSize as number}
                    name={iconRight}
                    color={iconRightColor as string}
                    onPress={onPressIconRight}
                    testID={testIDIconRight}
                  />
                ) : undefined}
              </View>
            )}
          </View>
        </View>
      </View>
      {useDivider && <Divider color={Colors.GRAYE0} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: 20,
  },
  containerRow: {
    ...AppStyles.rowItems,
    justifyContent: 'flex-start',
  },
  containerColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flexDirection: 'row',
  },
  contentImage: {
    justifyContent: 'center',
    paddingRight: 15,
  },
  leftTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginRight: 10,
  },
  imageItem: {
    width: 36,
    height: 36,
  },
  iconLeft: {
    marginRight: 15,
  },
  iconRight: {
    marginLeft: 15,
  },
  headerRightText: {
    color: Colors.GRAY,
    fontSize: 12,
  },
  listContent: {
    flex: 1,
  },
  innerListContent: {
    ...AppStyles.rowItemsCenterSpace,
    marginBottom: 15,
  },
  innerListContentFreeStyle: {
    ...AppStyles.rowItemsSpace,
    marginBottom: 15,
  },
});

ButtonMenuList.defaultProps = {
  accessibilityLabel: undefined,
  testIDTitle: undefined,
  testIDRightTitle: undefined,
  iconLeftColor: Colors.GREEN_47,
  iconRightColor: Colors.GREEN_47,
  iconRightSize: 12,
  iconLeft: undefined,
  imageLeft: 1,
  iconRight: ICON_ARROW_RIGHT,
  onPressIconRight: undefined,
  testIDIconRight: undefined,
  useDivider: true,
  useBold: true,
  headerText: undefined,
  headerRightText: undefined,
  description: undefined,
  rightContent: undefined,
  disabled: false,
  subtitle: undefined,
  rightTitleStyle: {},
  style: {},
  titleStyle: {},
  rightTitle: undefined,
  title: undefined,
  onPress: () => null,
  rightTitleSelectable: false,
};

export default ButtonMenuList;
