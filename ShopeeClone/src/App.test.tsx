import { test, describe, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('Test App', () => {
  render(<App />, {
    wrapper: BrowserRouter
  }); //Render App trong môi trường nodejs

  test('Test display right Header Component', async () => {
    /**
     * waitfor sẽ run callback 1 vài lần cho đến khi hết thời gian timeout hoặc interval
     * timeout mặc định là 1000ms ~~ 1 giây
     * interval mặc định là 50ms
     * callback sẽ dừng khi hết timeout hoặc callback thực thi xong
     */

    //Verify app render vào đúng trang chủ
    await waitFor(
      () => {
        expect(document.querySelector('title')?.textContent).toBe('Shopee Clone | Ho Hoang Sang');
        expect(document.querySelector('footer')).toHaveTextContent(/Quốc gia & Khu vực/i);
      },
      {
        timeout: 2000 //2 giay
      }
    );
  });
  screen.debug(document.body.parentElement as HTMLElement, 999999999);
  // test('App render and navigate', async () => {

  // });
});
