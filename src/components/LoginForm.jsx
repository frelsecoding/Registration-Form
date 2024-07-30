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
        <div>
            <h1>Login</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Formik
                initialValues={{ identifier: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <Field type="text" name="identifier" placeholder="Email or Mobile Number" />
                            <ErrorMessage name="identifier" component="div" />
                        </div>
                        <div>
                            <Field type="password" name="password" placeholder="Password" />
                            <ErrorMessage name="password" component="div" />
                        </div>
                        <button type="submit" disabled={isSubmitting || status === 'loading'}>
                            {status === 'loading' ? 'Logging in...' : 'Login'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default LoginForm;