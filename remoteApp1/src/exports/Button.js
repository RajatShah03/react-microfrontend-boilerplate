import React from "react";

const RemoteButton = React.lazy(() => import('hostApp/Button')); 

const style = {
  background: "green",
  color: "#fff",
  padding: 12,
};

const Button = () => (
  <>
    <button styles={style}>Remote App 1 Button</button>
    <RemoteButton />
  </>
);

export default Button;
