import Link from "next/link";
import Logo from "./Logo";
import { useAuth } from "../../lib/auth";
import { SpinnerFullPage } from "../Spinner";
import {
  ROUTE_CONFIGURATION,
  ROUTE_HOME,
  ROUTE_NEW_CATEGORY,
  ROUTE_NEW_CONTACT,
  ROUTE_NEW_PRIORITY,
} from "../../config";
import { useRouter } from "next/router";

const MainNavigation = () => {
  const { signOut } = useAuth();

  const router = useRouter();

  return (
    <div className="dark:divide-slate-700 divide-slate-300 divide-y sticky">
      <nav className="flex items-center justify-between p-6 bg-slate-100 dark:bg-slate-900">
        <Link href={ROUTE_HOME}>
          <a>
            <Logo />
          </a>
        </Link>

        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-base lg:flex-grow text-slate-500 dark:text-slate-400">
            <div
              className={`block lg:inline-block lg:mt-0 dark:hover:text-slate-200 hover:text-slate-800 mr-4 ${
                router.pathname.startsWith(ROUTE_HOME) &&
                router.pathname != ROUTE_NEW_CONTACT &&
                "dark:text-slate-200 text-slate-800"
              }`}
            >
              <Link href={ROUTE_HOME}>Contacts</Link>
            </div>

            <div
              className={`block lg:inline-block lg:mt-0 dark:hover:text-slate-200 hover:text-slate-800 mr-4 ${
                router.pathname == ROUTE_NEW_CONTACT &&
                "dark:text-slate-200 text-slate-800"
              }`}
            >
              <Link href={ROUTE_NEW_CONTACT}>New Contact</Link>
            </div>

            <div
              className={`block lg:inline-block lg:mt-0 dark:hover:text-slate-200 hover:text-slate-800 mr-4 ${
                router.pathname == ROUTE_NEW_CATEGORY &&
                "dark:text-slate-200 text-slate-800"
              }`}
            >
              <Link href={ROUTE_NEW_CATEGORY}>New Category</Link>
            </div>

            <div
              className={`block lg:inline-block lg:mt-0 dark:hover:text-slate-200 hover:text-slate-800 mr-4 ${
                router.pathname == ROUTE_NEW_PRIORITY &&
                "dark:text-slate-200 text-slate-800"
              }`}
            >
              <Link href={ROUTE_NEW_PRIORITY}>New Priority</Link>
            </div>

            <div
              className={`block lg:inline-block lg:mt-0 dark:hover:text-slate-200 hover:text-slate-800 mr-4 ${
                router.pathname == ROUTE_CONFIGURATION &&
                "dark:text-slate-200 text-slate-800"
              }`}
            >
              <Link href={ROUTE_CONFIGURATION}>Configuration</Link>
            </div>
          </div>

          <button
            onClick={signOut}
            className="inline-block btn btn-ghost btn-sm capitalize text-sm px-4 py-2 leading-none border rounded text-slate-400 border-slate-400 hover:border-transparent hover:text-white hover:bg-slate-600 mt-4 lg:mt-0"
          >
            Sign Out
          </button>
        </div>
      </nav>
      <div></div>
    </div>
  );
};

export default MainNavigation;
