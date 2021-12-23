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
    <div className="h-screen flex flex-col justify-center items-center relative">
      {/* App logo and tagline*/}
      <div className="w-full text-center mb-4 flex  flex-col place-items-center">
        <div>
          <FaLock className="text-gray-600 text-5xl shadow-sm" />
        </div>
        <h3 className="text-3xl text-gray-600">
          Social<strong>Diary</strong>
        </h3>
        <small>
          Please provide your <strong>email</strong> and{' '}
          <strong>password</strong> and {isSignIn ? 'Log In' : 'Sign Up'}
        </small>
      </div>

      {/* Sign Up & Sign In form */}
      <form className="w-full sm:w-1/2 xl:w-1/3" onSubmit={handleSumbit}>
        <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-semibold text-gray-500 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="h-12 px-4 py-2 bg-white rounded shadow-inner border-gray-300 w-full border  hover:border-gray-400"
              placeholder="Your Email"
              required
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-semibold text-gray-500 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="h-12 px-4 py-2 bg-white rounded shadow-inner border-gray-300 w-full border hover:border-gray-400"
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
              className="flex-1 text-sm px-4 py-2 bg-gray-500 hover:bg-gray-600 border border-gray-500 hover:border-transparent text-white font-bold py-3 rounded w-full text-center shadow"
            >
              {isSignIn ? 'Log In' : 'Sign Up'}
            </button>
            <div className="flex-1 text-right">
              <small className="block text-gray-600">
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
