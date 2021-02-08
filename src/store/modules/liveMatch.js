export default {
    state: {
        liveMatchElements: {
            player: "",
            action: ""
        },
        startTime: null,
        referenceTime: null,
        lastChrono: null,
        chrono: null,
    },
    getters: {
        liveMatchElements(state) {
            return state.liveMatchElements;
        },
        liveMatchPlayerId(state) {
            return state.liveMatchElements.player;
        },
        liveMatchActionType(state) {
            return state.liveMatchElements.action;
        },
        startTime(state) {
            return state.startTime;
        },
        referenceTime(state) {
            return state.referenceTime;
        },
        chrono(state) {
            return state.chrono;
        },
        lastChrono(state) {
            return state.lastChrono;
        }
    },
    mutations: {
        resetLiveMatchElements(state) {
            for (let key in state.liveMatchElements) {
                state.liveMatchElements[key] = "";
            }
        },
        setLiveMatchPlayerId(state, playerId) {
            state.liveMatchElements.player = playerId;
        },
        setLiveMatchActionType(state, actionType) {
            state.liveMatchElements.action = actionType;
        },
        setStartTime(state, time) {
            state.startTime = time;
        },
        setReferenceTime(state, time) {
            state.referenceTime = time;
        },
        updateChrono(state, time) {
            state.chrono = time;
        },
        setLastChrono(state, time) {
            state.lastChrono = time;
        },
    },
    actions: {
        resetLiveMatchElements({ commit }) {
            commit('resetLiveMatchElements');
        },
        setLiveMatchPlayerId({ commit, getters }, playerId) {
            if (getters.liveMatchPlayerId === playerId) {
                commit('setLiveMatchPlayerId', "");
            } else {
                commit('setLiveMatchPlayerId', playerId);
            }
        },
        setLiveMatchActionType({ commit, getters }, actionType) {
            if (getters.liveMatchActionType === actionType) {
                commit('setLiveMatchActionType', "");
            } else {
                commit('setLiveMatchActionType', actionType);
            }
        },
        setStartTime({ commit }, time) {
            commit('setStartTime', time);
        },
        setReferenceTime({ commit }, time) {
            commit('setReferenceTime', time);
        },
        updateChrono({ commit }, time) {
            commit('updateChrono', time);
        },
        setLastChrono({ commit }, time) {
            commit('setLastChrono', time);
        },
    }
}