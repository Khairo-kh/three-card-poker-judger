import * as fs from 'fs';

/**
 * This method provides a simple way to read from
 * stdin in javascript. essentially it returns back
 * the value from stdin.
 * @returns the passed values to stdin all in one go
 */
export const getStandardInput = () => {
  return fs.readFileSync(0, 'utf-8');
};
