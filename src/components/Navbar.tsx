"use client";

import React from "react";
import { AppBar, Toolbar, Container, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleDashboardClick = () => {
    router.push("/admin/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #1E293B",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: "64px", md: "72px" },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo/Brand */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              color: "#FFFFFF",
              letterSpacing: "0.05em",
            }}
          >
            Nova Studio
          </Typography>

          {/* Dashboard Button */}
          <Box>
            <Button
              onClick={handleDashboardClick}
              variant="outlined"
              sx={{
                px: { xs: 2, md: 3 },
                py: { xs: 0.75, md: 1 },
                fontSize: { xs: "0.875rem", md: "1rem" },
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "20px",
                borderColor: "#3B82F6",
                color: "#3B82F6",
                "&:hover": {
                  borderColor: "#2563EB",
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                },
              }}
            >
              Dashboard
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
