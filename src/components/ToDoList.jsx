import React, { useReducer, useState } from "react";
import ToDoItem from "./ToDoItem";

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
  return (
    <div>
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
          <ToDoItem key={todo.id} toDo={todo} handleToggle={handleToggle} />
        ))}
      </ul>
      <p>Erledigte To-Dos:</p>
    </div>
  );
}
