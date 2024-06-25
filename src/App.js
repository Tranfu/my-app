import * as React from "react";
import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";

// import logo from './logo.svg';
// import './App.css';
import ProLayout from "./layouts/ProLayout";

// https://github.com/remix-run/react-router/blob/dev/examples/lazy-loading/src/App.tsx
const Index = React.lazy(() => import("./pages/Index"));
const NoMatch = React.lazy(() => import("./pages/NoMatch"));
const Demos = React.lazy(() => import("./pages/Demos"));
const TodoList = React.lazy(() => import("./pages/TodoList"));

function App() {
  return (
    <div className="App">
      {/* https://github.com/remix-run/react-router/blob/dev/examples/lazy-loading/src/App.tsx */}
      <Routes>
        <Route path="/" element={<ProLayout />}>
          <Route index element={<Index />} />
          <Route
            path="index"
            element={
              <React.Suspense>
                <Index />
              </React.Suspense>
            }
          />
          <Route
            path="demos/*"
            element={
              <React.Suspense>
                <Demos />
              </React.Suspense>
            }
          />
          <Route
            path="demos/todo-list"
            element={
              <React.Suspense>
                <TodoList />
              </React.Suspense>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
