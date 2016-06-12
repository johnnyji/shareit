import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';

/**
 * Takes a (possibly deeply nested) list of styles and flattens them
 * so that it can be parse properly as an array of style objects by React Native
 * @param {Array} styles - The array of styles to parse
 * @param {Array} startingStyles - The starting point of the reduce
 * @returns {Array} - The flat array of style objects
 */
const combineStyles = (styles, startingStyles = []) => {
  return styles.reduce((accumStyles, currentStyle) => {
    // If the style is an array, it could be deeply nested with more arrays of styles. Just to be certain,
    // we want to flatten all those arrays by recursively reducing them
    if (Array.isArray(currentStyle)) return combineStyles(currentStyle, accumStyles);

    // If the style is a non empty object, we add it to our list of styles
    if (isObject(currentStyle) && !isEmpty(currentStyle)) return accumStyles.concat([currentStyle]);

    // In all other cases, the style is invalid and therefore we ignore it
    return accumStyles;

  }, startingStyles);
};

export default combineStyles;
