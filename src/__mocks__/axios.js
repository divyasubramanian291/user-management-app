const axiosMock = {
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        data: [
          { id: 1, first_name: "Charlie", last_name: "Leeee", email: "charlie.lee@mail.com", avatar: "" },
          { id: 2, first_name: "Ethan", last_name: "Brown", email: "ethan.brown@mail.com", avatar: "" },
        ],
      },
    })
  ),
  post: jest.fn(() =>
    Promise.resolve({
      data: { token: "fake-token" },
    })
  ),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
  create: jest.fn(function () {
    return this;
  }),
};

export default axiosMock;