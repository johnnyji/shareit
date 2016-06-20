/**
 * Parses through all the errors given by the API
 * response and returns an array of them
 * @param {Object} err - The error object returned by the API
 * @returns {Array} - an array of all the error messages
 */
export default (err) => {
  const errKeys = Object.keys(err.errors);
  
  // If there are no specific errors returned by a model,
  // we want to return the general error message
  if (!errKeys.length) return [err.message];

  // Returns an array of all the errors
  return errKeys.map((key) => err.errors[key]);
};
