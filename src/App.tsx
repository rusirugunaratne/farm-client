import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Router } from "./routes/Router";
import { darkTheme } from "./themes/Themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  });
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <ToastContainer />
        <Router></Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
