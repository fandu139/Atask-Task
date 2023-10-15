import Spinner from '../';
import React from 'react';
import { render } from '../../../../testUtils';

describe('Spinner component test', () => {
  describe('snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(<Spinner />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
