# React

- React is an abstraction over javascript...it's main point is to make code modular...and easily ususable. It takes properties in...and renders something..
  ...for ever state change this is a visual change... "reconcillation".

Here is a bare component...this just renders "BareComponent"

```
function BareComponent(){
  return(
    <div>
      <p>Bare Component</p>
    </div>
  )
}
export default BareComponent;
```

Here we have the a function named `BareComponent` in which there is a default import.... so importing it would look like

`import BareComponent from ./BareComponent`;

What if we wanted to reuse `BareComponent`?.....`...just render it like sooo

```
<BareComponent/>
<BareComponent/>
<BareComponent/>
```

We get "reusability" and "modularity"...we get this free from React

...But lets also look at the `return` value:

```
    <div>
      <p>Bare Component</p>
    </div>
```

This looks like `html` but it's actually `jsx`.... meaning that this is a just syntatic sugar over `createElement`: https://react.dev/reference/react/createElement...
https://react.dev/reference/react/createElement
...

Ok now we rendered plain data...plain text.. html... We can go into the details of writing semantic html...or accessibility... but lets move away from that rabbit hole..
Lets touch on CSS...the styling on the data...

by doing `import ./BareComponent.css` we can inject styles into the component...in a more complex app, we have to worry by selector collisions from the cascade....those can be fixed with tools in inline css or modules...lets no rabbit hole into that...

we have added a `background-color: red` to the `p` element...but what if we wanted to change it to green.... so the css has to change...via the property of `className`.....
we'd have to change change the string to someing like `green-background`......but what if wanted to toggle it ... it needs some interactivity....and some sort of state to
know if you want `red` or `green`...so lets create a new component for that

```
function BareComponentWithState() {
  const [toggleColor, setToggleColor] = useState('red');

  function onClickButton() {
    if (toggleColor === 'red') {
      setToggleColor('green');
    } else {
      setToggleColor('red');
    }
  }

  return (
    <div>
      <div>
        <p
          className={
            toggleColor === 'red' ? 'red-background' : 'green-background'
          }
        >
          Bare Component
        </p>
      </div>
      <button onClick={onClickButton}>Toggle Background Color </button>
    </div>
  );
}

export default BareComponentWithState;
```

We can now toggle the background color with using state ...however we can also refactor because there's some duplicate code in

```
        <p
          className={
            toggleColor === 'red' ? 'red-background' : 'green-background'
          }
        >
          Bare Component
        </p>
      </div>
```

use props for `BareComponent` and change the what's being passed in......we separate state from the view... Logic View pattern.... Controller View pattern...

we can also abstract away state ...by using hooks

... we have state kept within each component....using in-memory of the browser....but what if we want to persist it?
...that means using some sort of a file to store data....so lets try to use JSON and a node's file system...
... can't use filesystem as it it needs a server....... but lets make a simple to do app
....but we have to reflect CRUD actions on the UI....here's a simple TODO app

```
import { useState } from 'react';

let currentId = 3;

const initialTodos = [
  { id: 1, description: 'wake up' },
  { id: 2, description: 'eat breakfast' },
  { id: 3, description: 'work out' },
];
function Todo() {
  const [todos, setTodos] = useState(initialTodos);

  function add(todo) {
    setTodos([todo, ...todos]);
  }

  function remove(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function update(updatedTodo) {
    setTodos(
      todos.map((todo) =>
        todo.id === updatedTodo.id ? { ...updatedTodo } : todo
      )
    );
  }

  return (
    <div>
      <p>TODOS: </p>
      <div>
        <TodoForm add={add} />
      </div>
      <ul>
        {todos.map((todo) => (
          <TodoItem todo={todo} remove={remove} update={update} />
        ))}
      </ul>
    </div>
  );
}

function TodoForm({ add }) {
  const [changeDescription, setChangeDescription] = useState('');
  function handleAddTodoSubmit(e) {
    e.preventDefault();
    currentId++;
    add({ description: changeDescription, id: currentId });
  }
  return (
    <div>
      <form onSubmit={handleAddTodoSubmit}>
        <input
          id="description"
          name="description"
          onChange={(e) => setChangeDescription(e.target.value)}
          value={changeDescription}
        />
        <button type="submit">add item </button>
      </form>
    </div>
  );
}

function TodoItem({ todo, remove, update }) {
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [changedDescription, setChangeDescription] = useState(todo.description);

  function handleOnClickUpate() {
    setToggleUpdate(!toggleUpdate);
  }

  function onSubmitUpdate(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const description = formData.get('description');
    update({ id: todo.id, description });
    setToggleUpdate(false);
  }

  return (
    <li key={todo.id}>
      {toggleUpdate ? (
        <form onSubmit={onSubmitUpdate}>
          <label htmlFor="description" />
          <input
            onChange={(e) => setChangeDescription(e.target.value)}
            id="description"
            name="description"
            type="text"
            value={changedDescription}
          />
          <button type="submit">submit</button>
        </form>
      ) : (
        <p> {todo.description}</p>
      )}
      <button onClick={() => remove(todo.id)}>remove</button>
      <button onClick={handleOnClickUpate}>update</button>
    </li>
  );
}

export default Todo;

```

The complexity gets dramatically higher once we do this...because we have to
(1) update the date on the ui...
(2) but also persis that on a file (backend)

But now our CRUD logic is getting unwiedly...as the the functionality is blurring up from what's UI and functionality...an option to create some separation is to
use `useReducer`....this centralizes the crud operations in one location.

```
import { useReducer, useState } from 'react';

let currentId = 3;

const initialTodos = [
  { id: 1, description: 'wake up' },
  { id: 2, description: 'eat breakfast' },
  { id: 3, description: 'work out' },
];

function reducer(state, action){
  switch(action.type){
    case "add":
      return [{id: action.id, description: action.description}, ...state];
    case "remove":
      return state.filter((todo) => todo.id !== action.id)
    case "update":
      return state.map((todo) =>
        todo.id === action.id ? { id: action.id, description: action.description} : todo
      )

  }


}
function Todo() {
  // const [todos, setTodos] = useState(initialTodos);
  const [todos, dispatch] = useReducer(reducer, initialTodos);



  return (
    <div>
      <p>TODOS: </p>
      <div>
        <TodoForm dispatch={dispatch} />
      </div>
      <ul>
        {todos.map((todo) => (
          <TodoItem todo={todo} dispatch={dispatch} />
        ))}
      </ul>
    </div>
  );
}

function TodoForm({ dispatch }) {
  const [changeDescription, setChangeDescription] = useState('');
  function handleAddTodoSubmit(e) {
    e.preventDefault();
    currentId++;
    dispatch({ type: 'add', description: changeDescription, id: currentId });
  }
  return (
    <div>
      <form onSubmit={handleAddTodoSubmit}>
        <input
          id="description"
          name="description"
          onChange={(e) => setChangeDescription(e.target.value)}
          value={changeDescription}
        />
        <button type="submit">add item </button>
      </form>
    </div>
  );
}

function TodoItem({ todo, dispatch }) {
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [changedDescription, setChangeDescription] = useState(todo.description);

  function handleOnClickUpate() {
    setToggleUpdate(!toggleUpdate);
  }

  function onSubmitUpdate(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const description = formData.get('description');
    dispatch({type: 'update', id: todo.id, description });
    setToggleUpdate(false);
  }

  return (
    <li key={todo.id}>
      {toggleUpdate ? (
        <form onSubmit={onSubmitUpdate}>
          <label htmlFor="description" />
          <input
            onChange={(e) => setChangeDescription(e.target.value)}
            id="description"
            name="description"
            type="text"
            value={changedDescription}
          />
          <button type="submit">submit</button>
        </form>
      ) : (
        <p> {todo.description}</p>
      )}
      <button onClick={() => dispatch({type: 'remove', id: todo.id})}>remove</button>
      <button onClick={handleOnClickUpate}>update</button>
    </li>
  );
}

export default Todo;
```
