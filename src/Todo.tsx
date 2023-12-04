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
