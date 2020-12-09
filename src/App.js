import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';

import LoginPage from './containers/Signin';
import SignupPage from './containers/Signup';
import AppBar from './components/AppBar/AppBar';
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <HashRouter>
      <ToastProvider>
      <AppBar></AppBar>
      <Switch>
      
      <Route path='/auth/signin'>
            <LoginPage></LoginPage>
          </Route>
          <Route path='/auth/signup'>
            <SignupPage></SignupPage>
          </Route>
        <Route path='/'>
          
        </Route>
      </Switch>
      </ToastProvider>
    </HashRouter>
  );
}

export default App;