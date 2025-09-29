import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

export default function DeleteConfirmModal({ open, onClose, onDelete, user }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        Are you sure you want to delete <b>{user && `${user.first_name} ${user.last_name}`}</b>?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => { onDelete(user); onClose(); }} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}