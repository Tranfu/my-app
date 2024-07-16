import * as React from "react";
import { Routes, Route } from "react-router-dom";

// import logo from './logo.svg';
// import './App.css';
import ProLayout from "./layouts/ProLayout";

// https://github.com/remix-run/react-router/blob/dev/examples/lazy-loading/src/App.tsx
const Index = React.lazy(() => import("./pages/Index"));
const NoMatch = React.lazy(() => import("./pages/NoMatch"));
const Demos = React.lazy(() => import("./pages/Demos"));
const Todos = React.lazy(() => import("./containers/Todos"));
const Users = React.lazy(() => import("./pages/Users"));

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
            path="demos/todos"
            element={
              <React.Suspense>
                <Todos />
              </React.Suspense>
            }
          />
          <Route
            path="demos/users"
            element={
              <React.Suspense>
                <Users />
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
