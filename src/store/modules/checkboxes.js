export default {
    state: {
        elementsCheckedId: [],
        clubsCheckedId: [],
        teamsCheckedId: [],
        playersCheckedId: [],
        matchesCheckedId: [],
        hidePlayersCheckbox: false,
    },
    getters: {
        elementsCheckedId(state) {
            return state.elementsCheckedId
        },
        clubsCheckedId(state) {
            return state.clubsCheckedId
        },
        teamsCheckedId(state) {
            return state.teamsCheckedId
        },
        playersCheckedId(state) {
            return state.playersCheckedId
        },
        matchesCheckedId(state) {
            return state.matchesCheckedId
        },
        hidePlayersCheckbox(state) {
            return state.hidePlayersCheckbox;
        }
    },
    mutations: {
        setPlayersCheckedId(state, playersCheckedId) {
            state.playersCheckedId = playersCheckedId;
        },
        setHidePlayersCheckbox(state, value) {
            state.hidePlayersCheckbox = value;
        },
        resetElementsChecked(state) {
            state.clubsCheckedId = [];
            state.teamsCheckedId = [];
            state.playersCheckedId = [];
            state.matchesCheckedId = [];
        },
        updateClubsChecked(state, clubId) {
            let idx = state.clubsCheckedId.indexOf(clubId);
            if (idx >= 0) {
                state.clubsCheckedId.splice(idx, 1);
            } else {
                state.clubsCheckedId.push(clubId);
            }
        },
        updateTeamsChecked(state, teamId) {
            let idx = state.teamsCheckedId.indexOf(teamId);
            if (idx >= 0) {
                state.teamsCheckedId.splice(idx, 1);
            } else {
                state.teamsCheckedId.push(teamId);
            }
        },
        updatePlayersChecked(state, playerId) {
            let idx = state.playersCheckedId.indexOf(playerId);
            if (idx >= 0) {
                state.playersCheckedId.splice(idx, 1);
            } else {
                state.playersCheckedId.push(playerId);
            }
        },
        updateMatchesChecked(state, matchId) {
            let idx = state.matchesCheckedId.indexOf(matchId);
            if (idx >= 0) {
                state.matchesCheckedId.splice(idx, 1);
            } else {
                state.matchesCheckedId.push(matchId);
            }
        },
        setElementsCheckedId(state, elementsCheckedId) {
            state.elementsCheckedId = elementsCheckedId;
        }
    },
    actions: {
        setPlayersCheckedId({ commit }, playersCheckedId) {
            commit('setPlayersCheckedId', playersCheckedId);
        },
        setHidePlayersCheckbox({ commit }, value) {
            commit('setHidePlayersCheckbox', value);
        },
        resetElementsChecked({ commit }) {
            commit('resetElementsChecked');
        },
        updateClubsChecked({ commit }, clubId) {
            commit('updateClubsChecked', clubId)
        },
        updateTeamsChecked({ commit }, teamId) {
            commit('updateTeamsChecked', teamId)
        },
        updatePlayersChecked({ commit }, playerId) {
            commit('updatePlayersChecked', playerId)
        },
        updateMatchesChecked({ commit }, matchId) {
            commit('updateMatchesChecked', matchId)
        },
        setElementsCheckedId({ commit }, elementsCheckedId) {
            commit('setElementsCheckedId', elementsCheckedId)
        }
    }
}