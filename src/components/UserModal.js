import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function UserModal({ open, onClose, onSave, user }) {
  const isEdit = Boolean(user);

  const initialForm = {
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        avatar: user.avatar || "",
      });
    } else {
      setForm(initialForm);
    }
    setErrors({});
  }, [user, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};
    if (!form.first_name.trim()) newErrors.first_name = "First name is required";
    if (!form.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.avatar.trim()) newErrors.avatar = "Profile image link is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const payload = {
      ...form,
      id: user?.id || Date.now(),
    };
    onSave(payload);
    onClose();
  };

  const handleCancel = () => {
    setForm(initialForm);
    setErrors({});
    onClose();
  };

  const renderLabel = (label) => (
    <Typography variant="body2" sx={{ mb: 0.5 }}>
      <span style={{ color: "red" }}>*</span> {label}
    </Typography>
  );

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {isEdit ? "Edit User" : "Create New User"}
        <IconButton onClick={handleCancel}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box mb={2}>
          {renderLabel("First Name")}
          <TextField
            fullWidth
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            error={Boolean(errors.first_name)}
            placeholder={!isEdit ? "Enter first name" : ""}
            helperText={errors.first_name || ""}
            variant="outlined"
          />
        </Box>
        <Box mb={2}>
          {renderLabel("Last Name")}
          <TextField
            fullWidth
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            error={Boolean(errors.last_name)}
            placeholder={!isEdit ? "Enter last name" : ""}
            helperText={errors.last_name || ""}
            variant="outlined"
          />
        </Box>
        <Box mb={2}>
          {renderLabel("Email")}
          <TextField
            fullWidth
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            placeholder={!isEdit ? "Enter email address" : ""}
            helperText={errors.email || ""}
            variant="outlined"
          />
        </Box>
        <Box mb={2}>
          {renderLabel("Profile Image Link")}
          <TextField
            fullWidth
            name="avatar"
            value={form.avatar}
            onChange={handleChange}
            error={Boolean(errors.avatar)}
            placeholder={!isEdit ? "Enter profile image link" : ""}
            helperText={errors.avatar || ""}
            variant="outlined"
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
