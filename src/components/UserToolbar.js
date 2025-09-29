import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export default function UserToolbar({ onSearch, onAdd }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", margin: "1px 0" }}>
      <h3>Users</h3>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <TextField
          size="small"
          placeholder="Input search text"
          onChange={(e) => onSearch(e.target.value)}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              border:'1px solid gray',
            },
            '& .MuiInputAdornment-root': {
              borderLeft: '1px solid gray',
              marginLeft: '5px',
              paddingLeft: '5px',
              color: 'gray',
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          size="small"
          style={{ textTransform: "none" }}
          onClick={onAdd}
        >
          Create User
        </Button>
      </div>
    </div>
  );
}
