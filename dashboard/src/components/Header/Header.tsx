import React, { Fragment, useEffect, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { AuthorizedRouter } from "routes/router";
import {
  addRatesReset,
  addRatesThunk,
  listSymbolsDataReset,
  listSymbolsThunk,
  useAppDispatch,
  useTypedSelector,
} from "store";
import { shallowEqual } from "react-redux";
import { RequestStatusEnum } from "store/enums";
import { useLoading } from "hooks";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement>(null);
  const [startLoading, stopLoading] = useLoading();
  const listSymbolsState = useTypedSelector(
    (state) => state.rates.listSymbolsState,
    shallowEqual
  );

  const addRatesState = useTypedSelector(
    (state) => state.rates.addRatesState,
    shallowEqual
  );
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/user", { replace: true });
  };
  const handleSearchCrypto = _.debounce(function (e) {
    if (e.target.value === "") {
      dispatch(listSymbolsDataReset());
    } else {
      dispatch(listSymbolsThunk({ query: e.target.value }));
    }
  }, 1000);

  const handleSelectSymbol = (id: string) => {
    dispatch(addRatesThunk({ id }));
  };

  useEffect(() => {
    if (addRatesState.status === RequestStatusEnum.LOADING) startLoading();
    else {
      stopLoading();
      if (
        addRatesState.status === RequestStatusEnum.SUCCESS ||
        addRatesState.status === RequestStatusEnum.FAILED
      ) {
        dispatch(addRatesReset());
        dispatch(listSymbolsDataReset());
        if (ref.current) ref.current.value = "";
      }
    }
  }, [addRatesState.status, dispatch, startLoading, stopLoading]);

  return (
    <Popover className="relative bg-raisin-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-2 divide-y-2 divide-gray-500">
        <div className="flex gap-40 items-center border-gray-100 pt-3 md:justify-start md:space-x-10">
          <div className="-mr-2 -my-2 mb-1 md:hidden">
            <Popover.Button className="bg-raisin-black rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          <div className="w-80 border-b-2 mb-2 border-gray-500">
            <div className="bg-gray-100">
              <div className="max-w-md mx-auto">
                <label
                  htmlFor="crypto"
                  className="-ml-10 relative text-gray-400 focus-within:text-gray-600 block"
                >
                  <div className="relative bg-raisin-black">
                    <div className="h-10 flex rounded items-center">
                      <SearchIcon className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3" />
                      <input
                        ref={ref}
                        type="crypto"
                        name="crypto"
                        id="crypto"
                        onChange={handleSearchCrypto}
                        placeholder="Pesquise"
                        className="form-input border-transparent focus:border-transparent focus:ring-0 w-full border-0 pl-14 bg-raisin-black text-white placeholder:text-white"
                      />
                    </div>
                    {listSymbolsState ? (
                      <div className="absolute rounded shadow bg-raisin-black overflow-hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200">
                        {listSymbolsState.data?.map((value, index: number) => (
                          <div key={index} className="cursor-pointer group">
                            <button
                              onClick={() => handleSelectSymbol(value.id)}
                              className="w-full text-start pl-3 text-white block p-2 border-b-2 border-gray-700 group-hover: group-hover:bg-gray-700"
                            >
                              {value.name}
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="hidden mb-2 ml-0 md:flex items-center justify-end md:flex-1 lg:w-0">
            <button
              onClick={handleLogOut}
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-neon-blue hover:bg-indigo-700"
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-raisin-black divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <img
                    className="h-8 w-auto "
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
                    alt="Logo"
                  />
                  <h1 className="text-white text-2xl font-semibold">
                    QR Capital
                  </h1>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-raisin-black rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {AuthorizedRouter.filter((item) => item.visibleOnMenu).map(
                    (item) => (
                      <a
                        key={item.name}
                        href={item.path}
                        className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                      >
                        <item.icon
                          className="flex-shrink-0 h-6 w-6 text-neon-blue"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-base font-medium text-white">
                          {item.name}
                        </span>
                      </a>
                    )
                  )}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div>
                <button
                  onClick={handleLogOut}
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-neon-blue hover:bg-indigo-700"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
