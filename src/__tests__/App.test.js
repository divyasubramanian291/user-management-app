import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // ensures toBeInTheDocument works
import { Provider } from 'react-redux';
import store from '../redux/store';
import App from '../App';

describe('App Component', () => {
  test('renders app without crashing and shows login button', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });
});
