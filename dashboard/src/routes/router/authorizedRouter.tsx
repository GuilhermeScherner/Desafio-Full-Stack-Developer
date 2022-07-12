import { Navigate, RouteObject } from "react-router-dom";
import { Dashboard } from "pages";
import { ViewGridIcon } from "@heroicons/react/outline";
export enum AuthorizedRoutesEnum {
  Dashboard = "dashboard",
}

export interface RouteType extends RouteObject {
  name?: string;
  icon?: any;
  visibleOnMenu: boolean;
}

export const AuthorizedRouter: RouteType[] = [
  {
    path: "",
    element: <Navigate to={AuthorizedRoutesEnum.Dashboard} />,
    visibleOnMenu: false,
  },
  {
    path: AuthorizedRoutesEnum.Dashboard,
    element: <Dashboard />,
    children: [],
    name: "Dashboard",
    icon: ViewGridIcon,
    visibleOnMenu: true,
  },
];
