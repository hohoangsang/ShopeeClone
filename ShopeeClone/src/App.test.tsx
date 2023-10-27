import { test, describe, expect, beforeEach } from 'vitest';
import { prettyDOM, render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// expect.extend(matchers);

describe('Test App', () => {
  beforeEach(() => {
    cleanup();
  });

  test('App render and navigate', async () => {
    render(<App />, {
      wrapper: BrowserRouter
    }); //Render App trong môi trường nodejs

    await waitFor(() => screen.debug(document.body.parentElement as HTMLElement, 999999999), {
      timeout: 2000
    });
  });
});
