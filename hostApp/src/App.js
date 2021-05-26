import LocalButton from "./exports/Button";
import React from "react";

const RemoteButton = React.lazy(() => import("consumerdash/Button"));
const ConsumerDash = React.lazy(() => import("consumerdash/ConsumerDash"));

const App = () => (
  <div>
    <h1>Bi-Directional</h1>
    <h2>App 2</h2>
    <LocalButton />
    <React.Suspense fallback="Loading Button">
      <RemoteButton />
      <ConsumerDash />
    </React.Suspense>
  </div>
);

export default App;
