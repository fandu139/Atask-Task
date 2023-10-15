import Colors from '../../theme/colors';
import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';

type Props = {
  height?: number;
  color?: string;
  customStyle?: StyleProp<ViewStyle>;
};

interface DividerProps {
  DottedLine: typeof DivDottedLine;
}

const Divider: React.FC<Props> & DividerProps = ({ height, color, customStyle }: Props) => {
  const style = { height, backgroundColor: color };
  const costumStyle = Object.assign(style, customStyle);

  return <View style={costumStyle} />;
};

const DivDottedLine: React.FC = () => (
  <View style={styles.dotLineContainer}>
    <View style={styles.contentContainer} />
  </View>
);

Divider.defaultProps = {
  height: 1,
  color: Colors.GRAYF3,
  customStyle: undefined,
};

const styles = StyleSheet.create({
  dotLineContainer: {
    height: 1,
    width: '100%',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: Colors.GRAYE0,
    borderStyle: 'dashed',
    zIndex: 0,
  },
  contentContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 1,
    backgroundColor: 'white',
    zIndex: 1,
  },
});

Divider.DottedLine = DivDottedLine;

export default Divider;
