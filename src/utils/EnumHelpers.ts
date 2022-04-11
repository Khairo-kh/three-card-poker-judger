import { CardName } from 'src/models/card/CardName';
import { Suit } from 'src/models/card/Suits';

/**
 * This method is used to get the enum key
 * as a string for a specific value passed.
 * This method assumes a string enum and is
 * configured to take CardName or Suit enum
 * types.
 * @param enumType the enum type that we need a key from
 * @param enumVal  the enum value corresponding to the key that we need.
 * @returns the corresponding enum key as a string or empty string if not found
 */
export const getEnumByValue = (enumType: typeof CardName | typeof Suit, enumVal: string) => {
  let enumKey = '';
  Object.keys(enumType).forEach((el) => {
    Object(enumType)[el].toLowerCase() === enumVal.toLowerCase() ? (enumKey = el) : null;
  });
  return enumKey;
};
