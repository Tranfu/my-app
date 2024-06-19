import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
const test = "";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* https://reactrouter.com/en/main/router-components/hash-router */}
    {/* https://reactrouter.com/en/main/upgrading/future#v7_starttransition */}
    {/* https://github.com/remix-run/react-router/blob/dev/examples/lazy-loading/src/main.tsx */}
    <BrowserRouter future={{ v7_startTransition: true }}>
                <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
