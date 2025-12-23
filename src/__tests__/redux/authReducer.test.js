import authReducer from "../../redux/authReducer";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../../redux/authActions";

test("auth reducer handles login lifecycle", () => {
  const init = authReducer(undefined, { type: "@@INIT" });
  expect(init.token === null).toBe(true);

  const requesting = authReducer(init, { type: LOGIN_REQUEST });
  expect(requesting.loading).toBe(true);

  const success = authReducer(requesting, { type: LOGIN_SUCCESS, payload: { token: "t", userName: "X" } });
  expect(success.token).toBe("t");
  expect(success.userName).toBe("X");

  const loggedOut = authReducer(success, { type: LOGOUT });
  expect(loggedOut.token).toBeNull();
});