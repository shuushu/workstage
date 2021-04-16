import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// theme
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[500],
    },
    secondary: {
      main: blueGrey[200],
    },
  },
  overrides: {
    MuiSvgIcon: {
      root: {
        color: blueGrey[500],
      },
    },
    MuiInputLabel: {
      outlined: {
        color: blueGrey[200],
      },
    },
    MuiInputBase: {
      input: {
        color: blueGrey[200],
      },
    },
    MuiAutocomplete: {
      input: {
        color: blueGrey[200],
      },
    },
    MuiOutlinedInput: {
      root: {
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: blueGrey[500],
        },
      },
      notchedOutline: {
        borderColor: blueGrey[500],
      },
    },
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
