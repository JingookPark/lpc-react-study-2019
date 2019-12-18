import React, { useState, useEffect } from "react";
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  // todoItems 라는 State를 useState Hook 으로 선언
  const [todoItems, setTodoItems] = useState([]);
  const addTodo = () => {
    setTodoItems([
      ...todoItems,
      {
        id: todoItems.length,
        complete: false,
        title: "",
        priority: 0,
        memo: ""
      }
    ]);
  };

  const onChangeTodoHandler = (key, complete, title, priority) => {
    console.log(arguments);
    let newSeate = todoItems.map(item =>
      item.id === key
        ? {
            ...item,
            complete,
            title,
            priority
          }
        : item
    );
    setTodoItems(newSeate);
    localStorage.setItem("hello_react_reminder", JSON.stringify(newSeate));
  };

  useEffect(() => {
    let savedTodos = JSON.parse(
      localStorage.getItem("hello_react_reminder") || "[]"
    );
    setTodoItems(savedTodos);
  }, []);

  return (
    <div className="App container">
      <h1>Hello React Reminder</h1>
      <div className="nav">
        <button className="btn btn-primary" onClick={addTodo}>
          Add Todo
        </button>
      </div>
      <form>
        {todoItems.map(item => (
          <Reminder
            key={item.id}
            todo={item}
            onChangeTodo={onChangeTodoHandler}
          />
        ))}
      </form>
    </div>
  );
}

const Reminder = ({ todo, onChangeTodo }) => {
  const [title, setTitle] = useState(todo.title);
  const [complete, setComplete] = useState(todo.complete);
  const [priority, setPriority] = useState(todo.priority);
  const [memo, setMemo] = useState(todo.memo);

  useEffect(() => {
    if (
      todo.title !== title ||
      todo.complete !== complete ||
      todo.priority !== priority
    ) {
      onChangeTodo(todo.id, complete, title, priority);
    }
  });

  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <div className="input-group-text">
          <input
            type="checkbox"
            checked={complete}
            onChange={e => setComplete(e.target.value)}
          />
        </div>
        <select
          className="custom-select"
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option value="0" className="">
            낮음
          </option>
          <option value="1" className="btn btn-warning" selected>
            보통
          </option>
          <option value="2" className="btn btn-danger">
            높음
          </option>
        </select>
      </div>
      <input
        type="input"
        className="form-control"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <div className="input-group-append">
        <button
          className={`btn ${
            memo !== undefined && memo.length > 0
              ? "btn-outline-primary"
              : "btn-outline-secondary"
          }`}
          type="button"
        >
          memo
        </button>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
