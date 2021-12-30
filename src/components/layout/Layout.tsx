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

  if (loading) {
    return <SpinnerFullPage />;
  }

  return (
    <>
      {user && (
        <Fragment>
          <MainNavigation />
          <main className="h-screen bg-slate-100 dark:bg-slate-900">{props.children}</main>
        </Fragment>
      )}
    </>
  );
};

export default Layout;
