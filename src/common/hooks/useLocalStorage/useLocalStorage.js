import React from 'react';

function getValue(key, initialValue) {
  // eslint-disable-next-line no-undef
  const value = JSON.parse(localStorage.getItem(key));
  if (value) return value;

  if (initialValue instanceof Function) return initialValue();
  return initialValue;
}

export function useLocalStorage(key, initialValue) {
  const [ value, setValue ] = React.useState(() => {
    return getValue(key, initialValue);
  });

  React.useEffect(() => {
    // eslint-disable-next-line no-undef
    localStorage.setItem(key, JSON.stringify(value));
  }, [ value ]);

  return [ value, setValue ];
}
