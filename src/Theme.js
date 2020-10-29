import React from "react";
import {
  ThemeProvider,
  //   https://github.com/mui-org/material-ui/issues/13394
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#a3daac",
    },
    secondary: {
      main: "#9cd8dc8f",
    },
  },
});

const Theme = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default Theme;
