import "./App.css";
import { AppProvider } from "./app/providers";
import { AppRoutes } from "./routes";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <AppProvider>
      <CssBaseline />
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
