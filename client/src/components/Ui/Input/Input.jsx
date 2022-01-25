import React from "react";

function Input(props) {
  return (
    <input
      type={props.type}
      className={props.className}
      onChange={props.onChange}
      ref={props.ref}
      placeholder={props.placeholder}
      value={props.value}
      id={props.id}
    ></input>
  );
}

export default Input;
