import { Fragment } from 'react';
import useRouteElement from './hooks/useRouteElement';

function App() {
  const routeElement = useRouteElement();

  return <Fragment>{routeElement}</Fragment>;
}

export default App;
