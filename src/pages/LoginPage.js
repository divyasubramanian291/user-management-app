import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authActions";
import { useNavigate } from "react-router-dom";
import { TextField, InputAdornment, Button, Checkbox, FormControlLabel, CircularProgress } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading, error } = useSelector(state => state.auth);

  const storedAuth = JSON.parse(localStorage.getItem("auth")) || JSON.parse(sessionStorage.getItem("auth"));

  const [email, setEmail] = useState(storedAuth?.userName ? storedAuth.userName : "eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [rememberMe, setRememberMe] = useState(!!localStorage.getItem("auth"));

  useEffect(() => {
    if (storedAuth?.token) navigate("/users");
  }, [storedAuth, navigate]);

  useEffect(() => {
    if (token) navigate("/users");
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, rememberMe));
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        <TextField
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
          }
          label="Remember Me"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ position: "relative" }}
        >
          Login
          {loading && (
            <CircularProgress
              size={24}
              color="inherit"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: -12,
                marginLeft: -12,
              }}
            />
          )}
        </Button>
      </form>
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
}
