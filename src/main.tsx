import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalProvider from "./contexts/GlobalContext";
import AuthProvider from "./contexts/AuthContext";
import TabProvider from "./contexts/TabContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <AuthProvider>
          <TabProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </TabProvider>
        </AuthProvider>
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);
