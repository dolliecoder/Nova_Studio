"use client";

import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Grid, Card, CardContent } from "@mui/material";

interface Service {
  id: number;
  title: string;
  description: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          setServices(data);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return (
    <Box
      component="section"
      id="services"
      sx={{
        backgroundColor: "#0F172A",
        py: { xs: 10, md: 16 },
        borderTop: "1px solid #1E293B",
      }}
    >
      <Container maxWidth="lg">
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
            Services
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#94A3B8",
              fontSize: { xs: "1rem", md: "1.125rem" },
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Our core capabilities and custom-crafted engineering processes designed to grow your digital presence.
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <Typography sx={{ color: "#CBD5E1" }}>Loading services...</Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {services.map((service) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={service.id}>
                <Card
                  sx={{
                    height: "100%",
                    backgroundColor: "#1E293B",
                    borderRadius: "16px",
                    border: "1px solid #334155",
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                      borderColor: "#475569",
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        color: "#FFFFFF",
                        mb: 2,
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#CBD5E1",
                        lineHeight: 1.6,
                      }}
                    >
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
