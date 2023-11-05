import React, { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import PreferencesDialog from "./preferences";

const userNavigation = [
  { name: "Profile", href: "#" },
  { name: "Sign out", href: "/logout" },
];

const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");

const Appbar = () => {
  const { pathname } = useLocation();
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const storedUsername = userData && userData.name;

  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const openPreferencesDialog = () => {
    setIsPreferencesOpen(true);
  };

  const closePreferencesDialog = () => {
    setIsPreferencesOpen(false);
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setAuthenticated(!!authToken);
  }, []);

  const navigation = [
    { name: "signup", href: "/signup", current: false },
    { name: "signin", href: "/signin", current: false },
    ...(authenticated
      ? [
          {
            name: "Preferences",
            href: "#",
            current: false,
            onClick: openPreferencesDialog,
          },
        ]
      : []),
  ].filter(Boolean);

  return (
    <>
      <Disclosure as="nav" className="bg-white dark:bg-gray-900 rounded-md">
        {() => (
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 mr-3"
                alt="sportszaga Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                SportsZaga
              </span>
            </a>
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="hidden md:block">
                  <div className="flex items-baseline space-x-4">
                    {navigation.map((item) => {
                      const isCurrent = pathname.includes(item.href);

                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={item.onClick}
                          className={classNames(
                            isCurrent
                              ? "bg-slate-50 text-blue-700"
                              : "text-slate-500 hover:text-blue-600",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={isCurrent ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                    {authenticated && (
                      <span className="text-xl text-stone-100	">
                        Hello, {storedUsername}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="rounded-full bg-white p-1 text-gray-400 hover:text-blue-600">
                        MENU
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
      <PreferencesDialog
        isOpen={isPreferencesOpen}
        onClose={closePreferencesDialog}
        onSavePreferences={(selectedSports, selectedTeams) => {
          closePreferencesDialog();
        }}
      />
    </>
  );
};

export default Appbar;
