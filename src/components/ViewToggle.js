import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ListIcon from '@mui/icons-material/List';
import GridOnIcon from '@mui/icons-material/GridOn';

export default function ViewToggle({ view, setView }) {
  return (
    <Stack direction="row" spacing={2} paddingBottom={2}>
      <Button
        variant="outlined"
        onClick={() => setView("table")}
        startIcon={<GridOnIcon />}
        sx={{
          color: view === "table" ? "primary.main" : "gray",
          borderColor: view === "table" ? "primary.main" : "gray",
          '&:hover': {
            borderColor: view === "table" ? "primary.dark" : "gray",
          },
        }}
      >
        Table
      </Button>

      <Button
        variant="outlined"
        onClick={() => setView("card")}
        startIcon={<ListIcon />}
        sx={{
          color: view === "card" ? "primary.main" : "gray",
          borderColor: view === "card" ? "primary.main" : "gray",
          '&:hover': {
            borderColor: view === "card" ? "primary.dark" : "gray",
          },
        }}
      >
        Card
      </Button>
    </Stack>
  );
}
