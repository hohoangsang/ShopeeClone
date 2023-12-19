import { render, screen, waitFor, type waitForOptions } from '@testing-library/react';
import { Fragment, ReactElement } from 'react';
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

type CustomTest = {
  title: string;
  document: { wrapper?: React.JSXElementConstructor<{ children: React.ReactElement }>; ui: ReactElement };
  callBack: () => Promise<void>;
};

export const customTest = (object: CustomTest) => {
  const { title, callBack, document } = object;
  const { ui, wrapper } = document;

  return test(title, async () => {
    const { unmount } = render(ui, {
      wrapper: wrapper || Fragment
    });

    await callBack();

    unmount();
  });
};
