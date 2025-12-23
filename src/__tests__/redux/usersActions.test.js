import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import { 
  fetchUsers, 
  createUser, 
  updateUser, 
  deleteUser
} from "../../redux/usersActions";
import usersReducer from "../../redux/usersReducer";

jest.mock("axios");

beforeEach(() => {
  jest.clearAllMocks();
});

test("fetchUsers dispatches FETCH_USERS_REQUEST initially", async () => {
  const mockData = { data: [{ id: 1, email: "john.doe@mail.com", first_name: "John", last_name: "Doe" }] };
  axios.get.mockResolvedValueOnce(mockData);

  const store = createStore(
    combineReducers({ users: usersReducer }),
    applyMiddleware(thunk)
  );

  const promise = store.dispatch(fetchUsers());

  const state = store.getState().users;
  expect(state.loading).toBe(true);

  await promise;
});

test("fetchUsers dispatches success with data", async () => {
  const mockData = { data: [{ id: 1, email: "john.doe@mail.com", first_name: "John", last_name: "Doe" }] };
  axios.get.mockResolvedValueOnce(mockData);

  const store = createStore(
    combineReducers({ users: usersReducer }),
    applyMiddleware(thunk)
  );

  await store.dispatch(fetchUsers());

  const state = store.getState().users;
  expect(state.loading).toBe(false);
  expect(state.users).toEqual(mockData.data);
  expect(state.error).toBeNull();
});

test("fetchUsers dispatches FETCH_USERS_FAIL on error", async () => {
  const errorMessage = "Network error";
  axios.get.mockRejectedValueOnce(new Error(errorMessage));

  const store = createStore(
    combineReducers({ users: usersReducer }),
    applyMiddleware(thunk)
  );

  await store.dispatch(fetchUsers());

  const state = store.getState().users;
  expect(state.loading).toBe(false);
  expect(state.users).toEqual([]);
  expect(state.error).toBe(errorMessage);
});

test("createUser dispatches CREATE_USER action", async () => {
  const newUser = { id: 2, email: "jane.smith.com", first_name: "Jane", last_name: "Smith" };
  axios.post.mockResolvedValueOnce({ data: newUser });

  const store = createStore(
    combineReducers({ users: usersReducer }),
    applyMiddleware(thunk)
  );

  await store.dispatch(createUser(newUser));

  const state = store.getState().users;
  expect(state.users).toContainEqual(newUser);
});

test("updateUser dispatches UPDATE_USER action", async () => {
  const initialState = {
    loading: false,
    users: [{ id: 1, email: "john.doe@mail.com", first_name: "John", last_name: "Doe" }],
    error: null,
  };

  const updatedUser = { id: 1, email: "jane.doe@mail.com", first_name: "Jane", last_name: "Doe" };
  axios.put.mockResolvedValueOnce({ data: updatedUser });

  const store = createStore(
    combineReducers({ users: usersReducer }),
    { users: initialState },
    applyMiddleware(thunk)
  );

  await store.dispatch(updateUser(1, updatedUser));

  const state = store.getState().users;
  expect(state.users[0].first_name).toBe("Jane");
});

test("deleteUser dispatches DELETE_USER action", async () => {
  const initialState = {
    loading: false,
    users: [
      { id: 1, email: "john.doe@mail.com", first_name: "John", last_name: "Doe" },
      { id: 2, email: "jane.smith@mail.com", first_name: "Jane", last_name: "Smith" },
    ],
    error: null,
  };

  axios.delete.mockResolvedValueOnce({});

  const store = createStore(
    combineReducers({ users: usersReducer }),
    { users: initialState },
    applyMiddleware(thunk)
  );

  await store.dispatch(deleteUser(1));

  const state = store.getState().users;
  expect(state.users).toHaveLength(1);
  expect(state.users[0].id).toBe(2);
});