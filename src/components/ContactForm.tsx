"use client";

import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button, Alert, CircularProgress } from "@mui/material";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validate = () => {
    let valid = true;
    const tempErrors = { name: "", email: "", message: "" };

    if (!name.trim()) {
      tempErrors.name = "Name is required";
      valid = false;
    }
    if (!email.trim()) {
      tempErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(email.trim())) {
      tempErrors.email = "Please enter a valid email address";
      valid = false;
    }
    if (!message.trim()) {
      tempErrors.message = "Message is required";
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Thank you! Your message has been sent successfully.");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to connect to the server. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        backgroundColor: "#0F172A",
        py: { xs: 10, md: 16 },
        borderTop: "1px solid #1E293B",
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mb: { xs: 6, md: 8 }, textAlign: "center" }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "2.75rem", md: "3.5rem" },
              color: "#FFFFFF",
              mb: 2,
            }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#94A3B8",
              fontSize: { xs: "1rem", md: "1.125rem" },
              maxWidth: "500px",
              mx: "auto",
            }}
          >
            Have a project in mind? Fill out the form below, and our team will get back to you shortly.
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
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            sx={{
              mb: 3,
              backgroundColor: "#1E293B",
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
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            sx={{
              mb: 3,
              backgroundColor: "#1E293B",
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
            label="Message"
            variant="outlined"
            multiline
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            error={!!errors.message}
            helperText={errors.message}
            sx={{
              mb: 4,
              backgroundColor: "#1E293B",
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
              py: 2,
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
              "Submit Inquiry"
            )}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
