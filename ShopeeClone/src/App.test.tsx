import { test, describe, expect } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from './App';
import { afterEach } from 'node:test';
import { logScreen } from './utils/test';

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

  describe('Test verify homepage & header & fotter', () => {
    render(<App />, {
      wrapper: BrowserRouter
    }); //Render App trong môi trường nodejs;
    test('Verify Render Homepage', async () => {
      //Test title of the page
      await waitFor(
        () => {
          expect(document.querySelector('title')?.textContent).toBe('Shopee Clone | Ho Hoang Sang');
        },
        { timeout: 5000 }
      );
    });

    test('Test render Header component', async () => {
      await waitFor(
        () => {
          expect(document.getElementsByTagName('header')[0]).toBeInTheDocument();
        },
        { timeout: 2000 }
      );
    });
    test('Test render Footer component', async () => {
      await waitFor(
        () => {
          expect(document.querySelector('footer')).toHaveTextContent(/© 2023 Shopee. Tất cả các quyền được bảo lưu/i);
          expect(document.getElementsByTagName('footer')[0]).toBeInTheDocument();
        },
        { timeout: 2000 }
      );
    });
  });

  // test('Test render render app and trigger action navigate to Login/Register page', async () => {
  //   const loginBtn = screen.getByText(/Đăng nhập/i);

  //   if (loginBtn) {
  //     await userEvent.click(loginBtn);
  //     await waitFor(
  //       () => {
  //         expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee Clone');
  //         expect(document.querySelector('header')?.textContent).toMatch(/Đăng nhập/i);
  //         expect(screen.queryByText(/Bạn chưa có tài khoản?/i)).toBeInTheDocument();
  //       },
  //       { timeout: 2000 }
  //     );
  //   }
  //   // const registerBtn = screen.getByText(/Đăng ký/i);

  //   // if (registerBtn) {
  //   //   await userEvent.click(registerBtn);
  //   //   await waitFor(
  //   //     () => {
  //   //       expect(document.querySelector('title')?.textContent).toBe('Đăng ký | Shopee Clone');
  //   //       expect(document.querySelector('header')?.textContent).toMatch(/Đăng ký/i);
  //   //       expect(screen.queryByText(/Bạn đã có tài khoản?/i)).toBeInTheDocument();
  //   //     },
  //   //     { timeout: 2000 }
  //   //   );
  //   // }
  // });

  test('Test page 404', async () => {
    const badRoute = '/123/badroute';

    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );

    await logScreen();
  });
});
