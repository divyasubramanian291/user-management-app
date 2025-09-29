import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function UserTable({ users, onEdit, onDelete }) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(users.length / rowsPerPage);

  const paginatedUsers = users.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>Email</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell></TableCell>
              <TableCell>
                <Avatar src={user.avatar} alt={user.first_name}>
                  {!user.avatar && user.first_name[0]}
                </Avatar>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  sx={{ textTransform: "none" }}
                  variant="contained"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  sx={{ textTransform: "none", ml: 1 }}
                  variant="contained"
                  color="error"
                  onClick={() => onDelete(user)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "10px",
          gap: "4px",
        }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          sx={{
            minWidth: "36px",
            width: "36px",
            height: "36px",
            padding: 0,
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <Button
            key={num}
            variant="outlined"
            size="small"
            onClick={() => setPage(num)}
            sx={{
              minWidth: "36px",
              width: "36px",
              height: "36px",
              padding: 0,
            }}
          >
            {num}
          </Button>
        ))}

        <Button
          variant="outlined"
          size="small"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          sx={{
            minWidth: "36px",
            width: "36px",
            height: "36px",
            padding: 0,
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </Button>
      </div>
    </TableContainer>
  );
}
