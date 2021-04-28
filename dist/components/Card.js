import React from "../pkg/react.js";
export default function Card({
  text,
  status,
  deleteItem,
  id,
  handleArrowClick
}) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "card-component"
  }, status === "todo" && /* @__PURE__ */ React.createElement("i", {
    className: "fas fa-trash",
    onClick: () => {
      deleteItem(id);
    }
  }), (status === "in-progress" || status === "completed") && /* @__PURE__ */ React.createElement("i", {
    className: "fas fa-arrow-alt-circle-left",
    onClick: () => {
      handleArrowClick(id, "left");
    }
  }), /* @__PURE__ */ React.createElement("p", {
    className: "card-text"
  }, text), status === "completed" && /* @__PURE__ */ React.createElement("i", {
    className: "fas fa-trash",
    onClick: () => {
      deleteItem(id);
    }
  }), (status === "in-progress" || status === "todo") && /* @__PURE__ */ React.createElement("i", {
    className: "fas fa-arrow-alt-circle-right",
    onClick: () => {
      handleArrowClick(id, "right");
    }
  }));
}
