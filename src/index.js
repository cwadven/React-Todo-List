import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ToDosProvider from "./context";
import { Global, css } from '@emotion/react';
const globalStyle = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 20px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  html,
  body {
    height: 100%;
    background: #FAF3E0;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #B68973;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }

  &::-webkit-scrollbar-track {
    background-color: #dfdfdf;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

ReactDOM.render(
    <React.StrictMode>
        <Global styles={globalStyle} />
        <ToDosProvider>
            <App/>
        </ToDosProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
