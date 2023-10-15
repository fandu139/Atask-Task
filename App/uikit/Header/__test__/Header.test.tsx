import Header from '../';
import React from 'react';
import { render } from '../../../../testUtils';

describe('Header component test', () => {
  describe('Header snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(<Header title="Header Title" />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Header with Subtitle snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(<Header title="Header Title" subtitle="Header Subtitle" />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
