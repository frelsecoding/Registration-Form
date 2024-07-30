import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
// import Dashboard from './components/Dashboard';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div style={{ padding: '20px' }}>
                    <Routes>
                        <Route path="/register" element={<RegistrationForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        {/*<Route path="/dashboard" element={<Dashboard />} />*/}
                        <Route path="/" element={<Navigate to="/register" />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;