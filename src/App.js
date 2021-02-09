import CssBaseline from "@material-ui/core/CssBaseline";
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Provider } from "jotai";

import AppRoutes from "./routes";
import React from "react";

function App() {
  return (
    <Provider>
      <div className="App">
        <CssBaseline />
        <AppRoutes />
      </div>
    </Provider>
  );
}

export default App;
