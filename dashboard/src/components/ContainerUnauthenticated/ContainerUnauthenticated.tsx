import { LockClosedIcon } from "@heroicons/react/solid";

type Props = {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  buttonText?: string;
  handleButtonOnClick?: (event: React.FormEvent<HTMLFormElement>) => void;
};
export const ContainerUnauthenticated = ({
  title,
  subTitle,
  children,
  buttonText,
  handleButtonOnClick,
}: Props) => {
  return (
    <>
      <div className="min-h-full flex items-center content-center justify-center py-12 px-16 sm:px-6 md:px-6 lg:px-16">
        <div className="max-w-md w-full space-y-8 -mt-20">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
              alt="Logo"
            />
            <h1 className="mt-6 text-center text-4xl font-bold text-indigo-100">
              {title}
            </h1>
            {subTitle && (
              <h3 className="mt-2 text-center text-sm text-white">
                {subTitle}
              </h3>
            )}
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleButtonOnClick}>
            {children}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-neon-blue hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-300 group-hover:text-indigo-100"
                    aria-hidden="true"
                  />
                </span>
                {buttonText ? buttonText : "Ok"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
