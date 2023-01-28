import "./App.css";
import { AppProvider } from "./app/providers";
import { AppRoutes } from "./routes";

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
