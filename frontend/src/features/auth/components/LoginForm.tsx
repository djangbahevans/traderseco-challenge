import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
// import { useAuth } from "../contexts";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { FC } from "react";
import { useAuth } from "../contexts/AuthContext";
import { AxiosError } from "axios";
import { APIError } from "../types";

type LoginFormInputs = {
  email: string;
  password: string;
};

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

type LoginFormProps = {
  onLogin: (message: string) => void;
};

export const LoginForm: FC<LoginFormProps> = ({ onLogin }) => {
  const { control, handleSubmit } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const { login } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login(data);
    } catch (e) {
      if (e instanceof AxiosError) {
        onLogin((e.response?.data as APIError).errors[0].message);
      }
      else {
        onLogin("Something went wrong. Please try again later.");
      }
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Paper sx={{ padding: 3 }}>
        <Typography align="center" variant="h5" sx={{ paddingBottom: 2 }}>
          Log In
        </Typography>
        <Grid container>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  label="Email"
                  variant="outlined"
                  type="text"
                  sx={{ paddingBottom: 2 }}
                  autoComplete="email"
                  required
                  fullWidth
                  {...field}
                  helperText={fieldState.error?.message}
                  error={!!fieldState.error}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  sx={{ paddingBottom: 2 }}
                  autoComplete="current-password"
                  required
                  fullWidth
                  {...field}
                  helperText={fieldState.error?.message}
                  error={!!fieldState.error}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit" fullWidth>
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Button
        sx={{ marginTop: 1 }}
        href="/auth/register"
        variant="text"
        fullWidth
        type="submit"
      >
        Don't have an account?
      </Button>
    </form>
  );
};
