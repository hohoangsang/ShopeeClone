import { Fragment, useContext, useEffect } from 'react';
import useRouteElement from './hooks/useRouteElement';
import { AppContext } from './contexts/app.context';
import { localStorageEventTarget } from './utils/auth';

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

  return <Fragment>{routeElement}</Fragment>;
}

export default App;
