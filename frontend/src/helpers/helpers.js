export function isObjectEmpty(value) {
  // Empty Object Check in Older Browsers
  // return (
  //   Object.prototype.toString.call(value) === '[object Object]' &&
  //   JSON.stringify(value) === '{}'
  // );

  return (
    value && // null and undefined check
    Object.keys(value).length === 0 &&
    value.constructor === Object
  );
}
