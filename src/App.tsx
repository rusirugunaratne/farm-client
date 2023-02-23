import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Router } from "./routes/Router";
import { darkTheme } from "./themes/Themes";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router></Router>
    </ThemeProvider>
  );
}

export default App;
