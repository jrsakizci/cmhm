import React, { FC } from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
const PrivateRoute: FC<RouteProps> = ({ children, ...rest }: RouteProps) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
