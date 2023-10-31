import * as React from "react";
import "./App.css";
import "react-image-crop/dist/ReactCrop.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { ThemeOptions } from "./themes/theme";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";

const theme = createTheme(ThemeOptions);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
