import { Navigate, RouteObject } from "react-router-dom";
import { AuthorizedRouter, UnauthorizedRouter } from "./router";
import { Authenticated } from "components";
import { ExtendedSidebar, Unauthenticated } from "layouts";

export const routes: RouteObject[] = [
  {
    path: "",
    element: <Navigate to={"home"} replace />,
  },
  {
    path: "home",
    element: (
      <Authenticated>
        <ExtendedSidebar />
      </Authenticated>
    ),
    children: [...AuthorizedRouter],
  },
  {
    path: "user",
    element: <Unauthenticated />,
    children: [...UnauthorizedRouter],
  },
];
