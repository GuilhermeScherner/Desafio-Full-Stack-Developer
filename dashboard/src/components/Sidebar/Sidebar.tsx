import { AuthorizedRouter } from "routes/router";

export const Sidebar = () => {
  return (
    <>
      <div className="hidden w-56 min-w-max border-r-2 border-gray-800 absolute sm:relative bg-raisin-black shadow md:h-full flex-col justify-between hidden sm:flex">
        <div className="pl-4">
          <div className="h-16 w-full pt-4 flex items-center gap-3">
            <img
              className="h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
              alt="Logo"
            />
            <h1 className="text-white text-2xl font-semibold">QR Capital</h1>
          </div>
          <ul className="mt-16">
            {AuthorizedRouter.filter((item) => item.visibleOnMenu).map(
              (item, index) => (
                <li
                  key={index}
                  className="flex w-full py-3 justify-between text-gray-300 hover:text-gray-500 hover:bg-gray-900 cursor-pointer items-center mb-6"
                >
                  <div className="flex items-center">
                    <a
                      key={item.name}
                      href={item.path}
                      className="-m-3 p-3 flex items-center rounded-md"
                    >
                      <item.icon
                        className="flex-shrink-0 h-6 w-6 text-neon-blue"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-base font-medium text-white">
                        {item.name}
                      </span>
                    </a>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
