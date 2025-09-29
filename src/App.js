import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import UserListPage from "./pages/UserListPage";

function App() {
  const { token } = useSelector(state=>state.auth);
  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/users"/> : <LoginPage/>} />
        <Route path="/users" element={token ? <UserListPage/> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
