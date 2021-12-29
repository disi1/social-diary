import Link from "next/link";

import Logo from "./Logo";
import { useAuth } from "../../lib/auth";
import { SpinnerFullPage } from "../Spinner";
import {ROUTE_HOME, ROUTE_NEW_CATEGORY, ROUTE_NEW_CONTACT, ROUTE_NEW_PRIORITY} from "../../config";

const MainNavigation = () => {
  const {
    loading,
    signOut,
  } = useAuth();

  if (loading) {
    return <SpinnerFullPage />;
  }

  return (
    <nav className="flex items-center justify-between flex-wrap p-6 bg-transparent sticky">
      <Link href={ROUTE_HOME}>
        <a>
          <Logo />
        </a>
      </Link>

      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <div className="block mt-4 lg:inline-block lg:mt-0 text-slate-600 hover:text-slate-900 mr-4">
            <Link href={ROUTE_HOME}>Contacts</Link>
          </div>
          <div className="block mt-4 lg:inline-block lg:mt-0 text-slate-600 hover:text-slate-900 mr-4">
            <Link href={ROUTE_NEW_CONTACT}>Add New Contact</Link>
          </div>
          <div className="block mt-4 lg:inline-block lg:mt-0 text-slate-600 hover:text-slate-900 mr-4">
            <Link href={ROUTE_NEW_CATEGORY}>Add New Category</Link>
          </div>
          <div className="block mt-4 lg:inline-block lg:mt-0 text-slate-600 hover:text-slate-900 mr-4">
            <Link href={ROUTE_NEW_PRIORITY}>Add New Priority</Link>
          </div>
        </div>
        <button
          onClick={signOut}
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-slate-600 border-slate-500 hover:border-transparent hover:text-white hover:bg-slate-500 mt-4 lg:mt-0"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}

export default MainNavigation;
