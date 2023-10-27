import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Fragment, useContext, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from './components/ErrorBoundary';
import AppProvider, { AppContext } from './contexts/app.context';
import useRouteElement from './hooks/useRouteElement';
import { localStorageEventTarget } from './utils/auth';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  const routeElement = useRouteElement();
  const { clearData } = useContext(AppContext);

  useEffect(() => {
    localStorageEventTarget.addEventListener('clearData', () => {
      clearData();
    });

    return () => {
      localStorageEventTarget.removeEventListener('clearData', clearData);
    };
  }, [clearData]);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <AppProvider>{routeElement}</AppProvider>
        </ErrorBoundary>
        <ToastContainer autoClose={1500} closeOnClick />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
