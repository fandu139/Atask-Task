import TextInput from '../';
import React from 'react';
import { render } from '../../../../testUtils';

describe('TextInput component test', () => {
  describe('TextInput snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(
        <TextInput
          testID="text-input-default"
          label="Label TextInput"
          onChangeText={() => undefined}
          text="Value TextInput"
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('TextInput inverted snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(
        <TextInput
          testID="text-input-default"
          label="Label TextInput"
          onChangeText={() => undefined}
          text="Value TextInput"
          inverted
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('TextInput with custom color snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(
        <TextInput
          testID="text-input-default"
          label="Label TextInput"
          onChangeText={() => undefined}
          text="Value TextInput"
          customColor={{
            selectionColor: 'gray',
            base: 'white',
            tintColor: 'blue',
            textColor: 'black',
            labelColor: 'black',
          }}
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
