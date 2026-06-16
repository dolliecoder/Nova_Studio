"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import { Trash2, MessageSquare, Briefcase, Plus } from "lucide-react";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);

  // Data states
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [contactsLoading, setContactsLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(true);

  // Add Project Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({ title: "", category: "", description: "", imageUrl: "" });
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formErrorMsg, setFormErrorMsg] = useState<string | null>(null);

  // Deletion state
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch all contact submissions
  const fetchContacts = async () => {
    setContactsLoading(true);
    try {
      const res = await fetch("/api/contacts");
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    } finally {
      setContactsLoading(false);
    }
  };

  // Fetch all projects
  const fetchProjects = async () => {
    setProjectsLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setProjectsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchContacts();
    fetchProjects();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  // Validation for adding new project
  const validateForm = () => {
    let valid = true;
    const errors = { title: "", category: "", description: "", imageUrl: "" };

    if (!title.trim()) {
      errors.title = "Project title is required";
      valid = false;
    }
    if (!category.trim()) {
      errors.category = "Category is required";
      valid = false;
    }
    if (!description.trim()) {
      errors.description = "Description is required";
      valid = false;
    }
    if (!imageUrl.trim()) {
      errors.imageUrl = "Image URL is required";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  // Submit new project handler
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccess(null);
    setFormErrorMsg(null);

    if (!validateForm()) return;

    setFormSubmitting(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          category: category.trim(),
          description: description.trim(),
          imageUrl: imageUrl.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setFormSuccess("Project added successfully!");
        setTitle("");
        setCategory("");
        setDescription("");
        setImageUrl("");
        fetchProjects(); // refresh list
      } else {
        setFormErrorMsg(data.error || "Failed to create project.");
      }
    } catch (error) {
      console.error(error);
      setFormErrorMsg("Server connection failure.");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Delete project handler
  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchProjects(); // refresh list
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete project.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete project due to server error.");
    } finally {
      setDeletingId(null);
    }
  };

  // Log out handler (clear admin session cookie server-side)
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout request failed:", error);
    }
    router.push("/admin/login");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#0F172A",
        minHeight: "100vh",
        color: "#FFFFFF",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Header Block */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 800, color: "#FFFFFF" }}>
              Admin Dashboard
            </Typography>
            <Typography variant="body1" sx={{ color: "#94A3B8", mt: 0.5 }}>
              Manage portfolio projects and view user inquiries.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              borderColor: "#334155",
              color: "#94A3B8",
              textTransform: "none",
              borderRadius: "20px",
              px: 3,
              "&:hover": {
                borderColor: "#EF4444",
                color: "#EF4444",
              },
            }}
          >
            Logout
          </Button>
        </Box>

        {/* Navigation Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "#1E293B", mb: 4 }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="primary"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                color: "#94A3B8",
                fontSize: "1rem",
              },
              "& .Mui-selected": {
                color: "#3B82F6",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#3B82F6",
              },
            }}
          >
            <Tab icon={<MessageSquare size={18} />} iconPosition="start" label="Inquiries" />
            <Tab icon={<Briefcase size={18} />} iconPosition="start" label="Projects" />
          </Tabs>
        </Box>

        {/* Inquiries Tab */}
        {tabIndex === 0 && (
          <Box>
            {contactsLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress sx={{ color: "#3B82F6" }} />
              </Box>
            ) : contacts.length === 0 ? (
              <Paper
                sx={{
                  backgroundColor: "#1E293B",
                  p: 6,
                  textAlign: "center",
                  border: "1px solid #334155",
                  borderRadius: "16px",
                }}
              >
                <Typography sx={{ color: "#94A3B8" }}>No contact form submissions found.</Typography>
              </Paper>
            ) : (
              <TableContainer
                component={Paper}
                sx={{
                  backgroundColor: "#1E293B",
                  border: "1px solid #334155",
                  borderRadius: "16px",
                  overflow: "hidden",
                }}
              >
                <Table>
                  <TableHead sx={{ backgroundColor: "#0F172A" }}>
                    <TableRow>
                      <TableCell sx={{ color: "#94A3B8", fontWeight: 700, borderBottom: "1px solid #334155" }}>Name</TableCell>
                      <TableCell sx={{ color: "#94A3B8", fontWeight: 700, borderBottom: "1px solid #334155" }}>Email</TableCell>
                      <TableCell sx={{ color: "#94A3B8", fontWeight: 700, borderBottom: "1px solid #334155" }}>Message</TableCell>
                      <TableCell sx={{ color: "#94A3B8", fontWeight: 700, borderBottom: "1px solid #334155" }}>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id} sx={{ "&:hover": { backgroundColor: "#111827" } }}>
                        <TableCell sx={{ color: "#FFFFFF", borderBottom: "1px solid #334155" }}>{contact.name}</TableCell>
                        <TableCell sx={{ color: "#FFFFFF", borderBottom: "1px solid #334155" }}>{contact.email}</TableCell>
                        <TableCell sx={{ color: "#CBD5E1", borderBottom: "1px solid #334155", whiteSpace: "pre-wrap" }}>
                          {contact.message}
                        </TableCell>
                        <TableCell sx={{ color: "#94A3B8", borderBottom: "1px solid #334155" }}>
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}

        {/* Projects Tab */}
        {tabIndex === 1 && (
          <Grid container spacing={4}>
            {/* Add Project Form (Left Side - 4 Columns) */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  backgroundColor: "#1E293B",
                  border: "1px solid #334155",
                  borderRadius: "16px",
                  p: 3,
                }}
              >
                <Typography variant="h5" sx={{ color: "#FFFFFF", fontWeight: 700, mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
                  <Plus size={20} /> Add New Project
                </Typography>

                <Box component="form" onSubmit={handleAddProject} noValidate>
                  {formSuccess && (
                    <Alert severity="success" sx={{ mb: 3, borderRadius: "8px" }}>
                      {formSuccess}
                    </Alert>
                  )}
                  {formErrorMsg && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: "8px" }}>
                      {formErrorMsg}
                    </Alert>
                  )}

                  <TextField
                    fullWidth
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    error={!!formErrors.title}
                    helperText={formErrors.title}
                    sx={{
                      mb: 2.5,
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
                    label="Category (e.g. Web Design)"
                    variant="outlined"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    error={!!formErrors.category}
                    helperText={formErrors.category}
                    sx={{
                      mb: 2.5,
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
                    label="Image URL"
                    variant="outlined"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    error={!!formErrors.imageUrl}
                    helperText={formErrors.imageUrl}
                    sx={{
                      mb: 2.5,
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
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    error={!!formErrors.description}
                    helperText={formErrors.description}
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

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={formSubmitting}
                    sx={{
                      py: 1.5,
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
                    {formSubmitting ? <CircularProgress size={24} sx={{ color: "#FFFFFF" }} /> : "Create Project"}
                  </Button>
                </Box>
              </Card>
            </Grid>

            {/* Projects List View (Right Side - 8 Columns) */}
            <Grid size={{ xs: 12, md: 8 }}>
              {projectsLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                  <CircularProgress sx={{ color: "#3B82F6" }} />
                </Box>
              ) : projects.length === 0 ? (
                <Paper
                  sx={{
                    backgroundColor: "#1E293B",
                    p: 6,
                    textAlign: "center",
                    border: "1px solid #334155",
                    borderRadius: "16px",
                  }}
                >
                  <Typography sx={{ color: "#94A3B8" }}>No active portfolio projects found.</Typography>
                </Paper>
              ) : (
                <Grid container spacing={3}>
                  {projects.map((project) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={project.id}>
                      <Card
                        sx={{
                          backgroundColor: "#1E293B",
                          border: "1px solid #334155",
                          borderRadius: "16px",
                          overflow: "hidden",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <CardMedia component="img" height="180" image={project.imageUrl} alt={project.title} sx={{ objectFit: "cover" }} />
                        <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                          <Box>
                            <Typography variant="overline" sx={{ color: "#94A3B8", fontWeight: 600, letterSpacing: "0.1em" }}>
                              {project.category}
                            </Typography>
                            <Typography variant="h6" sx={{ color: "#FFFFFF", fontWeight: 700, mt: 0.5, mb: 2 }}>
                              {project.title}
                            </Typography>
                          </Box>
                          <Button
                            variant="outlined"
                            startIcon={<Trash2 size={16} />}
                            disabled={deletingId === project.id}
                            onClick={() => handleDeleteProject(project.id)}
                            sx={{
                              borderColor: "#334155",
                              color: "#EF4444",
                              textTransform: "none",
                              borderRadius: "20px",
                              width: "100%",
                              "&:hover": {
                                backgroundColor: "rgba(239, 68, 68, 0.1)",
                                borderColor: "#EF4444",
                              },
                            }}
                          >
                            {deletingId === project.id ? <CircularProgress size={16} sx={{ color: "#EF4444" }} /> : "Delete Project"}
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
