'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import classNames from 'classnames';
import { useState, ReactElement } from 'react';
import { useRouter } from 'next/navigation';

type FormData = {
  username: string;
  password: string;
};

type TProps = {
	className?: string;
	callbackUrl: string;
};

const SignInForm = ( { className, callbackUrl, }: TProps ) => {
  const { register, handleSubmit, formState, } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async ( data: FormData ) => {
    console.log( data );
    const result = await signIn( 'credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
      callbackUrl: callbackUrl ?? `${ window.location.origin }/client`,
    } );
    if ( !result?.ok ){
      setLoginMessage( <span className="text-red-600">Invalid username or password.</span> );
    }
    else {
      setLoginMessage( <span className="text-green-600">Login successful</span> );
      router.push( callbackUrl ?? `${ window.location.origin }/client` );
    }
  };

  const [ loginMessage, setLoginMessage, ] = useState<ReactElement | null>( null );

  return (
    <form
      onSubmit={ handleSubmit( onSubmit ) }
      className={ classNames( [ 'bg-white p-6 rounded-lg shadow-md w-96 text-black flex flex-col mt-auto mb-auto', className, ] ) }
    >
      <h2 className="text-2xl font-bold mb-5 text-center">Sign In</h2>

      <div className="mb-4 flex flex-col">
        <label className="block text-sm font-medium text-gray-600 mb-2">
            Username
        </label>
        <input
          className="rounded-[10px] p-[10px] border-[2px] border-gray-300 bg-gray-100"
          { ...register( 'username', { required: 'Username is required', } ) }
          placeholder="Enter your username"
          autoComplete="new-password"
        />
        { formState.errors.username && (
          <span className="text-red-600 text-sm">
            { formState.errors.username.message }
          </span>
        ) }
      </div>

      <div className="flex flex-col mb-[50px]">
        <label className="block text-sm font-medium text-gray-600 mb-2">
            Password
        </label>
        <input
          className="rounded-[10px] p-[10px] border-[2px] border-gray-300 bg-gray-100"
          type="password"
          { ...register( 'password', { required: 'Password is required', } ) }
          placeholder="Enter your password"
        />
        { formState.errors.password && (
          <span className="text-red-600 text-sm">
            { formState.errors.password.message }
          </span>
        ) }
      </div>

      <div className="flex items-center justify-between">
        <Link
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
          href="/"
        >Cancel</Link>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
        >
            Sign In
        </button>
      </div>
      <div className="text-center p-[10px] h-[30px]">
        { loginMessage }
      </div>
    </form>
  );
};

export default SignInForm;