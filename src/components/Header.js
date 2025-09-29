import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { logout } from "../redux/authActions";
import { Box } from "@mui/material";

export default function Header() {
  const { userName } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row-reverse",
        padding: "0 20px",
        borderBottom: "1px solid #ccc",
        backgroundColor: "black",
        alignItems: "center",
        height: "40px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <span style={{ color: "white" }}>{userName}</span>
        <Box
          onClick={handleLogout}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "red",
            width: 28,
            height: 28,
            cursor: "pointer",
            "&:hover": { bgcolor: "#d32f2f" },
          }}
        >
          <PowerSettingsNewIcon 
            fontSize="small" 
            sx={{ transform: "rotate(90deg)", color: "white" }} 
          />
        </Box>
      </div>
    </header>
  );
}
