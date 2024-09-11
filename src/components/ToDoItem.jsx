import React, { useId } from "react";
import styles from "./ToDoItem.module.css";

export default function ToDoItem({ toDo, handleToggle, handleDelete }) {
  const id = useId();
  return (
    <li className={styles.toDoItem}>
      <div>
        <input type="checkbox" id={id} onChange={() => handleToggle(toDo.id)} />{" "}
        {/* Wenn nicht als Callback wird die Funktion sofort direkt aufgerufen */}
        <label
          htmlFor={id}
          style={{ textDecoration: toDo.completed ? "line-through" : "none" }}
        >
          {toDo.text}
        </label>
      </div>
      <button onClick={() => handleDelete(toDo.id)}>Löschen</button>
    </li>
  );
}
