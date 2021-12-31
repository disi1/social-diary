import { Fragment, useEffect } from "react";

import MainNavigation from "./MainNavigation";
import { useAuth } from "../../lib/auth";
import Router from "next/router";
import { ROUTE_AUTH } from "../../config";
import { SpinnerFullPage } from "../Spinner";

const Layout = (props: any) => {
  const { user, userLoading, loading, loggedIn } = useAuth();

  useEffect(() => {
    if (!userLoading && !loggedIn) {
      Router.push(ROUTE_AUTH);
    }
  }, [userLoading, loggedIn]);

  return (
    <>
      {user && (
        <div className="h-screen flex flex-col">
          <MainNavigation />
          <main className="h-full bg-slate-100 dark:bg-slate-900">{props.children}</main>
          {(loading) && <SpinnerFullPage />}
          <footer className="flex flex-col sm:flex-row items-center justify-center py-3 text-slate-500 dark:text-slate-400 border-t bg-slate-100 dark:bg-slate-900 text-base-content border-slate-700 dark:border:slate-300">
            <p>Build with &#10084; by Diana Ilie</p>
            <div className="divider divider-vertical text-slate-700 dark:text:slate-300"/>
            <p>2021</p>
          </footer>
        </div>
      )}
    </>
  );
};

export default Layout;
