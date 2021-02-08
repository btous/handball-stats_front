export default {
    state: {
        // user: {},
        // userId: {},
        user: null,
        // userId: null,
    },
    getters: {
        user(state) {
            return state.user;
        },
        // userId(state) {
        //   return state.userId;
        // },
        logged(state) {
          return state.user ? true : false;
        },
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setUserId(state, userId) {
          state.userId = userId;
        },
    },
    actions: {
        setUser({ commit }, user) {
            // console.log(user);
            commit('setUser', user);
        },
        // setUserId({ commit }, userId) {
        //   commit('setUserId', userId);
        // },
    }
}