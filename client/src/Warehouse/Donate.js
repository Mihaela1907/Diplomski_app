/* import axios from 'axios';

const state = {
    user: {},
    status: '',
    error: null
};

const getters = {
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    error: state => state.error
};

const actions = {
    // Add donation
    async addDonation({
        commit
    }, userData) {
        try {
            commit('donation_request');
            let res = await axios.post(`http://localhost:5000/api/users/profile/${userData._id}/donations`, userData);
            if (res.data.success !== undefined) {
                commit('donation_success');
            }
            return res;
        } catch (err) {
            commit('donation_error', err)
        }
    }
};

const mutations = {
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
}; */