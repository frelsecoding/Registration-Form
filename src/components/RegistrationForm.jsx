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
        <div>
            <h1>Registration Form</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Formik
                initialValues={{ name: '', mobileNumber: '', email: '', address: '', gender: '', password: '', birthdate: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <Field type="text" name="name" placeholder="Name" />
                            <ErrorMessage name="name" component="div" />
                        </div>
                        <div>
                            <Field type="text" name="mobileNumber" placeholder="Mobile Number" />
                            <ErrorMessage name="mobileNumber" component="div" />
                        </div>
                        <div>
                            <Field type="email" name="email" placeholder="Email" />
                            <ErrorMessage name="email" component="div" />
                        </div>
                        <div>
                            <Field type="text" name="address" placeholder="Address" />
                            <ErrorMessage name="address" component="div" />
                        </div>
                        <div>
                            <Field as="select" name="gender">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Field>
                            <ErrorMessage name="gender" component="div" />
                        </div>
                        <div>
                            <Field type="password" name="password" placeholder="Password" />
                            <ErrorMessage name="password" component="div" />
                        </div>
                        <div>
                            <Field type="date" name="birthdate" />
                            <ErrorMessage name="birthdate" component="div" />
                        </div>
                        <button type="submit" disabled={isSubmitting || status === 'loading'}>
                            {status === 'loading' ? 'Registering...' : 'Register'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default RegistrationForm;