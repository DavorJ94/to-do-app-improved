import React, {useState, useEffect} from "./pkg/react.js";
import Column from "./components/Column.js";
import idGenerator from "./utils/idGenerator.js";
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
        {text: toDoText, status: "todo", id}
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
          const newStatus = item.status === "completed" ? item.status = "in-progress" : item.status = "todo";
          return {...item, status: newStatus};
        } else {
          const newStatus = item.status === "todo" ? item.status = "in-progress" : item.status = "completed";
          return {...item, status: newStatus};
        }
      } else
        return item;
    });
    newItemsState.push(newItemsState.splice(currentIndex, 1)[0]);
    setToDoItems(() => newItemsState);
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "App"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "add-todo"
  }, /* @__PURE__ */ React.createElement("input", {
    value: toDoText,
    onChange: handleChange,
    className: "input-todo"
  }), /* @__PURE__ */ React.createElement("button", {
    className: "btn-add-todo",
    "data-clicked": true,
    onClick: handleSubmit
  }, "Add to do item")), warningMessage && /* @__PURE__ */ React.createElement("div", {
    className: "warning-message"
  }, warningMessage), /* @__PURE__ */ React.createElement("div", {
    className: "column-container"
  }, /* @__PURE__ */ React.createElement(Column, {
    title: "To do",
    type: "todo",
    items: toDoItems,
    deleteItem,
    handleArrowClick
  }), /* @__PURE__ */ React.createElement(Column, {
    title: "In progress",
    type: "in-progress",
    items: toDoItems,
    deleteItem,
    handleArrowClick
  }), /* @__PURE__ */ React.createElement(Column, {
    title: "Completed",
    type: "completed",
    items: toDoItems,
    deleteItem,
    handleArrowClick
  })));
}
export default App;
