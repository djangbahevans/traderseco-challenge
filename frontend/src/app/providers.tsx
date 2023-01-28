import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FC, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router } from "react-router-dom";
import { queryClient } from "../libs/react-query";
import { AuthProvider } from "../features/auth/contexts/AuthContext";

const ErrorFallback = () => {
  return (
    <Box
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong</h2>
      <Button className="mt-4" onClick={() => location.reload()}>
        Refresh
      </Button>
    </Box>
  );
};

export type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <Suspense
      fallback={
        <Box className="flex items-center justify-center w-screen h-screen">
          <CircularProgress size="xl" />
        </Box>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {import.meta.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
          <AuthProvider>
            <Router>{children}</Router>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
