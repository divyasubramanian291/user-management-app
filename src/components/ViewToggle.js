import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ListIcon from '@mui/icons-material/List';
import GridOnIcon from '@mui/icons-material/GridOn';
export default function ViewToggle({ view, setView }) {
  return (
    <Stack direction="row" spacing={2} paddingBottom={2}>
      <Button variant="outlined" onClick={()=>setView("table")} startIcon={<GridOnIcon />}>
        Table
      </Button>
      <Button variant="outlined" color="gray" onClick={()=>setView("card")} startIcon={<ListIcon />}>
        Card
      </Button>
    </Stack>
  );
}
