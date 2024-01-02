import '@testing-library/jest-dom/vitest';
import { cleanup, screen, waitFor } from '@testing-library/react';
import { afterEach } from 'node:test';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import App from './App';
import { path } from './constants/path';
import { logScreen, renderWithRouter, testScreen } from './utils/test';

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

  testScreen({
    title: 'Test verify homepage & header & footer',
    document: {
      ui: <App />,
      wrapper: BrowserRouter
    },
    testFn: async () => {
      await waitFor(
        () => {
          expect(document.querySelector('title')?.textContent).toBe('Shopee Clone | Ho Hoang Sang');
        },
        { timeout: 5000 }
      );

      //Test header
      await waitFor(
        () => {
          expect(document.getElementsByTagName('header')[0]).toBeInTheDocument();
        },
        { timeout: 2000 }
      );

      //Test footer
      await waitFor(
        () => {
          expect(document.querySelector('footer')).toHaveTextContent(/© 2023 Shopee. Tất cả các quyền được bảo lưu/i);
          expect(document.getElementsByTagName('footer')[0]).toBeInTheDocument();
        },
        { timeout: 2000 }
      );
    }
  });

  test('Test render render app and trigger action navigate to Login/Register page', async () => {
    const { userEvent } = renderWithRouter({ route: '/' });
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

      // await logScreen();
    }
    // const registerBtn = screen.getByText(/Đăng ký/i);
    // if (registerBtn) {
    //   await userEvent.click(registerBtn);
    //   await waitFor(
    //     () => {
    //       expect(document.querySelector('title')?.textContent).toBe('Đăng ký | Shopee Clone');
    //       expect(document.querySelector('header')?.textContent).toMatch(/Đăng ký/i);
    //       expect(screen.queryByText(/Bạn đã có tài khoản?/i)).toBeInTheDocument();
    //     },
    //     { timeout: 2000 }
    //   );
    // }
  });

  testScreen({
    title: 'Test page 404',
    document: {
      ui: (
        <MemoryRouter initialEntries={['/123/badroute']}>
          <App />
        </MemoryRouter>
      )
    },
    testFn: async () => {
      await logScreen();
    }
  });

  test('Render register page at the first point access to webpage', async () => {
    renderWithRouter({ route: path.register });

    await waitFor(
      () => {
        expect(screen.getByText(/bạn đã có tài khoản?/i)).toBeInTheDocument();
      },
      {
        timeout: 5000
      }
    );
  });
});
