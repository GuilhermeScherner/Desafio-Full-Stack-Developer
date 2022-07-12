import { ContainerUnauthenticated } from "components";
import { useNavigate } from "react-router-dom";
import { UnauthorizedRoutesEnum } from "routes/router";
import { useLoading } from "hooks";
import { useCallback, useEffect } from "react";
import {
  loginReset,
  loginThunk,
  useAppDispatch,
  useTypedSelector,
} from "store";
import { RequestStatusEnum } from "store/enums";
import { shallowEqual } from "react-redux";

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginState = useTypedSelector(
    (state) => state.user.loginState,
    shallowEqual
  );
  const [startLoading, stopLoading] = useLoading();

  const onSubmitLogin = useCallback(
    (event: any) => {
      event.preventDefault();
      const request = {
        email: event.target[0].value,
        password: event.target[1].value,
      };
      dispatch(loginThunk(request));
    },
    [dispatch]
  );

  useEffect(() => {
    if (loginState.status === RequestStatusEnum.LOADING) startLoading();
    else {
      stopLoading();
      if (
        loginState.status === RequestStatusEnum.FAILED ||
        loginState.status === RequestStatusEnum.SUCCESS
      )
        dispatch(loginReset());
      if (loginState.status === RequestStatusEnum.SUCCESS)
        navigate("/home", { replace: true });
    }
  }, [dispatch, loginState.status, navigate, startLoading, stopLoading]);

  return (
    <ContainerUnauthenticated
      title="QR Capital"
      subTitle="Entre na sua conta"
      buttonText="Entrar"
      handleButtonOnClick={onSubmitLogin}
    >
      <div className="rounded-md shadow-sm -space-y-px flex gap-5 flex-col">
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="bg-raisin-black text-white placeholder-white focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 py-3 pr-12 sm:text-sm border-gray-300 rounded-lg"
            placeholder="Email"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="bg-raisin-black text-white placeholder-white focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 py-3 pr-12 sm:text-sm border-gray-300 rounded-lg"
            placeholder="Senha"
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <div className="text-sm">
          <a
            href={UnauthorizedRoutesEnum.ForgotPassword}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Esqueceu sua senha?
          </a>
        </div>
      </div>
    </ContainerUnauthenticated>
  );
};
