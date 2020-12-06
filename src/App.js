import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/'>
          <h1>Home page</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;