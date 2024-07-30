import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { registerUser, clearError } from '../redux/userSlice';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    mobileNumber: Yup.string().required('Mobile number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    address: Yup.string().required('Address is required'),
    gender: Yup.string().required('Gender is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    birthdate: Yup.date().required('Birthdate is required'),
});

function RegistrationForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, status } = useSelector((state) => state.user);

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const handleSubmit = (values, { setSubmitting }) => {
        dispatch(registerUser(values))
            .then((result) => {
                if (registerUser.fulfilled.match(result)) {
                    setSubmitting(false);
                    navigate('/login');
                } else {
                    setSubmitting(false);
                }
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
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create an account</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Formik
                initialValues={{ name: '', mobileNumber: '', email: '', address: '', gender: '', password: '', birthdate: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4 md:space-y-6">
                        <div>
                            <Field type="text" name="name" placeholder="Name"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            <ErrorMessage name="name" component="div" className="text-red-500 text-xs rounded-lg"/>
                        </div>
                        <div>
                            <Field type="text" name="mobileNumber" placeholder="Mobile Number"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            <ErrorMessage name="mobileNumber" component="div"
                                          className="text-red-500 text-xs rounded-lg"/>
                        </div>
                        <div>
                            <Field type="email" name="email" placeholder="Email"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            <ErrorMessage name="email" component="div" className="text-red-500 text-xs rounded-lg"/>
                        </div>
                        <div>
                            <Field type="text" name="address" placeholder="Address"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            <ErrorMessage name="address" component="div" className="text-red-500 text-xs rounded-lg"/>
                        </div>
                        <div>
                            <Field as="select" name="gender"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Field>
                            <ErrorMessage name="gender" component="div" className="text-red-500 text-xs rounded-lg"/>
                        </div>
                        <div>
                            <Field type="password" name="password" placeholder="Password"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            <ErrorMessage name="password" component="div" className="text-red-500 text-xs rounded-lg"/>
                        </div>
                        <div>
                            <Field type="date" name="birthdate"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            <ErrorMessage name="birthdate" component="div" className="text-red-500 text-xs rounded-lg"/>
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="terms" aria-describedby="terms" type="checkbox"
                                       className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                       required=""/>
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept
                                    the <a
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                        href="#">Terms and Conditions</a></label>
                            </div>
                        </div>
                        <button type="submit" disabled={isSubmitting || status === 'loading'}
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            {status === 'loading' ? 'Registering...' : 'Register'}
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

export default RegistrationForm;