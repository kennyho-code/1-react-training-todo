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
