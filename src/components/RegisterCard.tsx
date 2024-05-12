"use client";
import React from "react";
import { Box, Card, TextField, Button, Typography, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterCardProps } from "./types";
import { registerSchema } from "./constants";


const RegisterCard: React.FC<RegisterCardProps> = ({ handleSignUp }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema)
  });
  
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#f4f5f7" }}>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%"
      }}>
        <Card sx={{
          maxWidth: 450,
          width: "100%",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          boxShadow: 3,
          borderRadius: 2
        }}>
          <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: "medium", color: "#37474f" }}>
      Please Sign Up
          </Typography>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <Grid container spacing={2}>
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
                  type="password"
                  variant="outlined"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  fullWidth
                  id="password-confirm"
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  {...register("passwordConfirm")}
                  error={!!errors.passwordConfirm}
                  helperText={errors.passwordConfirm?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: "#283593", "&:hover": { bgcolor: "#1A237E" } }}>
                Sign Up
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button 
                  sx={{ color: "#283593", textTransform: "none" }} 
                  onClick={() => window.history.back()}
                  fullWidth
                >
                Back to Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Box>
    </div>
  );
};

export default RegisterCard;
