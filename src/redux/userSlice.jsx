import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key'; // Replace with a secure secret key

export const registerUser = createAsyncThunk(
    'user/register',
    async (userData, { rejectWithValue }) => {
        try {
            // Check if email already exists
            const existingUsers = await axios.get(`http://localhost:3001/users?email=${userData.email}`);
            if (existingUsers.data.length > 0) {
                return rejectWithValue('Email already in use');
            }

            // Encrypt password
            const encryptedPassword = CryptoJS.AES.encrypt(userData.password, SECRET_KEY).toString();

            const response = await axios.post('http://localhost:3001/users', {
                ...userData,
                password: encryptedPassword
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/login',
    async (loginData, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:3001/users');
            const user = response.data.find(
                u => (u.email === loginData.identifier || u.mobileNumber === loginData.identifier)
            );

            if (user) {
                // Decrypt password and compare
                const decryptedPassword = CryptoJS.AES.decrypt(user.password, SECRET_KEY).toString(CryptoJS.enc.Utf8);
                if (decryptedPassword === loginData.password) {
                    return user;
                }
            }
            return rejectWithValue('Invalid credentials');
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.currentUser = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentUser = action.payload;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentUser = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { logout, clearError } = userSlice.actions;

export default userSlice.reducer;