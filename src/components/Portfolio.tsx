"use client";

import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <Box
      component="section"
      id="portfolio"
      sx={{
        backgroundColor: "#0F172A",
        py: { xs: 10, md: 16 },
        borderTop: "1px solid #1E293B",
      }}
    >
      <Container maxWidth="lg">
        {/* Section Heading & Description */}
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
            Portfolio
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
            A curated selection of our digital creations, showing engineering excellence and beautiful design.
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <Typography sx={{ color: "#CBD5E1" }}>Loading projects...</Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {projects.map((project) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
                <Card
                  sx={{
                    height: "100%",
                    backgroundColor: "#1E293B",
                    borderRadius: "16px",
                    border: "1px solid #334155",
                    overflow: "hidden",
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.4)",
                      borderColor: "#475569",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={project.imageUrl}
                    alt={project.title}
                    sx={{
                      objectFit: "cover",
                    }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="overline"
                      sx={{
                        fontWeight: 600,
                        color: "#94A3B8",
                        letterSpacing: "0.1em",
                        display: "block",
                        mb: 1,
                      }}
                    >
                      {project.category}
                    </Typography>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        color: "#FFFFFF",
                      }}
                    >
                      {project.title}
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
