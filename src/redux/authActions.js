import axios from "axios";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";

const API_KEY = "reqres-free-v1";

export const login = (email, password, rememberMe = false) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await axios.post(
      "https://reqres.in/api/login",
      { email, password },
      { headers: { "x-api-key": API_KEY } }
    );

    const token = res.data.token;
    const usersRes = await axios.get("https://reqres.in/api/users?per_page=12", {
      headers: { "x-api-key": API_KEY },
    });

    const user = usersRes.data.data.find((u) => u.email === email);
    const userName = user ? `${user.first_name} ${user.last_name}` : "";
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("auth", JSON.stringify({ token, userName }));

    dispatch({ type: LOGIN_SUCCESS, payload: { token, userName } });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response?.data?.error || "Login failed",
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("auth");
  sessionStorage.removeItem("auth");
  dispatch({ type: LOGOUT });
};
