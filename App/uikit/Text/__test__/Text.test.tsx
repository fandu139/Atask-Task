import Text from '../';
import React from 'react';
import { render } from '../../../../testUtils';

describe('Text component test', () => {
  describe('Text snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(
        <Text link error>
          Test Text
        </Text>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Text Medium snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(
        <Text.Medium link error>
          Test Text
        </Text.Medium>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Text Black snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(
        <Text.Black link error>
          Test Text
        </Text.Black>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Text Bold snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(
        <Text.Bold link error>
          Test Text
        </Text.Bold>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Text Currency snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(
        <Text.Currency link error>
          Test Text
        </Text.Currency>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
