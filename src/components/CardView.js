import React, { useState, useEffect } from "react";
import { Avatar, Button, Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UserCards({ users, onEdit, onDelete }) {
const [page, setPage] = useState(1);
const rowsPerPage = 8;
const totalPages = Math.ceil(users.length / rowsPerPage);

useEffect(() => {
  setPage(1);
}, [users]);

const paginatedUsers = users.slice(
  (page - 1) * rowsPerPage,
  page * rowsPerPage
);

  return (
    <div>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
        }}
      >
        {paginatedUsers.map((user) => (
          <Box
            key={user.id}
            sx={{
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 2,
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              transition: "0.3s",
              "&:hover": { backgroundColor: "#f0f0f0" },
              "&:hover .hoverActions": { display: "flex" },
            }}
          >
            <Avatar
              src={user.avatar}
              alt={user.first_name}
              sx={{ width: 80, height: 80, margin: "0 auto 10px" }}
            />
            <h4 style={{ margin: "5px 0" }}>
              {user.first_name} {user.last_name}
            </h4>
            <p style={{ margin: "5px 0", fontSize: "0.9rem", color: "#555" }}>
              {user.email}
            </p>
            <Box
              className="hoverActions"
              sx={{
                display: "none",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                bgcolor: "rgba(0,0,0,0.5)",
                color: "white",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <IconButton
                size="medium"
                sx={{ bgcolor: "#757de8", color: "white", "&:hover": { bgcolor: "#5c6bc0" } }}
                onClick={() => onEdit(user)}
              >
                <EditIcon fontSize="medium" />
              </IconButton>
              <IconButton
                size="medium"
                sx={{ bgcolor: "#f44336", color: "white", "&:hover": { bgcolor: "#d32f2f" } }}
                onClick={() => onDelete(user)}
              >
                <DeleteIcon fontSize="medium" />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: 1,
          gap: 1,
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          sx={{ minWidth: "36px", width: "36px", height: "36px", padding: 0 }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <Button
            key={num}
            variant="outlined"
            size="small"
            onClick={() => setPage(num)}
            sx={{ minWidth: "36px", width: "36px", height: "36px", padding: 0 }}
          >
            {num}
          </Button>
        ))}

        <Button
          variant="outlined"
          size="small"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          sx={{ minWidth: "36px", width: "36px", height: "36px", padding: 0 }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </Button>
      </Box>
    </div>
  );
}
