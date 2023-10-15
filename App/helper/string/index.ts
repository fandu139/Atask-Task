import Pattern from '../pattern';

const thousandSeparator = (value: string | number | undefined): string => {
  if (value && Number(value) > 0) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  return '0';
};

const numberOnly = (onChangeValue: string, value: string): string => {
  const checkString = Number.isInteger(Number(onChangeValue));

  if (checkString) {
    return parseInt(onChangeValue, 10) > 0 ? onChangeValue : '';
  }
  return onChangeValue !== '' && value !== null ? value : '';
};

const replaceNewLineWithSpace = (string = ''): string => string.replace(/\n/g, ' ');

const replaceChar = (value: string, searchBy: string, replaceBy: string): string => {
  if (value) {
    return value.split(searchBy).join(replaceBy);
  }
  return '';
};

const beautifyPhoneNumber = (value: string | undefined): string => {
  if (value) {
    return `+${value.replace(/(\d{2})(\d{3})(\d{4})(\d{1})/, '$1 $2 $3 $4')}`;
  }
  return '';
};

const beautifyPhoneNumberProfil = (value: string): string => {
  if (value?.startsWith('0')) {
    return `${value.replace(/(\d{2})(\d{3})(\d{4})(\d{1})/, '$2$3$4')}`;
  }
  if (value?.startsWith('62')) {
    return `${value.replace(/(\d{2})(\d{3})(\d{4})(\d{1})/, '$2$3$4')}`;
  }
  return '';
};

const beautifyPlateNumber = (value: string): string => {
  if (value) {
    return value.replace(/(\d+)/g, (_, num) => ` ${num} `);
  }
  return value;
};

const sanitizePhoneNumber = (
  value: string,
  isView?: boolean,
  isInternational?: boolean,
): string => {
  let stringifiedValue = String(value).replace(/\D/g, '');

  if (!isInternational) {
    if (isView) {
      if (stringifiedValue.startsWith('62')) {
        stringifiedValue = `${stringifiedValue.substring(2)}`;
      }

      if (stringifiedValue.startsWith('0')) {
        stringifiedValue = `${stringifiedValue.substring(1)}`;
      }

      return stringifiedValue;
    }

    if (stringifiedValue.startsWith('0')) {
      stringifiedValue = stringifiedValue.replace('0', '62');
    }

    if (!stringifiedValue.startsWith('62')) {
      stringifiedValue = `62${stringifiedValue.substring(0)}`;
    }
  }

  return stringifiedValue;
};

const getNumberFromString = (value: string): string =>
  `${value.toString().split('\n')[0].replace(/[^\d]/g, '')}`;

function checkValueFormat(regex: RegExp, value: string): boolean {
  return !regex.test(value);
}

function formatVersion(v: string): string {
  return v?.split('-')[0];
}

function validateAddress(value: string): boolean {
  return Pattern.address.test(value);
}

const unicodeCharacter = {
  dot: '\u2B24',
  checkMark: '\u2713',
};

const StringUtils = {
  thousandSeparator,
  beautifyPhoneNumber,
  sanitizePhoneNumber,
  beautifyPhoneNumberProfil,
  getNumberFromString,
  replaceChar,
  replaceNewLineWithSpace,
  beautifyPlateNumber,
  numberOnly,
  checkValueFormat,
  formatVersion,
  validateAddress,
  unicodeCharacter,
};

export default StringUtils;
