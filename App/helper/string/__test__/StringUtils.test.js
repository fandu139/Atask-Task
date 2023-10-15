import StringUtils from '../';
import Pattern from '../../pattern';

describe('String Utilities Test', () => {
  describe('thousandSeparator testing', () => {
    it('should show 1.000 (integer)', () => {
      const dummyValue = 1000;
      expect(StringUtils.thousandSeparator(dummyValue)).toBe('1.000');
    });
    it('should show 1.000 (string)', () => {
      const dummyValue = '1000';
      expect(StringUtils.thousandSeparator(dummyValue)).toBe('1.000');
    });
    it('should show 1.000.000 (string)', () => {
      const dummyValue = '1000000';
      expect(StringUtils.thousandSeparator(dummyValue)).toBe('1.000.000');
    });
    it('should show 0 (string)', () => {
      const dummyValue = '0';
      expect(StringUtils.thousandSeparator(dummyValue)).toBe('0');
    });
    it('should show 0 with value alphabet', () => {
      const dummyValue = 'abc';
      expect(StringUtils.thousandSeparator(dummyValue)).toBe('0');
    });
  });

  describe('numberOnly testing', () => {
    it('should return inputted value', () => {
      const previousValue = 5;
      const inputValue = 1000;
      expect(StringUtils.numberOnly(inputValue, previousValue)).toBe(1000);
    });
    it('should return previous value', () => {
      const previousValue = 5;
      const inputValue = 'abc';
      expect(StringUtils.numberOnly(inputValue, previousValue)).toBe(5);
    });
  });

  describe('replaceChar testing', () => {
    it('should replace space character with +', () => {
      const text = 'abc def ghi';
      const whatToReplace = ' ';
      const replacedBy = '+';
      expect(StringUtils.replaceChar(text, whatToReplace, replacedBy)).toBe('abc+def+ghi');
    });

    it('should return empty string when no value', () => {
      const text = '';
      const whatToReplace = ' ';
      const replacedBy = '+';
      expect(StringUtils.replaceChar(text, whatToReplace, replacedBy)).toBe('');
    });

    it('should return empty when no value', () => {
      const text = null;
      const whatToReplace = ' ';
      const replacedBy = '+';
      expect(StringUtils.replaceChar(text, whatToReplace, replacedBy)).toBe('');
    });

    it('should return same value when no value to replace', () => {
      const text = ' ';
      const whatToReplace = null;
      const replacedBy = null;
      expect(StringUtils.replaceChar(text, whatToReplace, replacedBy)).toBe(' ');
    });

    it('should return same value when no value to replace 2', () => {
      const text = 'abc cde efg';
      const whatToReplace = null;
      const replacedBy = null;
      expect(StringUtils.replaceChar(text, whatToReplace, replacedBy)).toBe('abc cde efg');
    });

    it('should replace new line with space', () => {
      const text = 'Jl Onix\nBekasi';
      expect(StringUtils.replaceNewLineWithSpace(text)).toBe('Jl Onix Bekasi');
    });

    it('should do nothing when replace with none', () => {
      const text = 'abc cde';
      const whatToReplace = '';
      const replacedBy = '+';
      expect(StringUtils.replaceChar(text, whatToReplace, replacedBy)).toBe('a+b+c+ +c+d+e');
    });
  });

  describe('beautifyPhoneNumber testing', () => {
    it('should spacing phone number', () => {
      const text = '628989175260';
      expect(StringUtils.beautifyPhoneNumber(text)).toBe('+62 898 9175 260');
    });

    it('should return empty', () => {
      const text = null;
      expect(StringUtils.beautifyPhoneNumber(text)).toBe('');
    });
  });

  describe('beautifyPlateNumber testing', () => {
    it('should format to indonesian plate number', () => {
      const text = 'B1234ABC';
      expect(StringUtils.beautifyPlateNumber(text)).toBe('B 1234 ABC');
    });
    it('should format to indonesian plate number (short)', () => {
      const text = 'B1ABC';
      expect(StringUtils.beautifyPlateNumber(text)).toBe('B 1 ABC');
    });
    it('should return empty', () => {
      const text = null;
      expect(StringUtils.beautifyPlateNumber(text)).toBe(null);
    });
  });

  describe('sanitizePhoneNumber testing', () => {
    const numberWith62 = '6280989999';
    const numberWith0 = '080989999';
    const numberWithRandom = '80989999';

    it('should remove 62', () => {
      expect(StringUtils.sanitizePhoneNumber(numberWith62, true)).toBe('80989999');
    });
    it('should remove 0', () => {
      expect(StringUtils.sanitizePhoneNumber(numberWith0, true)).toBe('80989999');
    });
    it('should replace 0 to 62', () => {
      expect(StringUtils.sanitizePhoneNumber(numberWith0)).toBe('6280989999');
    });
    it('should return phone number with 62', () => {
      expect(StringUtils.sanitizePhoneNumber(numberWithRandom)).toBe('6280989999');
    });
    it('should return original value', () => {
      expect(StringUtils.sanitizePhoneNumber(numberWith62)).toBe('6280989999');
    });
  });

  describe('getNumberFromString testing', () => {
    it('should return 401', () => {
      const value = 'B401ABC';
      expect(StringUtils.getNumberFromString(value)).toBe('401');
    });
    it('should return 4012', () => {
      const value = 'B401AB2C';
      expect(StringUtils.getNumberFromString(value)).toBe('4012');
    });
    it('should return 1234', () => {
      const value = '[1AB]2{xC3]}klx-4-';
      expect(StringUtils.getNumberFromString(value)).toBe('1234');
    });
  });

  describe('checkValueFormat testing', () => {
    it('The input test case weight is 1 and should return false', async () => {
      expect(StringUtils.checkValueFormat(Pattern.weightPackage, '1')).toBe(false);
    });

    it('The input test case weight is 1.5 and should return false', async () => {
      expect(StringUtils.checkValueFormat(Pattern.weightPackage, '1.5')).toBe(false);
    });

    it('The input test case weight is 1.5. and should return true', async () => {
      expect(StringUtils.checkValueFormat(Pattern.weightPackage, '1.5.')).toBe(true);
    });
  });

  describe('formatVersion testing', () => {
    it('should return sanitized value', () => {
      expect(StringUtils.formatVersion('1.2.3-alpha.0')).toBe('1.2.3');
    });

    it('should return original value 1.2.4', () => {
      expect(StringUtils.formatVersion('1.2.4')).toBe('1.2.4');
    });

    it('should return original value 1.2.5', () => {
      expect(StringUtils.formatVersion('1.2.5-0')).toBe('1.2.5');
    });
  });

  describe('validateAddress testing', () => {
    it('should return false', () => {
      expect(StringUtils.validateAddress('Test 123 :')).toBe(false);
    });

    it('should return true', () => {
      expect(StringUtils.validateAddress('Test 123 ,')).toBe(true);
    });
  });
});
