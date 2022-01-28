import React from "react";

function Button(props) {
  return <button className={props.className}> <img src={props.image} alt="google" />{props.title}</button>;
}

export default Button;
