import axios from 'axios';
import router from '../router';

const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    status: '',
    error: null
};

const getters = {
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    users: state => state.users,
    error: state => state.error
};

const actions = {
    // Add donation
    async addDonation({
        commit
    }, userData) {
        try {
            commit('donation_request');
            let res = await axios.post(`http://localhost:5000/api/users/profile/${userData._id}/donationDate`, userData);
            if (res.data.success !== undefined) {
                commit('donation_success');
            }
            return res;
        } catch (err) {
            commit('donation_error', err)
        }
    },
    // Login Action
    async login({
        commit
    }, user) {
        commit('auth_request');
        try {
            let res = await axios.post('http://localhost:5000/api/users/login', user)
            if (res.data.success) {
                const token = res.data.token;
                const user = res.data.user;
                // Store the token into the localstorage
                localStorage.setItem('token', token);
                // Set the axios defaults
                axios.defaults.headers.common['Authorization'] = token;
                commit('auth_success', token, user);
            }
            return res;
        } catch (err) {
            commit('auth_error', err);
        }
    },
    // Register User
    async register({
        commit
    }, userData) {
        try {
            commit('register_request');
            let res = await axios.post('http://localhost:5000/api/users/register', userData);
            if (res.data.success !== undefined) {
                commit('register_success');
            }
            return res;
        } catch (err) {
            commit('register_error', err)
        }
    },
    // Get the user Profile
    async getProfile({
        commit
    }) {
        commit('profile_request');
        let res = await axios.get('http://localhost:5000/api/users/profile')
        commit('user_profile', res.data.user)
        return res;
    },
    // Get the users
    async getUsers({
        commit
    }) {
        commit('users_request');
        let res = await axios.get('http://localhost:5000/api/users/')
        commit('users_profile', res.data.users)
        return res;
    },
    //Delete user from database
    async deleteUser({
        commit
    }, userData) {
        try {
            commit('users_update_request');
            let res = await axios.delete(`http://localhost:5000/api/users/${userData._id}`, userData)
            if (res.data.success !== undefined) {
                commit('users_update_success');
            }
            return res;
        } catch (err) {
            commit('users_update_error', err)
        }
    },
    // Update user profile
     async updateProfile({
        commit
    }, userData) {
        try {
            commit('update_request');
            let res = await axios.put(`http://localhost:5000/api/users/profile/${userData._id}`, userData)
            if (res.data.success !== undefined) {
                commit('update_success');
            }
            return res;
        } catch (err) {
            commit('update_error', err)
        }
    }, 
    // Logout the user
    async logout({
        commit
    }) {
        await localStorage.removeItem('token');
        commit('logout');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login');
        return
    }
};

const mutations = {
    auth_request(state) {
        state.error = null
        state.status = 'loading'
    },
    auth_success(state, token, user) {
        state.token = token
        state.user = user
        state.status = 'success'
        state.error = null
    },
    auth_error(state, err) {
        state.error = err.response.data.msg
    },
    register_request(state) {
        state.error = null
        state.status = 'loading'
    },
    register_success(state) {
        state.error = null
        state.status = 'success'
    },
    register_error(state, err) {
        state.error = err.response.data.msg
    },
    logout(state) {
        state.error = null
        state.status = ''
        state.token = ''
        state.user = ''
    },
    profile_request(state) {
        state.status = 'loading'
    },
    user_profile(state, user) {
        state.user = user
    },
    users_request(state) {
        state.status = 'loading'
    },
    users_profile(state, user) {
        state.user = user
    },
    update_request(state) {
        state.error = null
        state.status = 'loading'
    },
    update_success(state) {
        state.error = null
        state.status = 'success'
    },
    update_error(state, err) {
        state.error = err.response.data.msg
    },
    users_update_request(state) {
        state.error = null
        state.status = 'loading'
    },
    users_update_success(state) {
        state.error = null
        state.status = 'success'
    },
    users_update_error(state, err) {
        state.error = err.response.data.msg
    },
    donation_request(state) {
        state.error = null
        state.status = 'loading'
    },
    donation_success(state) {
        state.error = null
        state.status = 'success'
    },
    donation_error(state, err) {
        state.error = err.response.data.msg
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};