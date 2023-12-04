import { FC } from 'react';
import BareComponent from './1/BareComponent';
import BareComponentWithCreateElement from './1/BareComponentWithCreateElement';
import BareComponentWithState from './1/BareComponentWithState';
import Todo from './Todo';

import './style.css';

export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <div>
      {/* <h2>Single Rendered Component </h2>
      <BareComponent />
      <hr />
      <h2>Multiple Rendered Component of the same Child </h2>
      <BareComponent />
      <BareComponent />
      <BareComponent />
      <hr />
      <h2>Multiple Rendered Component of the same Child </h2>
      <BareComponentWithCreateElement />
      <hr />
      <h2>Bare Component With State</h2>
      <BareComponentWithState /> */}
      <Todo />
    </div>
  );
};
