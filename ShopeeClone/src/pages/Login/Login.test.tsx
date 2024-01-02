import '@testing-library/jest-dom/vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { path } from 'src/constants/path';
import { logScreen, renderWithRouter } from 'src/utils/test';
import { afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest';

describe('Login page', async () => {
  let unmoutAction: any;
  beforeEach(async () => {
    const { unmount } = renderWithRouter({ route: path.login });
    expect(await screen.findByPlaceholderText('Email')).toBeInTheDocument();
    expect(await screen.findByPlaceholderText('Password')).toBeInTheDocument();
    unmoutAction = unmount;
  });

  afterEach(() => {
    unmoutAction && unmoutAction();
  });

  test('Should display required error when value is invalid', async () => {
    const submitBtn = document.querySelector('form button[type="submit"]') as HTMLInputElement;

    if (submitBtn) {
      fireEvent.click(submitBtn);
      expect(await screen.findByText(/Vui lòng nhập email!/i)).toBeTruthy();
      expect(await screen.findByText(/Vui lòng nhập password!/i)).toBeTruthy();
    } else {
      throw new Error('Submit button not found!');
    }

    // await logScreen();
  });

  test('Should display matching error when email or password is invalid', async () => {
    const emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement;
    const passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement;
    const submitBtn = document.querySelector('form button[type="submit"]') as HTMLInputElement;

    fireEvent.input(emailInput, {
      target: {
        value: '123'
      }
    });

    fireEvent.input(passwordInput, {
      target: {
        value: '123'
      }
    });

    if (submitBtn) {
      fireEvent.click(submitBtn);

      await waitFor(
        async () => {
          expect(await screen.findByText(/Email không hợp lệ!/i)).toBeTruthy();
          expect(await screen.findByText(/Độ dài từ 6-160 ký tự/i)).toBeTruthy();
        },
        {
          timeout: 5000
        }
      );
    } else {
      throw new Error('Submit button not found!');
    }
  });
});
