import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./authActions";

const storedAuth = JSON.parse(localStorage.getItem("auth")) || JSON.parse(sessionStorage.getItem("auth"));

const initialState = {
  token: storedAuth?.token || null,
  userName: storedAuth?.userName || "",
  loading: false,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, token: action.payload.token, userName: action.payload.userName };
    case LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      return { ...state, token: null, userName: "", error: null };
    default:
      return state;
  }
}
