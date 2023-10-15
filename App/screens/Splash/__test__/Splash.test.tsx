import AppSplashScreen from '..';
import { render } from '../../../../testUtils';
import React from 'react';

describe('splash screen test', () => {
  describe('snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(<AppSplashScreen />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
