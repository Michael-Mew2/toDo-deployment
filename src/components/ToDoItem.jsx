import React, { useId } from "react";

export default function ToDoItem({toDo, handleToggle}) {
  const id = useId();
  return (
    <>
      <li>
        <div>
          <input type="checkbox" id={id} onChange={() => handleToggle(toDo.id)} /> {/* Wenn nicht als Callback wird die Funktion sofort direkt aufgerufen */}
          <label htmlFor={id} style={{textDecoration: toDo.completed ? "line-through" : "none"}}>{toDo.text}</label>
        </div>
        <button>Löschen</button>
      </li>
    </>
  );
}
