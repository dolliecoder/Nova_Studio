"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Card, CardContent, Typography, TextField, Button, Alert, CircularProgress, Container } from "@mui/material";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validate = () => {
    let valid = true;
    const tempErrors = { username: "", password: "" };

    if (!username.trim()) {
      tempErrors.username = "Username is required";
      valid = false;
    }
    if (!password.trim()) {
      tempErrors.password = "Password is required";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setErrorMsg(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 1000);
      } else {
        setErrorMsg(data.error || "Authentication failed.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to connect to the authentication server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#0F172A",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            backgroundColor: "#1E293B",
            borderRadius: "16px",
            border: "1px solid #334155",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
            p: { xs: 2, sm: 4 },
          }}
        >
          <CardContent>
            <Box sx={{ mb: 4, textAlign: "center" }}>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 800,
                  color: "#FFFFFF",
                  mb: 1.5,
                }}
              >
                Nova Studio
              </Typography>
              <Typography variant="body1" sx={{ color: "#94A3B8" }}>
                Admin Portal Login
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              {success && (
                <Alert severity="success" sx={{ mb: 3, borderRadius: "8px" }}>
                  {success}
                </Alert>
              )}
              {errorMsg && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: "8px" }}>
                  {errorMsg}
                </Alert>
              )}

              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
                sx={{
                  mb: 3,
                  backgroundColor: "#0F172A",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-root": {
                    color: "#FFFFFF",
                    "& fieldset": { borderColor: "#334155" },
                    "&:hover fieldset": { borderColor: "#475569" },
                    "&.Mui-focused fieldset": { borderColor: "#3B82F6" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#94A3B8",
                    "&.Mui-focused": { color: "#3B82F6" },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                sx={{
                  mb: 4,
                  backgroundColor: "#0F172A",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-root": {
                    color: "#FFFFFF",
                    "& fieldset": { borderColor: "#334155" },
                    "&:hover fieldset": { borderColor: "#475569" },
                    "&.Mui-focused fieldset": { borderColor: "#3B82F6" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#94A3B8",
                    "&.Mui-focused": { color: "#3B82F6" },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={submitting}
                sx={{
                  py: 1.8,
                  borderRadius: "30px",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "1rem",
                  backgroundColor: "#3B82F6",
                  "&:hover": {
                    backgroundColor: "#2563EB",
                  },
                }}
              >
                {submitting ? (
                  <CircularProgress size={24} sx={{ color: "#FFFFFF" }} />
                ) : (
                  "Login"
                )}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
