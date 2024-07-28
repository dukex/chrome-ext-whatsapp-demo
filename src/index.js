/*global chrome*/

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WhatsAppProvider } from "./context/WhatsAppProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WhatsAppProvider>
      <App />
    </WhatsAppProvider>
  </React.StrictMode>
);
