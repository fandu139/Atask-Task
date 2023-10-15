import Icon from '../';
import React from 'react';
import { render } from '../../../../testUtils';
import { ICON_SHOW_PASSWORD } from '../../../assets/icon';

describe('Icon component test', () => {
  describe('Icon snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(<Icon name={ICON_SHOW_PASSWORD} size={16} color="black" />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Icon without Name snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(<Icon size={16} color="black" />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
