import ToDoList from "./components/ToDoList";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { v4 } from "uuid";
import { useCallback, useState, useEffect } from "react";

const TODO_APP_STORAGE_KEY = "TODO_APP";
function App() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    const storageTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storageTodoList) {
      setTodoList(JSON.parse(storageTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onAddBtnClick = useCallback(
    (e) => {
      // them gia tri text input
      setTodoList([
        { id: v4(), name: textInput, isCompleted: false },
        ...todoList,
      ]);
      setTextInput("");
    },
    [textInput, todoList]
  );

  const onCheckBtnClick = useCallback((id) => {
    setTodoList((prevStage) =>
      prevStage.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  }, []);

  return (
    <>
      <h3>Danh Sach Can Lam</h3>
      <Textfield
        name="add-todo"
        placeholder="Them Viec Can Lam"
        elemAfterInput={
          <Button
            isDisabled={!textInput}
            appearance="primary"
            onClick={onAddBtnClick}
          >
            Them
          </Button>
        }
        css={{
          padding: "2px 4px 2px",
        }}
        value={textInput}
        onChange={onTextInputChange}
      ></Textfield>
      <ToDoList todoList={todoList} onCheckBtnClick={onCheckBtnClick} />
    </>
  );
}

export default App;
