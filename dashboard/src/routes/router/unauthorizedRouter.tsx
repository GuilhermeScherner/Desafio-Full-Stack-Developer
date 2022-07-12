import { Navigate, RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import { SuspenseLoader } from "components";

const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

export const SignIn = Loader(
  lazy(() =>
    import("pages").then((module) => ({
      default: module.SignIn,
    }))
  )
);

const ForgotPassword = Loader(
  lazy(() =>
    import("pages").then((module) => ({
      default: module.ForgotPassword,
    }))
  )
);
export enum UnauthorizedRoutesEnum {
  SignIn = "sign-in",
  ForgotPassword = "forgot-password",
}

export const UnauthorizedRouter: RouteObject[] = [
  {
    path: "",
    element: <Navigate to={UnauthorizedRoutesEnum.SignIn} />,
  },
  {
    path: UnauthorizedRoutesEnum.SignIn,
    element: <SignIn />,
  },
  {
    path: UnauthorizedRoutesEnum.ForgotPassword,
    element: <ForgotPassword />,
  },
];
