"use client";

import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Grid, Card } from "@mui/material";
import CountUp from "react-countup";

interface StatItem {
  id: number;
  key: string;
  value: number;
  label: string;
  suffix: string;
}

export default function Stats() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <Box
      component="section"
      id="stats"
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
            Statistics
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
            A quantitative overview of our agency’s track record, growth, and global client success metrics.
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <Typography sx={{ color: "#CBD5E1" }}>Loading statistics...</Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {stats.map((stat) => (
              <Grid size={{ xs: 12, md: 4 }} key={stat.id}>
                <Card
                  sx={{
                    backgroundColor: "#1E293B",
                    borderRadius: "16px",
                    border: "1px solid #334155",
                    p: { xs: 4, md: 5 },
                    textAlign: "center",
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.4)",
                      borderColor: "#475569",
                    },
                  }}
                >
                  <Typography
                    variant="h2"
                    component="div"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "3rem", md: "4rem" },
                      color: "#FFFFFF",
                      mb: 1.5,
                      lineHeight: 1,
                    }}
                  >
                    <CountUp
                      start={0}
                      end={Number(stat.value)}
                      duration={2.5}
                      suffix={stat.suffix}
                    />
                  </Typography>
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{
                      fontWeight: 600,
                      color: "#CBD5E1",
                      fontSize: { xs: "1rem", md: "1.25rem" },
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
