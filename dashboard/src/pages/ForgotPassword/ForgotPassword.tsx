import { ContainerUnauthenticated } from "components";
// import { useNavigate } from "react-router-dom";
import { UnauthorizedRoutesEnum } from "routes/router";

export const ForgotPassword = () => {
  // const navigate = useNavigate();
  return (
    <ContainerUnauthenticated
      title="QR Capital"
      subTitle="Recupere sua conta"
      buttonText="Recuperar"
      handleButtonOnClick={() => {}}
    >
      <div className="rounded-md shadow-sm -space-y-px flex gap-5 flex-col">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="bg-raisin-black text-white placeholder-white focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 py-3 pr-12 sm:text-sm border-gray-300 rounded-lg"
            placeholder="Email"
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <div className="text-sm">
          <a
            href={UnauthorizedRoutesEnum.SignIn}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Lembrou-se da sua senha?
          </a>
        </div>
      </div>
    </ContainerUnauthenticated>
  );
};
