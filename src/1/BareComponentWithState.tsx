import { useState } from 'react';
import BareComponent from './BareComponent';

function useToggleColor(){
  const [toggleColor, setToggleColor] = useState('red');

  return [toggleColor, setToggleColor];
}

function BareComponentWithState() {
  const [toggleColor, setToggleColor] = useToggleColor();

  function onClickButton() {
    if (toggleColor === 'red') {
      setToggleColor('green');
    } else {
      setToggleColor('red');
    }
  }

  return (
    <div>
      <BareComponent
        backgroundColor={
          toggleColor === 'red' ? 'red-background' : 'green-background'
        }
      />
      <button onClick={onClickButton}>Toggle Background </button>
    </div>
  );
}

export default BareComponentWithState;
