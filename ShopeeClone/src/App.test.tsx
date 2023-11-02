import { test, describe, expect } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { afterEach } from 'node:test';

describe('Test App', () => {
  afterEach(() => {
    cleanup();
  });

  /**
   * waitfor sẽ run callback 1 vài lần cho đến khi hết thời gian timeout hoặc interval
   * timeout mặc định là 1000ms ~~ 1 giây
   * interval mặc định là 50ms
   * callback sẽ dừng khi hết timeout hoặc callback thực thi xong
   */

  render(<App />, {
    wrapper: BrowserRouter
  }); //Render App trong môi trường nodejs;

  test('Verify Render Homepage', async () => {
    //Test title of the page
    await waitFor(
      () => {
        expect(document.querySelector('title')?.textContent).toBe('Shopee Clone | Ho Hoang Sang');
      },
      { timeout: 2000 }
    );
    // screen.debug(document.body.parentElement as HTMLElement, 999999999);
  });

  test('Test render Header Component and trigger action navigate to Login/Register page', async () => {
    const loginBtn = screen.getByText(/Đăng nhập/i);

    if (loginBtn) {
      await userEvent.click(loginBtn);
      await waitFor(
        () => {
          expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee Clone');
          expect(document.querySelector('header')?.textContent).toMatch(/Đăng nhập/i);
          expect(screen.queryByText(/Bạn chưa có tài khoản?/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
      );
    }

    screen.debug(document.body.parentElement as HTMLElement, 9999999999);

    const registerBtn = screen.getByText(/Đăng ký/i);

    if (registerBtn) {
      await userEvent.click(registerBtn);
      await waitFor(
        () => {
          expect(document.querySelector('title')?.textContent).toBe('Đăng ký | Shopee Clone');
          expect(document.querySelector('header')?.textContent).toMatch(/Đăng ký/i);
          expect(screen.queryByText(/Bạn đã có tài khoản?/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
      );
    }
  });

  test('Test render Footer component', async () => {
    await waitFor(
      () => {
        expect(document.querySelector('footer')).toHaveTextContent(/© 2023 Shopee. Tất cả các quyền được bảo lưu/i);
      },
      { timeout: 2000 }
    );
  });
});
