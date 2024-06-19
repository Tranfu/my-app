import * as React from "react";
import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";

// import logo from './logo.svg';
// import './App.css';
import ProLayout from "./layouts/ProLayout";

// https://github.com/remix-run/react-router/blob/dev/examples/lazy-loading/src/App.tsx
const Home = React.lazy(() => import("./pages/Home"));
const NoMatch = React.lazy(() => import("./pages/NoMatch"));
const About = React.lazy(() => import("./pages/About"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <div className="App">
      {/* https://github.com/remix-run/react-router/blob/dev/examples/lazy-loading/src/App.tsx */}
      <Routes>
        <Route path="/" element={<ProLayout />}>
          <Route index element={<Home />} />
          <Route
            path="home"
            element={
              <React.Suspense fallback={<>Loading...</>}>
                <Home />
              </React.Suspense>
            }
          />
          <Route
            path="about"
            element={
              <React.Suspense fallback={<>Loading...</>}>
                <About />
              </React.Suspense>
            }
          />
          <Route
            path="dashboard/*"
            element={
              <React.Suspense fallback={<>Loading...</>}>
                <Dashboard />
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
