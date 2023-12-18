import { screen, waitFor, type waitForOptions } from '@testing-library/react';
import { expect } from 'vitest';

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
