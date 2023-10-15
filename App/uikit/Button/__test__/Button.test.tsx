import Button from '../';
import React from 'react';
import { render } from '../../../../testUtils';

describe('Button component test', () => {
  describe('snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(
        <Button title="Test Button Standard" onPress={() => null} testID="button-default" />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
