import usersReducer from "../../redux/usersReducer";
import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAIL, CREATE_USER, UPDATE_USER, DELETE_USER } from "../../redux/usersActions";

test("users reducer fetch/create/update/delete", () => {
  let state = usersReducer(undefined, { type: "@@INIT" });
  expect(Array.isArray(state.users)).toBe(true);

  state = usersReducer(state, { type: FETCH_USERS_REQUEST });
  expect(state.loading).toBe(true);

  state = usersReducer(state, { type: FETCH_USERS_SUCCESS, payload: [{id:1}] });
  expect(state.users.length).toBe(1);

  state = usersReducer(state, { type: CREATE_USER, payload: { id: 2 } });
  expect(state.users.some(u => u.id === 2)).toBe(true);

  state = usersReducer(state, { type: UPDATE_USER, payload: { id: 2, first_name: "Updated" } });
  expect(state.users.find(u => u.id === 2).first_name).toBe("Updated");

  state = usersReducer(state, { type: DELETE_USER, payload: 2 });
  expect(state.users.some(u => u.id === 2)).toBe(false);
});