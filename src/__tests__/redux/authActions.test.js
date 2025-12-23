import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import { login, logout, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../../redux/authActions";
import authReducer from "../../redux/authReducer";

jest.mock("axios");

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  jest.clearAllMocks();
});

test("login action dispatches LOGIN_REQUEST initially", async () => {
  axios.get.mockResolvedValueOnce({ 
    data: [{ token: "fake-token", name: "Charlie Leeee" }] 
  });

  const store = createStore(
    combineReducers({ auth: authReducer }),
    applyMiddleware(thunk)
  );

  const promise = store.dispatch(login("charlie.lee@mail.com", "cityslicka", true));

  // Check initial state after dispatch
  const stateAfterRequest = store.getState().auth;
  expect(stateAfterRequest.loading).toBe(true);

  await promise;
});

test("login dispatches LOGIN_SUCCESS on valid credentials", async () => {
  axios.get.mockResolvedValueOnce({ 
    data: [{ token: "fake-token", name: "Charlie Leeee" }] 
  });

  const store = createStore(
    combineReducers({ auth: authReducer }),
    applyMiddleware(thunk)
  );

  await store.dispatch(login("charlie.lee@mail.com", "cityslicka", true));

  const state = store.getState().auth;
  expect(state.token).toBe("fake-token");
  expect(state.userName).toBe("Charlie Leeee");
  expect(state.error).toBeNull();
});

test("login stores token in localStorage when rememberMe is true", async () => {
  axios.get.mockResolvedValueOnce({ 
    data: [{ token: "fake-token", name: "Charlie Leeee" }] 
  });

  const store = createStore(
    combineReducers({ auth: authReducer }),
    applyMiddleware(thunk)
  );

  await store.dispatch(login("charlie.lee@mail.com", "cityslicka", true));

  const stored = JSON.parse(localStorage.getItem("auth"));
  expect(stored.token).toBe("fake-token");
  expect(stored.userName).toBe("Charlie Leeee");
});

test("login stores token in sessionStorage when rememberMe is false", async () => {
  axios.get.mockResolvedValueOnce({ 
    data: [{ token: "fake-token", name: "John Doe" }] 
  });

  const store = createStore(
    combineReducers({ auth: authReducer }),
    applyMiddleware(thunk)
  );

  await store.dispatch(login("john@example.com", "password", false));

  const stored = JSON.parse(sessionStorage.getItem("auth"));
  expect(stored.token).toBe("fake-token");
  expect(stored.userName).toBe("John Doe");
});

test("login dispatches LOGIN_FAIL on invalid credentials", async () => {
  axios.get.mockResolvedValueOnce({ data: [] });

  const store = createStore(
    combineReducers({ auth: authReducer }),
    applyMiddleware(thunk)
  );

  await store.dispatch(login("invalid@example.com", "wrongpass", false));

  const state = store.getState().auth;
  expect(state.token).toBeNull();
  expect(state.error).toBe("Login failed");
});

test("login dispatches LOGIN_FAIL when axios throws error", async () => {
  axios.get.mockRejectedValueOnce({ 
    response: { data: { error: "Server error" } } 
  });

  const store = createStore(
    combineReducers({ auth: authReducer }),
    applyMiddleware(thunk)
  );

  await store.dispatch(login("test@example.com", "password", false));

  const state = store.getState().auth;
  expect(state.token).toBeNull();
  expect(state.error).toBe("Server error");
});

test("logout clears auth state and storage", async () => {
  localStorage.setItem("auth", JSON.stringify({ token: "test-token", userName: "Test" }));
  
  const store = createStore(
    combineReducers({ auth: authReducer }),
    applyMiddleware(thunk)
  );

  store.dispatch(logout());

  const state = store.getState().auth;
  expect(state.token).toBeNull();
  expect(state.userName).toBe("");
  expect(localStorage.getItem("auth")).toBeNull();
});

test("logout clears sessionStorage if it has auth data", async () => {
  sessionStorage.setItem("auth", JSON.stringify({ token: "test-token", userName: "Test" }));
  
  const store = createStore(
    combineReducers({ auth: authReducer }),
    applyMiddleware(thunk)
  );

  store.dispatch(logout());

  expect(sessionStorage.getItem("auth")).toBeNull();
});