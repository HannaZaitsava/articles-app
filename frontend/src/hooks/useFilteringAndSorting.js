import { useMemo } from "react";

// hook that accepts a list of elements and a sorting type.
// Hook returns the sorted list of elements
const useSortedElements = (elements, sortField, sortOrder) => {
  const sortedElements = useMemo(() => {
    return getSortedElements(elements, sortField, sortOrder);
  }, [elements, sortField, sortOrder]);
  return sortedElements;
};

function getSortedElements(elements, sortField, sortOrder) {
  if (sortField) {
    // Sort objects a и b comparing them by their values of the fields: a[sortField] и b[sortField].
    // The sortField parameter must contain object field name, e.g.'body', 'title'...
    // The collection of select.options will contain the same names (look PostFilter.jsx)
    // https://coderlessons.com/articles/veb-razrabotka-articles/sovet-kak-otsortirovat-massiv-obektov-v-javascript

    // If there is the need to sort by the field of string type only we can do this:
    // return [...elements].sort((a, b) =>
    //   a[sortField].localeCompare(b[sortField], undefined, { numeric: true })
    // );
    return [...elements].sort(compare(sortField, sortOrder));
  }
  return elements;
}
//____________________

// The hook accepts list of elements, type of sorting (sortField) and filter string (filterQuery).
// The hook returns filtered and sorted elements
export const useSortedAndFiltredElements = (elements, sortField, sortOrder, filterQuery) => {

  const sortedElements = useSortedElements(elements, sortField, sortOrder);

  const sortedAndSearchedElements = useMemo(() => {
    return filterQuery === false ? sortedElements:
     sortedElements.filter(
      (element) => Object.values(element).some(pr => String(pr).toLowerCase().includes(filterQuery.toLowerCase()))
    );
  }, [filterQuery, sortedElements]);

  return sortedAndSearchedElements;
};

function compare(field, order) {
  var len = arguments.length;
  if(len === 0) {
      return (a, b) => (a < b && -1) || (a > b && 1) || 0;
  }
  if(len === 1) {
      switch(typeof field) {
          case 'number':
              return field < 0 ?
                  ((a, b) => (a < b && 1) || (a > b && -1) || 0) :
                  ((a, b) => (a < b && -1) || (a > b && 1) || 0);
          case 'string':
              return (a, b) => (a[field] < b[field] && -1) || (a[field] > b[field] && 1) || 0;
          default: return;
      }
  }
  if(len === 2 && typeof order === 'number') {
      return order < 0 ?
          ((a, b) => (a[field] < b[field] && 1) || (a[field] > b[field] && -1) || 0) :
          ((a, b) => (a[field] < b[field] && -1) || (a[field] > b[field] && 1) || 0);
  }
  var fields, orders;
  if(typeof field === 'object') {
      fields = Object.getOwnPropertyNames(field);
      orders = fields.map(key => field[key]);
      len = fields.length;
  } else {
      fields = new Array(len);
      orders = new Array(len);
      for(let i = len; i--;) {
          fields[i] = arguments[i];
          orders[i] = 1;
      }
  }
  return (a, b) => {
      for(let i = 0; i < len; i++) {
          if(a[fields[i]] < b[fields[i]]) return orders[i];
          if(a[fields[i]] > b[fields[i]]) return -orders[i];
      }
      return 0;
  };
}

export default useSortedElements;
