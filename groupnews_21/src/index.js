import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { koKR } from "@material-ui/core/locale";
const theme = createMuiTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  koKR
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
