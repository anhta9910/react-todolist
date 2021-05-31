import React from "react";
import Todo from "./Todo";

export default function ToDoList({ todoList, onCheckBtnClick }) {
  return (
    <>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} onCheckBtnClick={onCheckBtnClick} />
      ))}
    </>
  );
}
