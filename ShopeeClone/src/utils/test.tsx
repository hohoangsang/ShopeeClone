import { render, screen, waitFor, type waitForOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Fragment, ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { TestScreenProps } from 'src/@types/test.type';
import App from 'src/App';
import { expect, test } from 'vitest';

const delay = (time: number) =>
  new Promise((resolve) => {
    return setTimeout(() => {
      resolve(true);
    }, time);
  });

export const logScreen = async (
  node: HTMLElement = document.body.parentElement as HTMLElement,
  options?: waitForOptions
) => {
  const { timeout = 3000 } = options || {};
  await waitFor(
    async () => {
      expect(await delay(timeout - 200)).toBe(true);
    },
    {
      ...options,
      timeout
    }
  );

  screen.debug(node, 9999999);
};

export const renderWithRouter = ({ route = '/' }) => {
  window.history.pushState({}, 'Test page', route);

  return {
    userEvent,
    ...render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
  };
};

export const testScreen = (object: TestScreenProps) => {
  const { title, testFn, document } = object;
  const { ui = <App />, wrapper = Fragment } = document;

  return test(title, async () => {
    const { unmount } = render(ui, {
      wrapper
    });

    await testFn();

    unmount();
  });
};
