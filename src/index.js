import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import NiceModal from "@ebay/nice-modal-react";

ReactDOM.render(
  <BrowserRouter>
    <NiceModal.Provider>
      <App />
    </NiceModal.Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorkerRegistration.register();
reportWebVitals();
