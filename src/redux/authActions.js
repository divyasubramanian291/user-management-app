import axios from "axios";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";

// MockAPI base URL
const BASE_URL = "https://6944dfb17dd335f4c36178b0.mockapi.io";

export const login = (email, password, rememberMe = false) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await axios.get(`${BASE_URL}/authUsers`, {
      params: { email, password },
    });

    if (res.data.length === 0) {
      throw new Error("Invalid email or password");
    }

    const user = res.data[0];
    const token = user.token;
    const userName = user.name;
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
