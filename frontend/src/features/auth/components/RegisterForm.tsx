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

type RegisterFormInputs = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const registerSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
});

type RegisterFormProps = {
  onRegister: (message: string) => void;
};

export const RegisterForm: FC<RegisterFormProps> = ({ onRegister }) => {
  const { control, handleSubmit } = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerSchema),
  });

  const { login } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login(data);
    } catch (e) {
      if (e instanceof AxiosError) {
        onRegister((e.response?.data as APIError).errors[0].message);
      }
      else {
        onRegister("Something went wrong. Please try again later.");
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
              name="firstName"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  label="First Name"
                  variant="outlined"
                  type="text"
                  sx={{ paddingBottom: 2 }}
                  autoComplete="given-name"
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
              name="lastName"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  label="Last Name"
                  variant="outlined"
                  type="text"
                  sx={{ paddingBottom: 2 }}
                  autoComplete="family-name"
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
              name="email"
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
        href="/login"
        variant="text"
        fullWidth
        type="submit"
      >
        Already have an account?
      </Button>
    </form>
  );
};
