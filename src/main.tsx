import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import GlobalProvider from "./contexts/GlobalContext";
import AuthProvider from "./contexts/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <GlobalProvider>
            <AuthProvider>
                <Routes>
                    <Route path='/*' element={<App />} /> 
                </Routes>
            </AuthProvider>
        </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
