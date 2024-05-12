"use client";
import React from "react";
import { Box, Card, TextField, Button, Typography, useMediaQuery, useTheme, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase-config";
import { LoginData } from "./types";
import { schema } from "./constants";


const LoginPage = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: LoginData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push("/leaflet-map");
    } catch (error) {
      alert("User not found");
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#eceff1" }}>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%"
      }}>
        <Card sx={{
          maxWidth: fullScreen ? "90%" : 400,
          width: "90%",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: fullScreen ? 2 : 4,
          boxShadow: 4,
          borderRadius: 2
        }}>
          <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: "medium", color: "#37474f" }}>
            Welcome Back!
          </Typography>
          <Typography variant="caption" sx={{ color: "#607d8b", mb: 3 }}>
            Sign in to continue
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12}>
                <TextField 
                  fullWidth
                  id="email"
                  label="Email"
                  variant="outlined"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  fullWidth
                  id="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
            </Grid>
            <Button variant="contained" type="submit" fullWidth sx={{ bgcolor: "#607d8b", "&:hover": { bgcolor: "#455a64" } }}>
            Sign In
            </Button>
          </form>
          <Typography variant="body2" sx={{ color: "#78909c", mt: 2 }}>
             Dont have an account?
          </Typography>
          <Button sx={{ color: "#607d8b", textTransform: "none" }} onClick={() => router.push("/register")}>
            Sign up here
          </Button>
        </Card>
      </Box>
    </div>
  );
};

export default LoginPage;
