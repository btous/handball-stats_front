export default {
    state: {
        creating: false,
        editing: false,
    },
    getters: {
        creating(state) {
          return state.creating;
        },
        editing(state) {
          return state.editing;
        },
    },
    mutations: {
        setCreating(state, value) {
          state.creating = value;
        },
        setEditing(state, value) {
          state.editing = value;
        },
        resetCreatingEditing(state) {
          state.creating = false;
          state.editing = false;
        },
    },
    actions: {
        setCreating({ commit }, value) {
          commit('setCreating', value)
        },
        setEditing({ commit }, value) {
          commit('setEditing', value)
        },
        resetCreatingEditing({ commit }) {
          commit('resetCreatingEditing')
        },
    }
}