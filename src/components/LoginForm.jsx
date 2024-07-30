import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { loginUser, clearError } from '../redux/userSlice';

const validationSchema = Yup.object().shape({
    identifier: Yup.string().required('Email or Mobile Number is required'),
    password: Yup.string().required('Password is required'),
});

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, status } = useSelector((state) => state.user);

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const handleSubmit = (values, { setSubmitting }) => {
        dispatch(loginUser(values))
            .unwrap()
            .then(() => {
                setSubmitting(false);
                navigate('/dashboard');
            })
            .catch(() => {
                setSubmitting(false);
            });
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">Login</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Formik
                initialValues={{ identifier: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4 md:space-y-6">
                        <div>
                            <Field type="text" name="identifier" placeholder="Email or Mobile Number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            <ErrorMessage name="identifier" component="div" />
                        </div>
                        <div>
                            <Field type="password" name="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            <ErrorMessage name="password" component="div" />
                        </div>
                        <button type="submit" disabled={isSubmitting || status === 'loading'} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            {status === 'loading' ? 'Logging in...' : 'Login'}
                        </button>
                    </Form>
                )}
            </Formik>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginForm;