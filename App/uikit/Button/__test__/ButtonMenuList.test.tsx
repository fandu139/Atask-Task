import ButtonMenuList from '..//ButtonMenuList';
import React from 'react';
import { render } from '../../../../testUtils';

describe('Button Menu List component test', () => {
  describe('snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(
        <ButtonMenuList
          testID="button-menu-list-default"
          title="Test Button Menu List"
          onPress={() => null}
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
