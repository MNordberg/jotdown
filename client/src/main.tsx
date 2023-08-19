import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import "./index.css";

TimeAgo.addDefaultLocale(en);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
