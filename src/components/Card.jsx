import React from "react";

export default function Card({
  text,
  status,
  deleteItem,
  id,
  handleArrowClick,
}) {
  return (
    <div className="card-component">
      {status === "todo" && (
        <i
          className="fas fa-trash"
          onClick={() => {
            deleteItem(id);
          }}
        ></i>
      )}
      {(status === "in-progress" || status === "completed") && (
        <i
          className="fas fa-arrow-alt-circle-left"
          onClick={() => {
            handleArrowClick(id, "left");
          }}
        ></i>
      )}
      <p className="card-text">{text}</p>
      {status === "completed" && (
        <i
          className="fas fa-trash"
          onClick={() => {
            deleteItem(id);
          }}
        ></i>
      )}
      {(status === "in-progress" || status === "todo") && (
        <i
          className="fas fa-arrow-alt-circle-right"
          onClick={() => {
            handleArrowClick(id, "right");
          }}
        ></i>
      )}
    </div>
  );
}
