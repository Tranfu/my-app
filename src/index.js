import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./mock/index.js";
import configureStore from "./configureStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore();
root.render(
  // https://reactrouter.com/en/main/router-components/hash-router
  // https://reactrouter.com/en/main/upgrading/future#v7_starttransition
  // https://github.com/remix-run/react-router/blob/dev/examples/lazy-loading/src/main.tsx
  // https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter future={{ v7_startTransition: true }}>
      <App />
    </BrowserRouter>
  </Provider>,
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
