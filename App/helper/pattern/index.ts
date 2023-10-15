/* eslint-disable no-control-regex */
const Pattern = {
  numberOnly: /^[0-9]+$/,
  checkStrip: /([-])+$/i,
  checkStripOnly: /^[-]/i,
  notSpace: /\s/i,
  coordinate: /@(-?\d*\.?\d+),(\d*\.?\d+)/g,
  postCodeInternational: /^[A-Za-z0-9]+[a-zA-Z0-9 -]*$/i,
  weightPackage: /^\d+([,.]\d+)?$/,
  phone: /^(08|628|\+628)([1-9])(?:\d{8,11})$/,
  numberWithoutCurrency: /[^0-9-]+/g,
  address: /^[A-Za-z0-9]+[a-zA-Z0-9 .,\-/\n]*$/i,
  unicode: /^[\u0000-\u007F]+/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  passwordPolicy:
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_+=,.<>?/])[0-9a-zA-Z!@#$%^&*_+=,.<>?/]{8,}$/,
  spaceNotAllowed: /^\S*$/,
  decimal: /^\d*\.?\d*$/,
  alphabetOnly: /^[A-Za-z\s]+$/,
};

export default Pattern;
