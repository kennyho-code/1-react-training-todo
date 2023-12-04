import React from 'react';

function BareComponentWithCreateElement() {
  return React.createElement(
    'div',
    {},
    React.createElement('p', {}, 'Bare Component with React.createElement')
  );
}

export default BareComponentWithCreateElement;
