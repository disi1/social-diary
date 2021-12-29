import { NextPage } from 'next';
import { FaLock } from 'react-icons/fa';
import { NextAppPageProps } from '../types/app';
import { useFormFields } from '../lib/utils';
import { useState } from 'react';
import Spinner from '../components/Spinner';
import { useAuth } from '../lib/auth';

// define the shape of the SignUp form's fields
type SignUpFieldProps = {
  email: string;
  password: string;
};

// the value we'd like to initialize the SignUp form with
const FORM_VALUES: SignUpFieldProps = {
  email: '',
  password: '',
};

const IndexPage: NextPage<NextAppPageProps> = ({}) => {
  const [values, handleChange, resetFormFields] =
    useFormFields<SignUpFieldProps>(FORM_VALUES);
  const { loading, signIn, signUp, user, loggedIn } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);

  const handleSumbit = async (event: React.FormEvent) => {
    event.preventDefault();
    isSignIn ? signIn!(values) : signUp!(values);
    resetFormFields();
  };

  return (
    <div className="h-screen bg-slate-100 dark:bg-slate-900 flex flex-col justify-center items-center relative">
      {/* App logo and tagline*/}
      <div className="w-full text-center mb-6 flex flex-col place-items-center">
        <div>
          <FaLock className="text-5xl shadow-sm text-sky-400" />
        </div>
        <h3 className="text-3xl text-gray-900 dark:text-white my-3">
          Social<strong>Diary</strong>
        </h3>
        <div className="text-sm text-slate-400">
          Please provide your <strong>email</strong> and{' '}
          <strong>password</strong> and {isSignIn ? 'Log In' : 'Sign Up'}
        </div>
      </div>

      {/* Sign Up & Sign In form */}
      <form className="w-full sm:w-1/2 xl:w-1/3" onSubmit={handleSumbit}>
        <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block font-semibold text-slate-500 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="h-12 px-4 py-2 bg-white rounded shadow-inner border-slate-300 w-full border  hover:border-slate-400"
              placeholder="Your Email"
              required
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block font-semibold text-slate-500 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="h-12 px-4 py-2 bg-white rounded shadow-inner border-slate-300 w-full border hover:border-slate-400"
              placeholder="Your password"
              required
              value={values.password}
              onChange={handleChange}
            />
          </div>

          {/*  Sign Up & Sign In form: Actions */}

          <div className="flex pt-4 gap-2">
            <button
              type="submit"
              className="flex-1 btn text-sm bg-slate-600 hover:bg-slate-800 border border-slate-600 hover:border-transparent text-white rounded w-full text-center shadow"
            >
              {isSignIn ? 'Log In' : 'Sign Up'}
            </button>
            <div className="flex-1 text-right">
              <small className="block text-slate-600">
                {isSignIn ? 'Not a member yet?' : 'Already a member?'}{' '}
              </small>
              <a
                className="block font-semibold"
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  setIsSignIn(!isSignIn);
                }}
              >
                {isSignIn ? 'Sign Up' : 'Log In'}
              </a>
            </div>
          </div>
        </div>
      </form>
      <div className="h-12 w-12 relative">{loading && <Spinner />}</div>
    </div>
  );
};

export default IndexPage;

IndexPage.defaultProps = {
  meta: {
    title: 'Social Diary - Sign Up',
  },
};
