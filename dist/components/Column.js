import React from "../pkg/react.js";
import Card from "./Card.js";
export default function Column({
  title,
  items,
  type,
  deleteItem,
  handleArrowClick
}) {
  const backgroundStyle = title === "To do" ? "brown" : title === "In progress" ? "orange" : "green";
  return /* @__PURE__ */ React.createElement("div", {
    className: "column",
    style: {backgroundColor: backgroundStyle}
  }, /* @__PURE__ */ React.createElement("div", {
    className: "column-title"
  }, title), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement("div", {
    className: "cards-container"
  }, items.map((card) => {
    if (type === card.status) {
      return /* @__PURE__ */ React.createElement(Card, {
        text: card.text,
        id: card.id,
        status: card.status,
        key: card.id,
        deleteItem,
        handleArrowClick
      });
    } else
      return;
  })));
}
