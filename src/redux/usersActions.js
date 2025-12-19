import axios from "axios";

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAIL = "FETCH_USERS_FAIL";
export const CREATE_USER = "CREATE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

// MockAPI base URL
const BASE_URL = "https://6944dfb17dd335f4c36178b0.mockapi.io";

export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_USERS_REQUEST });
  try {
    const res = await axios.get(`${BASE_URL}/users`);
    dispatch({ type: FETCH_USERS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_USERS_FAIL, payload: err.message });
  }
};

export const createUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post(`${BASE_URL}/users`, user);
    dispatch({
      type: CREATE_USER,
      payload: res.data,
    });
  } catch (err) {
    console.error("Create user failed:", err);
  }
};

export const updateUser = (id, user) => async (dispatch) => {
  try {
    const res = await axios.put(`${BASE_URL}/users/${id}`, user);
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
  } catch (err) {
    console.error("Update user failed:", err);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/users/${id}`);
    dispatch({
      type: DELETE_USER,
      payload: id,
    });
  } catch (err) {
    console.error("Delete user failed:", err);
  }
};
