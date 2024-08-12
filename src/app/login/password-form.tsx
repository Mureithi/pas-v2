"use client";

import { Fragment, memo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LeanInput } from '../common/components/common';
// import { Loading } from '../common/components/spinner';
// import { sendResetPasswordEmail } from '../common/components/general/form-actions';
import useLoginStore from '../../store/loginStore';

const schema = yup.object({
  email: yup.string().email('Enter a valid email address').required('Email address is required'),
}).required();

const PasswordForm = () => {
  const { error, success, showSpinner } = useLoginStore();

  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    // sendResetPasswordEmail(data, { reset });
  };

  const renderError = () => {
    if (error) {
      return <div className="text-red-500">{error.message}</div>;
    }
    return null;
  };

  const renderSuccess = () => {
    if (success) {
      return <div className="text-green-500">{success.message}</div>;
    }
    return null;
  };

  const renderForm = () => {
    if (showSpinner) {
      return <Loading />;
    }
    return (
      <Fragment>
        {renderError()}
        {renderSuccess()}

        <LeanInput
          label="Email Address"
          placeholder="Enter an email address"
          icon="fa fa-user"
          name="email"
          type="email"
          register={register}
          error={errors?.email?.message}
        />

        <div className="mt-4">
          <button
            disabled={Object.keys(errors).length > 0}
            className="btn btn-primary w-full py-2 px-4 rounded-md text-white"
            type="submit"
          >
            Send Reset Link
          </button>
        </div>
      </Fragment>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-signin animate__animated animate__fadeIn">
      {renderForm()}
    </form>
  );
};

export default memo(PasswordForm);
