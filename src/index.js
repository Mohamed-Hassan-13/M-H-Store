import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

// CSS
import "./index.css";
import "./css/Components/alerts.css";
import "./css/Components/loading.css";
import "./css/Components/google.css";
import "./css/Components/Hover.css";
import "./css/Components/AnimationAlert.css";
import "./pages/Website/Auth/AuthOperations/Auth.css";
// bootsrap
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import MenuContext from "./Context/MenuContext";
import WindowContext from "./Context/WindowContext";
import GetDataCartContext from "./Context/GetDataCartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GetDataCartContext>
      <MenuContext>
        <WindowContext>
          <Router>
            <App />
          </Router>
        </WindowContext>
      </MenuContext>
    </GetDataCartContext>
  </React.StrictMode>
);
