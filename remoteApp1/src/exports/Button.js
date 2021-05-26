import React from "react";
import styled from 'styled-components';

const RemoteButton = React.lazy(() => import('marketplace/Button')); 

const Btn = styled.button`
background: green;
color: #fff;
padding: 12;
`

const style = {
  background: "#800",
  color: "#fff",
  padding: 12,
};

const Button = () => <><Btn>App 1 Button</Btn><RemoteButton /></>;

export default Button;
