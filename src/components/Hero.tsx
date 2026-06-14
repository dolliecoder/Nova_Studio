"use client";

import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";

export default function Hero() {
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "#0F172A",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: { xs: 3, md: 4 },
          }}
        >
          {/* Agency Label */}
          <Typography
            variant="overline"
            sx={{
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#94A3B8",
              fontSize: { xs: "0.85rem", md: "1rem" },
            }}
          >
            Nova Studio
          </Typography>

          {/* Main Heading */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
              lineHeight: 1.2,
              color: "#FFFFFF",
            }}
          >
            Building Modern Digital Experiences
          </Typography>

          {/* Subheading */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 400,
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
              lineHeight: 1.6,
              color: "#CBD5E1",
              maxWidth: "700px",
            }}
          >
            We help businesses create modern websites, strong digital brands, and scalable web experiences that drive growth.
          </Typography>

          {/* CTA Button */}
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: "1rem", md: "1.125rem" },
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "30px",
              }}
            >
              Start a Project
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
