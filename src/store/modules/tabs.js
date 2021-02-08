export default {
    state: {
        clubTab: 0,
        teamTab: 0,
        playerTab: 0,
        matchTab: 0,
    },
    getters: {
        clubTab(state) {
            return state.clubTab;
        },
        teamTab(state) {
            return state.teamTab;
        },
        playerTab(state) {
            return state.playerTab;
        },
        matchTab(state) {
            return state.matchTab;
        }
    },
    mutations: {
        setClubTab(state, tab) {
            state.clubTab = tab;
        },
        setTeamTab(state, tab) {
            state.teamTab = tab;
        },
        setPlayerTab(state, tab) {
            state.playerTab = tab;
        },
        setMatchTab(state, tab) {
            state.matchTab = tab;
        },
    },
    actions: {
        setClubTab({ commit }, tab) {
            commit('setClubTab', tab);
        },
        setTeamTab({ commit }, tab) {
            commit('setTeamTab', tab);
        },
        setPlayerTab({ commit }, tab) {
            commit('setPlayerTab', tab);
        },
        setMatchTab({ commit }, tab) {
            commit('setMatchTab', tab);
        },
    }
}