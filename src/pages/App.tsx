import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../components/header";
import PrivateRoute from "../components/private-route";
import './App.css';
import Login from "./login";
import Dashboard from "./dashboard";
import Game from "./game";
import { QueryClientProvider, QueryClient } from 'react-query';

const App: React.FC = (): React.ReactElement => {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Header />
        <div className="main container">
          <Router>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute exact path="/">
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute exact path="/game">
                <Game />
              </PrivateRoute>
            </Switch>
          </Router>
        </div>
      </QueryClientProvider>
    </div>
  );
}

export default App;
