import axios from "axios";

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAIL = "FETCH_USERS_FAIL";
export const CREATE_USER = "CREATE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

const API_KEY = "reqres-free-v1";

const axiosConfig = {
  headers: {
    "x-api-key": API_KEY,
    "Content-Type": "application/json",
  },
};

export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_USERS_REQUEST });
  try {
    const res = await axios.get(
      "https://reqres.in/api/users?per_page=12",
      axiosConfig
    );
    dispatch({ type: FETCH_USERS_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: FETCH_USERS_FAIL, payload: err.message });
  }
};

export const createUser = (user) => async (dispatch) => {
  try {
    await axios.post("https://reqres.in/api/users", user, axiosConfig).catch(() => {});
    dispatch({
      type: CREATE_USER,
      payload: { ...user, id: Date.now() },
    });
  } catch (err) {
    console.error("Create user failed:", err);
  }
};

export const updateUser = (id, user) => async (dispatch) => {
  try {
    await axios.put(`https://reqres.in/api/users/${id}`, user, axiosConfig).catch(() => {});
    dispatch({
      type: UPDATE_USER,
      payload: { id, ...user },
    });
  } catch (err) {
    console.error("Update user failed:", err);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`https://reqres.in/api/users/${id}`, axiosConfig).catch(() => {});
    dispatch({
      type: DELETE_USER,
      payload: id,
    });
  } catch (err) {
    console.error("Delete user failed:", err);
  }
};
