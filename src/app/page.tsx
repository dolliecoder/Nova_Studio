import React from "react";
import { Box } from "@mui/material";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Stats from "@/components/Stats";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <Box component="main">
      <Hero />
      <Services />
      <Portfolio />
      <Stats />
      <ContactForm />
    </Box>
  );
}
