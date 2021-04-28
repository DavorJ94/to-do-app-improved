import React, { useState, useEffect } from "react";
import Column from "./components/Column";
import idGenerator from "./utils/idGenerator";

function App() {
  const [toDoText, setToDoText] = useState("");
  const [toDoItems, setToDoItems] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", handleSubmit);
    return () => {
      document.removeEventListener("keydown", handleSubmit);
    };
  }, [handleSubmit]);

  function handleChange(e) {
    setWarningMessage("");
    setToDoText(() => e.target.value);
  }

  function handleSubmit(e) {
    if (toDoText === "") {
      if (e.keyCode === 13 || e.target.getAttribute("data-clicked")) {
        setWarningMessage("You cannot add an empty to do item.");
      }
      return;
    }
    if (e.keyCode === 13 || e.target.getAttribute("data-clicked")) {
      const id = idGenerator(toDoItems);
      setToDoItems((prevItems) => [
        ...prevItems,
        { text: toDoText, status: "todo", id: id },
      ]);
      setToDoText(() => "");
    }
  }

  function deleteItem(input) {
    const itemsWithoutDeleted = toDoItems.filter((item) => {
      return item.id !== input;
    });
    setToDoItems(() => itemsWithoutDeleted);
  }

  function handleArrowClick(id, arrowType) {
    let currentIndex;
    const newItemsState = toDoItems.map((item, index) => {
      if (item.id === id) {
        currentIndex = index;
        if (arrowType === "left") {
          const newStatus =
            item.status === "completed"
              ? (item.status = "in-progress")
              : (item.status = "todo");
          return { ...item, status: newStatus };
        } else {
          const newStatus =
            item.status === "todo"
              ? (item.status = "in-progress")
              : (item.status = "completed");
          return { ...item, status: newStatus };
        }
      } else return item;
    });
    newItemsState.push(newItemsState.splice(currentIndex, 1)[0]);
    setToDoItems(() => newItemsState);
  }

  return (
    <div className="App">
      <div className="add-todo">
        <input
          value={toDoText}
          onChange={handleChange}
          className="input-todo"
        ></input>
        <button
          className="btn-add-todo"
          data-clicked={true}
          onClick={handleSubmit}
        >
          Add to do item
        </button>
      </div>
      {warningMessage && (
        <div className="warning-message">{warningMessage}</div>
      )}
      <div className="column-container">
        <Column
          title="To do"
          type="todo"
          items={toDoItems}
          deleteItem={deleteItem}
          handleArrowClick={handleArrowClick}
        />
        <Column
          title="In progress"
          type="in-progress"
          items={toDoItems}
          deleteItem={deleteItem}
          handleArrowClick={handleArrowClick}
        />
        <Column
          title="Completed"
          type="completed"
          items={toDoItems}
          deleteItem={deleteItem}
          handleArrowClick={handleArrowClick}
        />
      </div>
    </div>
  );
}

export default App;
