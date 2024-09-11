import React, { useReducer, useState } from "react";
import ToDoItem from "./ToDoItem";
import styles from "./ToDoList.module.css";

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: crypto.randomUUID() /* vergibt eine eindeutige zufällige ID (über den Browser) (nicht zu 100%, aber wahrscheinlichkeit sehr gering, ad sehr lang)*/,
          text: action.payload,
          completed: false,
        },
      ];

    case "TOGGLE_CHECK":
      return state.map((toDo) =>
        toDo.id === action.payload
          ? { ...toDo, completed: !toDo.completed }
          : toDo
      );

    case "REMOVE_TODO":
      return state.filter((toDo) => toDo.id !== action.payload);

    default:
      return state;
  }
}

export default function ToDoList() {
  const [inputValue, setInputValue] = useState("");
  const [toDos, dispatch] = useReducer(reducer, initialState);
  console.log(toDos);

  function handleSubmit(event) {
    event.preventDefault();
    if (inputValue.trim()) {
      dispatch({ type: "ADD_TODO", payload: inputValue });
      setInputValue("");
    }
  }

  function handleToggle(id) {
    dispatch({ type: "TOGGLE_CHECK", payload: id });
  }

  function handleDelete(id) {
    dispatch({ type: "REMOVE_TODO", payload: id });
  }

  return (
    <div className={styles.toDoList}>
      <h1>To-do Liste</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Neues To-Do eintragen"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button>Hinzufügen</button>
      </form>
      <ul>
        {toDos.map((todo) => (
          <ToDoItem
            key={todo.id}
            toDo={todo}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
      <p>
        Erledigte To-Dos:{" "}
        <span
          style={{
            backgroundColor:
              toDos.length >
              toDos.filter((todo) => todo.completed === true).length
                ? "#da4167"
                : "#32de8a",
              color:
              toDos.length >
              toDos.filter((todo) => todo.completed === true).length
                ? "#f0eff4"
                : "#627c85",
          }}
        >
          {toDos.filter((todo) => todo.completed === true).length}
        </span>
      </p>
    </div>
  );
}
