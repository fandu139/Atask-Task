type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';


const size = {
  18: 18,
  16: 16,
  14: 14,
  24: 24,
  30: 30,
  superLarge: 24,
  extraLarge: 20,
  large: 18,
  medium: 16,
  small: 14,
  extraSmall: 12,
  moreExtraSmall: 10,
};

const Fonts = {
  regular: {
    fontWeight: 'normal' as FontWeight,
  },
  medium: {
    fontWeight: 'normal' as FontWeight,
  },
  bold: {
    fontWeight: 'normal' as FontWeight,
  },
  extraBold: {
    fontWeight: 'normal' as FontWeight,
  },
  size,
};

export default Fonts;
